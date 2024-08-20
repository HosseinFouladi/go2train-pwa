<script lang="ts" setup>
import Skeleton from 'primevue/skeleton'
import { cn, separateDigitsByColon } from '@/utils'
import type { PaymentPlanResponse } from '@/queries'

const props = defineProps<Partial<PaymentPlanResponse & { isLoading: boolean }>>()

type SubscriptionType = 'priority-1' | 'priority-2' | 'priority-3'

const card_theme: Record<SubscriptionType, { bg: string; btn_color: string }> = {
  'priority-1': {
    bg: 'bg-bronze-gradient',
    btn_color: 'bg-[#D57155] border border-plan-bronze'
  },
  'priority-2': {
    bg: 'bg-silver-gradient',
    btn_color: 'bg-[#777777] border border-plan-silver'
  },
  'priority-3': {
    bg: 'bg-gold-gradient',
    btn_color: 'bg-[#DF9531] border border-plan-gold'
  }
}
</script>

<template>
  <div v-if="props.isLoading" class="overflow-hidden rounded-3xl">
    <Skeleton width="100%" height="140px"></Skeleton>
  </div>
  <div
    v-else
    :class="
      cn(
        'flex flex-row gap-3 py-6 px-4 w-full h-[140px] rounded-3xl',
        card_theme[`priority-${props.plan?.priority ?? 1}`].bg
      )
    "
  >
    <div class="flex items-center justify-center h-full">
      <img class="h-[92px] w-[92px]" :src="props.plan?.banner" />
    </div>
    <div class="flex flex-col justify-center h-full gap-2">
      <div class="text-h5 text-text-500 font-demi-bold">
        <span> اشتراک </span>
        <span>
          {{ props.plan?.title }}
        </span>
      </div>
      <div class="text-text-400">
        <span class="text-h6 text-text-400">
          {{
            separateDigitsByColon(props.pricing?.price as number).toPersianDigits()
          }}
          {{ props.pricing?.unit }}
        </span>
        <span> / ماهانه</span>
      </div>
    </div>
  </div>
</template>
