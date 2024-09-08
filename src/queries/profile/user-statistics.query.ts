import _ from 'lodash'
import { ApiClient } from '@/utils'
import { useQuery } from '@tanstack/vue-query'
import { type StatisticsResponseType } from './types'
import { ENDPOINTS, type ApiResponseType } from '@/api'

export const getProfileStatistics = async () => {
  return ApiClient.get<
    ApiResponseType<Array<StatisticsResponseType>, { id: ''; content: '' }>
  >(ENDPOINTS.Profile.Statistics).then((res) =>
    _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results))
  ) as Promise<ApiResponseType<StatisticsResponseType, { id: ''; content: '' }>>
}

export const useProfileStatisticsQuery = () => {
  return useQuery({
    queryKey: ['profile', 'statistics'],
    queryFn: getProfileStatistics
  })
}
