import { useQuery } from '@tanstack/vue-query'

import _ from 'lodash'
import { ApiClient } from '@/utils'
import type { CurrentPlanResponseType } from '.'
import { ENDPOINTS, type ApiResponseType } from '@/api'

export const getCurrentPlan = async () => {
  return ApiClient.get<
    ApiResponseType<Array<CurrentPlanResponseType>, { id: 'all'; content: string }>
  >(ENDPOINTS.Profile.CurrentPlan).then((res) =>
    _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results))
  )
}

export const useGetCurrentPlan = () =>
  useQuery({
    queryKey: ['profile', 'current_plan'],
    queryFn: () => getCurrentPlan()
  })
