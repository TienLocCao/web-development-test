import api from "./api"
import { Comment } from "@/app/types"

export async function addComment(
  postId: number,
  comment: Omit<Comment, "id">
): Promise<Comment> {
  const { data } = await api.post<Comment>("/comments", {
    ...comment,
    postId,
  })

  return { ...data, id: Date.now() }
}