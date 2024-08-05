import _ from 'lodash'
import { useQuery } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import type { CurrentPlanResponseType } from '.'
import { ENDPOINTS, type ApiResponseType } from '@/api'

export const getCurrentPlan = async () => {
  return ApiClient.get<
    ApiResponseType<Array<CurrentPlanResponseType>, { id: 'all'; content: string }>
  >(ENDPOINTS.Profile.CurrentPlan).then((res) =>
    _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results))
  ) as Promise<
    ApiResponseType<CurrentPlanResponseType, { id: 'all'; content: string }>
  >
}

export const useGetCurrentPlan = () =>
	useQuery({
		gcTime: 0,
		queryFn: () => getCurrentPlan(),
		queryKey: ["profile", "current_plan"],
	});
