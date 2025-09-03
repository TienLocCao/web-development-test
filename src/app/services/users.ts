import api from "./api"
import { User } from "@/app/types"

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users")
  return data
}
