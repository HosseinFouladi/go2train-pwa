<script setup lang="ts">
import { cn } from '@/utils'
import { CheckMark } from '.'
import { purchaseByCallback, type PurchasePlanByCallbackParams } from '@/queries'

import type { CallbackPlanResponseType } from '@/queries'
import { useMutation } from '@tanstack/vue-query'

type SubscriptionType = 'priority-1' | 'priority-2' | 'priority-3'

const props = defineProps<CallbackPlanResponseType>()

const bg_map: Record<
  SubscriptionType,
  { bg: string; btn_color: `bg-[#${string}]` }
> = {
  'priority-1': { bg: 'bg-bronze-gradient', btn_color: 'bg-[#D57155]' },
  'priority-2': { bg: 'bg-silver-gradient', btn_color: 'bg-[#777777]' },
  'priority-3': { bg: 'bg-gold-gradient', btn_color: 'bg-[#DF9531]' }
}

const { mutate: purchasePlan } = useMutation({
  mutationKey: ['plans'],
  mutationFn: (params: PurchasePlanByCallbackParams) => purchaseByCallback(params),
  onSuccess({ data }, _variables, _context) {
    if (!window) return
    window.open(data.results.url, '_blank')
  }
})
</script>

<template>
  <div class="w-full duration-300 flex group hover:scale-[1.05]">
    <div
      :class="
        cn(
          bg_map[`priority-${props.priority}`].bg,
          'relative w-full p-4 mt-12 flex flex-col justify-between space-y-3 rounded-3xl group-hover:shadow-md duration-300'
        )
      "
    >
      <div class="space-y-3">
        <div class="w-full h-12">
          <img
            class="absolute top-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2"
            :src="props.icon"
          />
        </div>
        <div class="space-y-2">
          <h2 class="text-center text-h5 font-extra-bold">
            اشتراک {{ props.title }}
          </h2>
          <div class="flex flex-row justify-center gap-1 text-text-400">
            <div class="flex gap-1 text-st-one font-demi-bold">
              <span>{{ String(props.pricing.price).toPersianDigits() }}</span>
              <span>تومان</span>
            </div>
            <span class="text-st-one font-demi-bold">/</span>
            <span class="text-st-two">ماهانه</span>
          </div>
        </div>
        <ul class="space-y-2 text-text-400">
          <li
            class="flex items-center gap-1.5"
            :key="access.id"
            v-for="access of props.access_list"
          >
            <span>
              <CheckMark />
            </span>
            <span class="text-cp">{{ access.title }}</span>
          </li>
        </ul>
      </div>
      <button
        @click="
          () =>
            purchasePlan({
              gateway_id: 1,
              plan_id: props.priority,
              plan_price_id: props.pricing.id
            })
        "
        :class="[
          bg_map[`priority-${props.priority}`].btn_color,
          'w-full rounded-xl py-3 text-neutral-white text-sm-st-one font-demi-bold',
          `duration-200 hover:brightness-[106%]`
        ]"
      >
        خرید اشتراک
      </button>
    </div>
  </div>
</template>
