export interface CreateUserResponseType {
  token: string
  user: User
}

export interface User {
  id: number
  name: any
  email: any
  mobile: any
  username: string
  avatar: any
  score: any
  prefer_language: any
  is_register_complete: boolean
  invite_code: any
  role: string
  followings_count: number
  followers_count: number
  location: any
  is_whitelist: boolean
  bio: any
  login_method: string
}
