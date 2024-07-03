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
  expired_at: any
  priority: number
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
