export type CurrentPlanResponseType = Plan & {
  prev_plan: null | (Plan & { pricing: Price })
}

export type Plan = {
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

export interface Pricing {
  id: number
  price: number
  old_price: null
  off_expired_at: null
  unit_id: number
  unit: string
  unit_slug: string
  unit_sign: string
}

export type Options = {
  'conversation-count'?: string
  'active-sessions'?: string
}
