import api from "./api"

export async function getNotifications(limit: number = 5) {
  const { data } = await api.get("/posts", {
    params: { _limit: limit },
  })

  return data.map((post: any) => ({
    id: String(post.id),
    title: post.title,
    message: post.body,
    time: "Vừa xong",
    read: false,
  }))
}
