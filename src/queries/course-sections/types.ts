export type CourseSection = {
  id: string
  courseId: string
  title: string
  description: string
  duration: number
  examPassed: boolean
  examMark: any
  examId: any
  stream: Stream
  contents: Contents
  grammar: Grammar
  reading: Reading
  words: Words
  isComplete: boolean
  videoSeen: boolean
  contentsSeen: boolean
  grammarSeen: boolean
  readingSeen: boolean
  wordsSeen: boolean
  videoLastSecond: any
}

export type Stream = {
  streamMeta: any
  streamStatus: number
  streamProviders: any
}

export type Contents = {
  url: string
  name: string
  downloadUrl: any
}

export type Grammar = {
  url?: string
  name?: string
  downloadUrl: any
}

export type Reading = {
  url: string
  name: string
  downloadUrl: any
}

export type Words = {
  url: string
  name: string
  downloadUrl: any
}
