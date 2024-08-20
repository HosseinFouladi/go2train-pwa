import { useQuery } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import type { CoursesResponseType } from './types'
import { ENDPOINTS, type ApiResponseTypeV3 } from '@/api'

type GetCourseListParams = {
  page: number
  languageId: number
  videoLanguageId?: number
}

export const getCourseList = async (params: GetCourseListParams) => {
  return ApiClient.get<ApiResponseTypeV3<CoursesResponseType>>(
    ENDPOINTS.Course.CourseList,
    { params: { ...params } }
  )
}

export const useGetCourseList = (params: GetCourseListParams) => {
  return useQuery({
    queryKey: ['course', 'list', ...Object.values(params)],
    queryFn: () => getCourseList(params)
  })
}
