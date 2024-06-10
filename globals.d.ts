export interface ApiResponseType<TData> {
  success: boolean
  code: number
  in_modal: boolean
  data: TData
  message: Array<ApiResponseMessage>
}

export interface Data<TResult> {
  has_paginate: number
  results: TResult
}

export interface ApiResponseMessage {
  id: string
  content: ApiResponseMessageContent
}

export interface ApiResponseMessageContent {
  id: string
  content: string
}
