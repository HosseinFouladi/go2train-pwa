import { useQuery } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import type { CourseSection } from './types'
import { ENDPOINTS, type ApiResponseTypeV3 } from '@/api'

export const getCourseSections = async (courseId: string) => {
  return ApiClient.get<ApiResponseTypeV3<Array<CourseSection>>>(
    ENDPOINTS.Course.CourseSections(courseId)
  )
}

export const useCourseSectionsQuery = (courseId: string) => {
  return useQuery({
    queryKey: ['course', 'sections', courseId],
    queryFn: () => getCourseSections(courseId),
    enabled: !!courseId
  })
}
