export interface User {
  id: number
  name: string
  username: string
  email: string
  phone?: string
  website?: string
  company?: {
    name: string
    catchPhrase: string
    bs: string
  }
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  user?: User
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
  isPending?: boolean
}

export interface PostWithComments extends Post {
  comments: Comment[]
}

export interface SearchFilters {
  query: string
  sortOrder: 'asc' | 'desc'
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}
