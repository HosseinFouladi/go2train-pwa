export type CallbackPlanResponseType = {
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
  expired_at?: string
  priority: 1 | 2 | 3
  pricing: Pricing
  access_list: AccessList[]
}

export type Pricing = {
  id: number
  price: number
  old_price?: number
  off_expired_at?: string
  unit_id: number
  unit: string
  unit_slug: string
  unit_sign: string
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
  drivers?: string[]
}

export type PurchasePlanByCallbackResponseType = {
  url: string
}
export type PurchasePlanByCallbackParams = {
  plan_id: number
  plan_price_id: number
  gateway_id: number
}
