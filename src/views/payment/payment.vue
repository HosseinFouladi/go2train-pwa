<script lang="ts" setup>
import _ from 'lodash'
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'

import { ApiClient } from '@/utils'
import { WarningIcon } from '@/components/icons'
import { InlineInfo, Button } from '@/components'
import type { PaymentPlanResponse } from '@/queries'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import { PlanCard, ReciptCard, PaymentError } from '@/views/payment/components'

const route = useRoute()
const { plan_id, username } = route.query

const subscribeByUsername = (params: { username: string; plan_id: number }) => {
  return ApiClient.post<
    ApiResponseType<Array<{ url: string }>, { id: ''; content: '' }>
  >(ENDPOINTS.Payment.SubscribeByUsername, params)
    .then((res) => _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results)))
    .then((res) => {
      const gateway_url = (res.data.results as unknown as { url: string }).url
      if (!window) return
      window.open(gateway_url, '_blank')
    }) as Promise<ApiResponseType<{ url: string }, { id: 'all'; content: string }>>
}

const { mutate, isPending } = useMutation({
  mutationFn: (params: { username: string; plan_id: number }) =>
    subscribeByUsername(params)
})

const getPaymentDetails = async (params: {
  username: string
  plan_id: string
}) => {
  return ApiClient.post<
    ApiResponseType<Array<PaymentPlanResponse>, { id: ''; content: '' }>
  >(ENDPOINTS.Payment.PaymentDetails, params).then(
    (res) =>
      _.set(
        _.cloneDeep(res),
        'data.results',
        _.head(res.data.results)
      ) as unknown as Promise<
        ApiResponseType<PaymentPlanResponse, { id: 'all'; content: string }>
      >
  )
}

const { data, isLoading, isError } = useQuery({
  queryKey: ['check_username', String(route.query.username)],
  queryFn: () =>
    getPaymentDetails({
      username: String(username),
      plan_id: String(plan_id),
    }),
  networkMode: 'offlineFirst'
})

const paymentDetails = computed(() => data.value?.data.results)
</script>

<template>
  <PaymentError v-if="!username || !plan_id || isError" />
  <div
    v-if="!isError"
    class="relative flex flex-col-reverse h-screen lg:flex-row bg-background-default"
  >
    <div class="flex flex-col w-full">
      <div class="flex flex-col w-full max-w-[1440px] mx-auto px-4">
        <div class="w-full h-screen max-w-6xl mx-auto">
          <h1 class="py-6 text-center text-h5 font-demi-bold">خرید اشتراک</h1>
          <div class="space-y-4">
            <PlanCard v-bind="paymentDetails" :isLoading="isLoading" />
            <ReciptCard v-bind="paymentDetails" :isLoading="isLoading" />
            <InlineInfo
              :icon="h(WarningIcon, { height: 20, width: 20 })"
              text="لطفا اطلاعات خود را بررسی کنید و از صحت آن مطمئن شوید."
            />
            <div
              class="absolute left-0 flex items-center justify-center w-full px-4 bottom-5"
            >
              <Button
                fluid
                :isLoading="isPending"
                label="ادامه فرآیند خرید"
                :diabled="isPending || isLoading"
                @click="
                  () =>
                    paymentDetails &&
                    mutate({
                      plan_id: paymentDetails?.plan.id,
                      username: paymentDetails?.username
                    })
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
