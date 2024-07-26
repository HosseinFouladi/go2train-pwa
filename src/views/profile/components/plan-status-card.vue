<script lang="ts" setup>
import { computed } from 'vue'
import { differenceInDays, parseISO } from 'date-fns'

import { cn } from '@/utils'
import { DateInfo, PlanStatusBadge } from '.'
import { RefreshIcon } from '@/components/icons'
import { useMutation } from '@tanstack/vue-query'
import { InlineInfo, LineDivider, Button } from '@/components'
import { useGetCurrentPlan } from '@/queries/profile/current-plan-query'
import { purchaseByCallback, type PurchasePlanByCallbackParams } from '@/queries'

const { data } = useGetCurrentPlan()
const currentPlan = computed(() => data.value?.data.results)
const daysLeft = computed(
  () =>
    currentPlan.value?.expired_at &&
    String(
      differenceInDays(parseISO(currentPlan.value?.expired_at), new Date())
    ).toPersianDigits()
)
const { mutate: purchasePlan } = useMutation({
  mutationKey: ['plans'],
  mutationFn: (params: PurchasePlanByCallbackParams) => purchaseByCallback(params),
  onSuccess({ data }, _v, _c) {
    if (!window) return
    window.open(data.results.url, '_blank')
  }
})
</script>

<template>
  <section
    v-if="currentPlan?.priority === 0 && currentPlan?.prev_plan !== null"
    class="w-full p-6 space-y-4 paper md:card rounded-2xl bg-neutral-white h-fit"
  >
    <div class="w-full space-y-4">
      <h2 class="text-center text-h6 font-demi-bold text-danger-500">
        اشتراک شما به پایان رسیده!
      </h2>
      <LineDivider />
    </div>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div
        :class="
          cn(
            'flex gap-1 justify-center',
            {
              'text-plan-bronze': currentPlan?.priority === 1,
              'text-plan-silver': currentPlan?.priority === 2,
              'text-plan-gold': currentPlan?.priority === 3
            },
            currentPlan?.priority === 0 &&
              currentPlan.prev_plan !== null && {
                'text-plan-bronze': currentPlan?.prev_plan.priority === 1,
                'text-plan-silver': currentPlan?.prev_plan.priority === 2,
                'text-plan-gold': currentPlan?.prev_plan.priority === 3
              }
          )
        "
      >
        <span class="text-h6 font-demi-bold" v-if="currentPlan?.priority !== 0"
          >اشتراک فعال شما:
        </span>
        <span
          class="text-h6 font-demi-bold"
          v-if="currentPlan?.priority === 0 && currentPlan.prev_plan"
        >
          اشتراک قبلی شما:
        </span>
        <span v-if="currentPlan?.priority !== 0" class="text-h6 font-demi-bold text">
          {{ currentPlan?.title }}
        </span>
        <span
          v-if="currentPlan?.priority === 0 && currentPlan.prev_plan"
          class="text-h6 font-demi-bold text"
        >
          {{ currentPlan?.prev_plan.title }}
        </span>
      </div>
      <PlanStatusBadge
        :label="daysLeft"
        :theme="currentPlan?.color"
        v-if="currentPlan?.priority !== 0"
        :plan_priority="currentPlan?.priority"
      />
      <Button
        v-if="currentPlan?.priority === 0 && currentPlan?.prev_plan !== null"
        label="تمدید مجدد"
        :iconRight="RefreshIcon"
        @click="
          () =>
            currentPlan?.prev_plan &&
            purchasePlan({
              gateway_id: 1,
              plan_id: currentPlan?.prev_plan.id,
              plan_price_id: currentPlan.prev_plan.pricing.id
            })
        "
      />
    </div>
    <div v-if="currentPlan?.priority !== 0" class="space-y-4">
      <InlineInfo
        class="text-st-two text-text-400"
        text="همواره میتوانید اشتراک فعلی خود را ارتقا دهید. توجه داشته باشید در صورت خرید اشتراک جدید، مانده اشتراک فعلی از بین می رود."
      />
      <LineDivider />
    </div>
    <div class="flex items-center justify-between">
      <div
        v-if="currentPlan?.priority !== 0"
        class="flex flex-col gap-4 md:flex-row text-text-400"
      >
        <DateInfo :date="currentPlan?.created_at" label="زمان خرید‍" />
        <DateInfo :date="currentPlan?.expired_at" label="زمان اتمام اشتراک" />
      </div>
      <div
        v-if="currentPlan?.priority === 0 && currentPlan.prev_plan !== null"
        class="flex flex-col gap-4 md:flex-row text-text-400"
      >
        <DateInfo :date="currentPlan?.prev_plan.created_at" label="زمان خرید‍" />
        <DateInfo
          :date="currentPlan?.prev_plan.expired_at"
          label="زمان اتمام اشتراک"
        />
      </div>
    </div>
  </section>
</template>

<style></style>
