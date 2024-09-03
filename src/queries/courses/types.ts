import type { Course } from '../course/type'

export type CoursesResponseType = Array<Course>

export type CourseTeacher = {
  id: string
  name: string
  avatar: string
  title: string
  score: number
}

export type CourseInLanguage = {
  id: string
  name: string
  image: string
  faName: string
  rtl: boolean
  show: boolean
}

export type CourseLanguage = {
  id: string
  name: string
  image: string
  faName: string
  rtl: boolean
  show: boolean
}

export type CourseLevel = {
  id: string
  title: string
  priority: number
}

export type CourseStudent = {
  id: string
  name: string
  avatar: string
  plan: CoursePlan
}

export type CoursePlan = {
  id: string
  title: string
  icon: string
}
