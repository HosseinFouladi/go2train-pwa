export type CurrentPlanResponseType = Plan & {
  prev_plan: null | (Plan & { pricing: Pricing })
}

export type Plan = {
  id: number
  product_id: unknown
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

export type Pricing = {
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

export type StatisticsResponseType = {
  daily_goal: DailyGoal
  statistics: Statistics
}

export type DailyGoal = {
  id: number
  target_minutes: number
  process_minutes: number
  process_percentage: number
  status: number
}

export type Statistics = {
  type: number
  data: StatisticsData
}

export type StatisticsData = {
  [key: `${number}`]: string
}

export type Message = {
  id: string
  content: string
}
