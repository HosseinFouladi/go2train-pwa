export type UserLoginResponseType = {
  token: string
  user: User
  role: string
  username_type: string
}

export type User = {
  id: number
  avatar: string
  name: string
  email: string
  mobile: string
  score: number
  username: string
  prefer_language: number
  is_register_complete: boolean
  invite_code: any
  role: string
  location: any
  is_whitelist: boolean
}
