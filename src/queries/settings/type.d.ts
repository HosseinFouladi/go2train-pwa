export type AppSettingResponseType = {
  options: Options
  custom_data: unknown
  updated_at: string
  updated_at_jalali: string
}

export type Options = {
  notifications: boolean
}
