import _ from 'lodash'
import { useQuery } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import type { CourseFilterLanguagesResponseType, Language } from './types'
import { ENDPOINTS, type ApiResponseType } from '@/api'

export const getLanguageList = async () => {
  return ApiClient.get<ApiResponseType<Array<Language>, { id: ''; content: '' }>>(
    ENDPOINTS.Languages.LanguageList
  )
}

export const useGetLanguageList = () => {
  return useQuery({ queryKey: ['languages', 'list'], queryFn: getLanguageList })
}

export const getCourseFilterLanguages = async () => {
  return ApiClient.get<
    ApiResponseType<
      Array<CourseFilterLanguagesResponseType>,
      { id: ''; content: '' }
    >
  >(ENDPOINTS.Languages.CourseFilterLanguages).then((res) =>
    _.set(
      _.cloneDeep(res),
      'data.results',
      _.head(res.data.results) as unknown as ApiResponseType<
        CourseFilterLanguagesResponseType,
        { id: ''; content: '' }
      >
    )
  )
}

export const useGetCourseFilterLanguages = () => {
  return useQuery({
    queryKey: ['languages', 'course_filter_languages'],
    queryFn: getCourseFilterLanguages
  })
}
