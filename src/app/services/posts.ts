import api from "./api"

import { Post } from "@/app/types/post";
import { PostWithComments } from "@/app/types/postWithComments";
import { User } from "@/app/types/user";
import { Comment } from "@/app/types/comment";



// Fetch all posts with pagination
export async function getPosts(
  page: number = 1,
  limit: number = 10
): Promise<{ posts: Post[]; total: number }> {
  const response = await api.get<Post[]>("/posts", {
    params: { _page: page, _limit: limit },
  })
  const posts = response.data
  const total = parseInt(response.headers["x-total-count"] || "0")

  const postsWithUsers = await Promise.all(
    posts.map(async (post: Post) => {
      try {
        const { data: user } = await api.get<User>(`/users/${post.userId}`)
        return { ...post, user }
      } catch {
        return post
      }
    })
  )

  return { posts: postsWithUsers, total }
}

// Fetch a single post with comments
export async function getPost(id: number): Promise<PostWithComments | null> {
  try {
    const [postResponse, commentsResponse] = await Promise.all([
      api.get<Post>(`/posts/${id}`),
      api.get<Comment[]>(`/posts/${id}/comments`),
    ])

    const post = postResponse.data
    const comments = commentsResponse.data

    try {
      const { data: user } = await api.get<User>(`/users/${post.userId}`)
      return { ...post, user, comments }
    } catch {
      return { ...post, comments }
    }
  } catch {
    return null
  }
}

// Search posts
export async function searchPosts(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<{ posts: Post[]; total: number }> {
  const { data: allPosts } = await api.get<Post[]>("/posts")

  const filtered = allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.body.toLowerCase().includes(query.toLowerCase())
  )

  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  const postsWithUsers = await Promise.all(
    paginated.map(async (post: Post) => {
      try {
        const { data: user } = await api.get<User>(`/users/${post.userId}`)
        return { ...post, user }
      } catch {
        return post
      }
    })
  )

  return { posts: postsWithUsers, total: filtered.length }
}

// Filter posts by user
export async function getPostsByUser(
  userId: number,
  page: number = 1,
  limit: number = 10
): Promise<{ posts: Post[]; total: number }> {
  const response = await api.get<Post[]>("/posts", {
    params: { userId, _page: page, _limit: limit },
  })
  const posts = response.data
  const total = parseInt(response.headers["x-total-count"] || "0")

  const postsWithUsers = await Promise.all(
    posts.map(async (post: Post) => {
      try {
        const { data: user } = await api.get<User>(`/users/${userId}`)
        return { ...post, user }
      } catch {
        return post
      }
    })
  )

  return { posts: postsWithUsers, total }
}
