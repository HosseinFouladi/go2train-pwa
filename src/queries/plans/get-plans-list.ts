import { useQuery } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import type { CallbackPlanResponseType } from './types'

export const getCallbackPlansList = async () => {
  return ApiClient.get<
    ApiResponseType<Array<CallbackPlanResponseType>, { id: ''; content: '' }>
  >(ENDPOINTS.Plans.List)
}

export const useGetCallbackPlansList = () =>
  useQuery({
    queryKey: ['plans', 'list'],
    queryFn: () => getCallbackPlansList()
  })
