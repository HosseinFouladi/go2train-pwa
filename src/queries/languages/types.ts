export type CourseFilterLanguagesResponseType = {
  to_languages: Array<ToLanguage>
}

export type Language = {
  id: number
  name: string
  image: string
  fa_name: string
  rtl: boolean
  course_count: number
  user_count: number
  show: boolean
}

export type ToLanguage = {
  id: number
  name: string
  image: string
  fa_name: string
  rtl: boolean
  user_count: number
  show: boolean
}
