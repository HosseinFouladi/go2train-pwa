import _ from 'lodash'
import { useMutation, type MutationOptions } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import type {
  PurchasePlanByCallbackParams,
  PurchasePlanByCallbackResponseType
} from './types'

export const purchaseByCallback = async (params: PurchasePlanByCallbackParams) => {
  return ApiClient.post<
    ApiResponseType<
      Array<PurchasePlanByCallbackResponseType>,
      { id: ''; content: '' }
    >
  >(ENDPOINTS.Plans.PurchaseByCallback, { ...params }).then((res) =>
    _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results))
  ) as Promise<
    ApiResponseType<PurchasePlanByCallbackResponseType, { id: ''; content: '' }>
  >
}

export const usePurchasePlanByCallback = () =>
  useMutation({
    mutationKey: ['plans'],
    mutationFn: (params: PurchasePlanByCallbackParams) => purchaseByCallback(params)
  })
