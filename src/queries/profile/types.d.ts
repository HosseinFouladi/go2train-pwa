export type CurrentPlanResponseType = {
  id: number
  product_id: any
  title: string
  hint: string
  description: string
  duration: number
  type: number
  type_title: string
  icon: string
  banner: string
  color: string
  expired_at: string
  created_at: string
  priority: 0 | 1 | 2 | 3
  access_list: AccessList[]
}

export type AccessList = {
  id: number
  title: string
  description: string
  image: string
  slug: string
  options?: Options
}

export type Options = {
  'conversation-count'?: string
  'active-sessions'?: string
}
