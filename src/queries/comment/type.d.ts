export type Comment= {
    id: string
    title: string
    comment: string
    score: number
    isLike: boolean
    isDisLike: boolean
    likes: number
    disLikes: number
    createdAt: string
    user: User
    reply: {
      text: string
      response: string
      userId: string
      createdAt: string
    }
  }
  
  export type User ={
    userId: string
    name: string
    username: string
    plan: Plan
    avatar: string
  }
  
  export type Plan= {
    id: string
    title: string
    icon: any
  }

  export type Ratings= {
    courseId: string
    totalUsers: number
    scoreAverage: number
    data: Score[]
  }
  
  export type Score ={
    score: number
    average: string
  }

  export type CommentReactionParams={
    commentId:string,
    action:0|1
  }
  export type CreateNewCommentParams={
    score: number
    comment: string
    title: string
  }