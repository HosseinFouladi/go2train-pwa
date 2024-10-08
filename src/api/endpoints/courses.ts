export const CourseEndpoints = {
  CourseList: '/v3/course',
  course_info:(course_id:number)=>`/v3/course/${course_id}`,
  active_courses: (user_id:number)=>`/v3/user/activeCourse?userId=${user_id}`,
  CourseSections: (courseId: string) => `/v3/course/section/${courseId}`
} as const
