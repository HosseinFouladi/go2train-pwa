export type ApiResponseType<TData, TMessage extends Message> = {
  success: boolean
  code: number
  in_modal: boolean
  data: Data<TData>
  message: TMessage
}

export type ApiResponseTypeV3<T> = {
  data: T
  meta: Meta
  message: Array<Message>
}

export type Data<TData> = {
  has_paginate: number
  results: TData
}

export interface Message {
  id: string
  content: string
}

export type Meta = {
  simple_paginate: boolean
  per_page: number
  count: number
  current_page: number
  next_page: any
  prev_page: any
  total: number
  last_page: number
}
