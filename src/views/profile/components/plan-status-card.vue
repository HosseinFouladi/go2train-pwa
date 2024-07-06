<script lang="ts" setup>
import { computed } from 'vue'
import { cn } from '@/utils'
import { differenceInDays, parseISO } from 'date-fns'

import { DateInfo, PlanStatusBadge } from '.'
import { useGetCurrentPlan } from '@/queries'
import { InlineInfo, LineDivider } from '@/components'

const { data } = useGetCurrentPlan()
const currentPlan = computed(() => data.value?.data.results)
const daysLeft = computed(
  () =>
    currentPlan.value?.expired_at &&
    String(
      differenceInDays(parseISO(currentPlan.value?.expired_at), new Date())
    ).toPersianDigits()
)
</script>

<template>
  <section
    v-if="currentPlan?.priority !== 0"
    class="w-full p-6 space-y-4 card rounded-2xl bg-neutral-white h-fit"
  >
    <div class="flex items-center justify-between">
      <div
        :class="
          cn('flex gap-1', {
            'text-plan-bronze': currentPlan?.priority === 1,
            'text-plan-silver': currentPlan?.priority === 2,
            'text-plan-gold': currentPlan?.priority === 3
          })
        "
      >
        <span class="text-h6 font-demi-bold">اشتراک فعال شما: </span>
        <span class="text-h6 font-demi-bold text">
          {{ currentPlan?.title }}
        </span>
      </div>
      <PlanStatusBadge
        :theme="currentPlan?.color"
        :plan_priority="currentPlan?.priority"
        :label="daysLeft"
      />
    </div>
    <InlineInfo
      class="text-st-two text-text-400"
      text="همواره میتوانید اشتراک فعلی خود را ارتقا دهید. توجه داشته باشید در صورت خرید اشتراک جدید، مانده اشتراک فعلی از بین می رود."
    />
    <LineDivider />
    <div class="flex items-center justify-between">
      <div class="flex gap-4 text-text-400">
        <DateInfo :date="currentPlan?.created_at" label="زمان خرید‍" />
        <DateInfo :date="currentPlan?.expired_at" label="زمان اتمام اشتراک" />
      </div>
    </div>
  </section>
</template>

<style></style>
