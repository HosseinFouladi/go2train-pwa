export type FindAccountResponseType = {
  user: User
  expire_after: number
  username_method: string
}

export type User = {
  id: number
  name: any
  email: string
  mobile: any
  username: string
  avatar: any
  score: number
  prefer_language: number
  is_register_complete: boolean
  invite_code: string
  role: string
  followings_count: number
  followers_count: number
  location: any
  is_whitelist: boolean
  bio: any
  login_method: string
}
