export interface ApiResponseType<TResult, TMessageId> {
  success: boolean
  code: number
  in_modal: boolean
  data: {
    has_paginate: number
    results: Array<TResult>
  }
  message: Array<{
    id: TMessageId
    content: string
  }>
}

export interface Message {
  id: string | number
  content: string
}
