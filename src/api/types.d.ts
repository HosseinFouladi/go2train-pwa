export type ApiResponseType<TData, TMessage extends Message> = {
  success: boolean
  code: number
  in_modal: boolean
  data: Data<TData>
  message: TMessage
}

export type Data<TData> = {
  has_paginate: number
  results: TData
}

export interface Message {
  id: string
  content: string
}
