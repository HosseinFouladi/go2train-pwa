export type CoursesResponseType = Array<Course>

export type Course = {
  id: string
  title: string
  poster: string
  fullPoster: string
  shortDescription: string
  price: string
  oldPrice: string
  score: number
  teacher: CourseTeacher
  inLanguage: CourseInLanguage
  language: CourseLanguage
  level: CourseLevel
  userCount: number
  sessionCount: number
  contentLanguage: string
  duration: number
  isActive: number
  enDateOfRelease: any
  dateOfRelease: any
  bought: boolean
  users: Array<CourseStudent>
}

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
