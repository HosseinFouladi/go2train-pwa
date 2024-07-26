<script lang="ts" setup>
import { Button } from '@/components'
import { ref } from 'vue'
import { cn } from '@/utils'
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  icon: string
  onConfirm: () => void
  onCancel: () => void
  priority: 1 | 2 | 3
  price: number
  price_unit: string
  plan_title: string
}>()

const isPurchaseLoading = ref(false)
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center rounded"
    content-class="flex flex-col items-center max-w-xl gap-8 p-10 mx-4 space-y-2 rounded-3xl w-96 bg-neutral-white"
  >
    <div class="flex flex-col gap-3">
      <div
        :class="
          cn('relative flex items-center justify-center rounded-2xl p-4', {
            'bg-plan-bronze/30': props.priority === 1,
            'bg-plan-silver/30': props.priority === 2,
            'bg-plan-gold/30': props.priority === 3
          })
        "
      >
        <img class="w-12 h-12" :src="props.icon" />
      </div>
      <span
        :class="
          cn('text-h6 font-demi-bold', {
            'text-plan-bronze': props.priority === 1,
            'text-plan-silver': props.priority === 2,
            'text-plan-gold': props.priority === 3
          })
        "
        >خرید پلن {{ props.plan_title }}</span
      >
    </div>
    <div class="flex flex-col w-full gap-4">
      <span class="border w-full h-[1px] border-secondary-300"></span>
      <div class="flex flex-row items-center w-full gap-2 text-st-two">
        <span class="text-text-200">قیمت</span>
        <span class="border flex-1 border-dashed h-[0.5px] border-text-200"></span>
        <span>{{
          String(props.price).toPersianDigits().concat(` ${props.price_unit}`)
        }}</span>
      </div>
      <span class="border w-full flex-1 h-[1px] border-secondary-300"></span>
      <div
        class="flex flex-row items-center justify-between w-full gap-2 font-demi-bold text-primary-500 text-st-two"
      >
        <span>قابل پرداخت</span>
        <span>{{
          String(props.price).toPersianDigits().concat(` ${props.price_unit}`)
        }}</span>
      </div>
    </div>
    <div class="flex justify-between w-full gap-4">
      <Button fluid variant="outlined" label="انصراف" @click="props.onCancel" />
      <Button
        fluid
        label="پرداخت"
        :disabled="isPurchaseLoading"
        :isLoading="isPurchaseLoading"
        @click="
          () => {
            isPurchaseLoading = true
            props.onConfirm()
          }
        "
      />
    </div>
  </VueFinalModal>
</template>
