export const CourseEndpoints = {
  CourseList: '/v3/course',
  CourseSections: (courseId: string) => `/v3/course/section/${courseId}`
} as const
