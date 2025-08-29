import { Post, User, Comment, PostWithComments } from '@/app/types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export class ApiService {
  // Fetch all posts with pagination
  static async getPosts(page: number = 1, limit: number = 10): Promise<{ posts: Post[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`)
      const posts = await response.json()
      const total = parseInt(response.headers.get('X-Total-Count') || '0')
      
      // Fetch user data for each post
      const postsWithUsers = await Promise.all(
        posts.map(async (post: Post) => {
          try {
            const userResponse = await fetch(`${BASE_URL}/users/${post.userId}`)
            const user = await userResponse.json()
            return { ...post, user }
          } catch (error) {
            console.error(`Error fetching user for post ${post.id}:`, error)
            return post
          }
        })
      )
      
      return { posts: postsWithUsers, total }
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  // Fetch a single post with comments
  static async getPost(id: number): Promise<PostWithComments | null> {
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        fetch(`${BASE_URL}/posts/${id}`),
        fetch(`${BASE_URL}/posts/${id}/comments`)
      ])
      
      if (!postResponse.ok) {
        return null
      }
      
      const post = await postResponse.json()
      const comments = await commentsResponse.json()
      
      // Fetch user data for the post
      try {
        const userResponse = await fetch(`${BASE_URL}/users/${post.userId}`)
        const user = await userResponse.json()
        return { ...post, user, comments }
      } catch (error) {
        console.error(`Error fetching user for post ${id}:`, error)
        return { ...post, comments }
      }
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error)
      throw error
    }
  }

  // Fetch all users
  static async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${BASE_URL}/users`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  // Search posts by title or body
  static async searchPosts(query: string, page: number = 1, limit: number = 10): Promise<{ posts: Post[], total: number }> {
    try {
      // Since JSONPlaceholder doesn't support search, we'll fetch all posts and filter client-side
      // In a real app, you'd use a proper search API
      const response = await fetch(`${BASE_URL}/posts`)
      const allPosts = await response.json()
      
      const filteredPosts = allPosts.filter((post: Post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
      )
      
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
      
      // Fetch user data for filtered posts
      const postsWithUsers = await Promise.all(
        paginatedPosts.map(async (post: Post) => {
          try {
            const userResponse = await fetch(`${BASE_URL}/users/${post.userId}`)
            const user = await userResponse.json()
            return { ...post, user }
          } catch (error) {
            console.error(`Error fetching user for post ${post.id}:`, error)
            return post
          }
        })
      )
      
      return { posts: postsWithUsers, total: filteredPosts.length }
    } catch (error) {
      console.error('Error searching posts:', error)
      throw error
    }
  }

  // Filter posts by user ID
  static async getPostsByUser(userId: number, page: number = 1, limit: number = 10): Promise<{ posts: Post[], total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/posts?userId=${userId}&_page=${page}&_limit=${limit}`)
      const posts = await response.json()
      const total = parseInt(response.headers.get('X-Total-Count') || '0')
      
      // Fetch user data for each post
      const postsWithUsers = await Promise.all(
        posts.map(async (post: Post) => {
          try {
            const userResponse = await fetch(`${BASE_URL}/users/${userId}`)
            const user = await userResponse.json()
            return { ...post, user }
          } catch (error) {
            console.error(`Error fetching user for post ${post.id}:`, error)
            return post
          }
        })
      )
      
      return { posts: postsWithUsers, total }
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error)
      throw error
    }
  }

  // Add a new comment (simulated - JSONPlaceholder doesn't actually save data)
  static async addComment(postId: number, comment: Omit<Comment, 'id'>): Promise<Comment> {
    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          ...comment,
          postId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      
      const newComment = await response.json()
      return { ...newComment, id: Date.now() } // Use timestamp as ID since it's simulated
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    }
  }
}
