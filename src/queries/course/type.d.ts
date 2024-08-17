export type Course = {
  id: string
  title: string
  poster: string
  fullPoster: string
  shortDescription: string
  price: string
  oldPrice: string
  score: number
  teacher: Teacher
  inLanguage: InLanguage
  language: Language
  level: Level
  content: string
  registeredUsersCount: number
  contentLanguage: string
  video: any
  bought: boolean
  duration: number
  users: User[]
  enDateOfRelease: any
  dateOfRelease: any
  sessionsCount: number
  display: boolean
  canAddComment: boolean
  stream: Stream
}

export type Teacher = {
  id: string
  name: any
  avatar: any
  title: string
  score: number
  stream: Stream
}


export type InLanguage = {
  id: string
  name: string
  image: string
  faName: string
  rtl: boolean
  show: boolean
}

export type Language = {
  id: string
  name: string
  image: string
  faName: string
  rtl: boolean
  show: boolean
}

export type Level = {
  id: string
  priority: number
  title: string
}

export type User = {
  id: string
  name: string
  avatar: string
  plan: Plan
}

export type Plan = {
  id: string
  title: string
  icon: string
}

export type Stream = {
  streamMeta: {
    duration: number
    playback: {
      dash: string
      hls: string
      old_hls: string
    }
    preview: string
    state: string
    thumbnail: string
  }
  streamProviders: {
    cache: {
      type: string
      urls: {
        p240: string
        p360: string
        p480: string
        p720: string
      }
    }
    cloudflare: {
      meta:{
        dash:string,
        hls:string
      },
      type:stream
    }
    streamStatus: number
  }
}
