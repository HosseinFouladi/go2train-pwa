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
  return useQuery({
    queryKey: ['languages', 'list'],
    queryFn: getLanguageList,
    select(data) {
      return {
        ...data,
        data: {
          ...data.data,
          results: [
            {
              id: 0,
              name: 'all',
              image: '',
              fa_name: 'همه',
              rtl: false,
              course_count: 0,
              user_count: 0,
              show: true
            },
            ...data.data.results
          ]
        }
      }
    }
  })
}

export const getCourseFilterLanguages = async () => {
  return ApiClient.get<
    ApiResponseType<
      Array<CourseFilterLanguagesResponseType>,
      { id: ''; content: '' }
    >
  >(ENDPOINTS.Languages.CourseFilterLanguages)
}

export const useGetCourseFilterLanguages = () => {
  return useQuery({
    queryKey: ['languages', 'course_filter_languages'],
    queryFn: getCourseFilterLanguages,
    select(data) {
      return {
        ...data,
        data: {
          results: [
            {
              id: 0,
              name: 'all',
              image: '',
              fa_name: 'همه',
              rtl: false,
              course_count: 0,
              user_count: 0,
              show: true
            },
            ...data.data.results[0].to_languages
          ]
        }
      }
    }
  })
}
