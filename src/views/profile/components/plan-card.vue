<script setup lang="ts">
import { cn } from '@/utils'
import { computed } from 'vue'
import { match, P } from 'ts-pattern'
import { useModal } from 'vue-final-modal'
import { useMutation } from '@tanstack/vue-query'
import type { CallbackPlanResponseType } from '@/queries'
import { CheckMark, PurchaseConfirmationModal } from '.'
import { purchaseByCallback, type PurchasePlanByCallbackParams } from '@/queries'
import { useGetCurrentPlan } from '@/queries/profile/current-plan-query'

const props = defineProps<CallbackPlanResponseType & { class?: string }>()

type SubscriptionType = 'priority-1' | 'priority-2' | 'priority-3'

const { data: plan } = useGetCurrentPlan()
const subscribed = computed(() =>
  Array.from(
    { length: plan.value?.data.results.priority ?? 1 },
    (_, index) => index + 1
  ).includes(props.priority)
)
const priority_status = computed(() => {
  const delta = props.priority - (plan.value?.data.results.priority ?? 1)
  return match(delta)
    .with(P.number.negative(), () => 'taken')
    .with(P.number.positive(), () => 'can_buy')
    .with(0, () => 'current')
    .otherwise(() => '')
})

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

const { mutate: purchasePlan } = useMutation({
  mutationKey: ['plans'],
  mutationFn: (params: PurchasePlanByCallbackParams) => purchaseByCallback(params),
  onSuccess({ data }, _v, _c) {
    if (!window) return
    window.open(data.results.url, '_blank')
  }
})

const priority = computed(() => (props.priority > 3 ? 3 : props.priority))

const { open, close } = useModal({
  component: PurchaseConfirmationModal,
  attrs: {
    icon: props.icon,
    priority: props.priority,
    price: props.pricing.price,
    price_unit: props.pricing.unit,
    plan_title: props.title,
    onCancel() {
      close()
    },
    onConfirm() {
      purchasePlan({
        gateway_id: 1,
        plan_id: props.priority,
        plan_price_id: props.pricing.id
      })
    }
  },
  slots: {
    default: '<p>UseModal: The content of the modal</p>'
  }
})
</script>

<template>
  <div
    dir="rtl"
    :class="
      cn(
        'w-full h-full sm:h-auto duration-300 flex group hover:scale-[1.05]',
        {
          'pointer-events-none': subscribed
        },
        props.class
      )
    "
  >
    <div
      :class="
        cn(
          card_theme[`priority-${priority}`].bg,
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
        @click="() => open()"
        :class="[
          card_theme[`priority-${priority}`].btn_color,
          'w-full rounded-xl py-3 text-neutral-white text-sm-st-one font-demi-bold',
          `duration-200 hover:brightness-[106%]`,
          { 'bg-transparent text-text-400': priority_status !== 'can_buy' }
        ]"
      >
        {{
          match(priority_status)
            .with('taken', () => 'شامل اشتراک شماست')
            .with('current', () => 'این اشتراک را دارید!')
            .with('can_buy', () => 'خرید اشتراک')
            .otherwise(() => '')
        }}
      </button>
    </div>
  </div>
</template>
