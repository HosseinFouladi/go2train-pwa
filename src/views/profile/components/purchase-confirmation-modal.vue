<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'
import { Button } from '@/components'

const props = defineProps<{
  icon: string
  onConfirm: Function
  onCancel: Function
  priority: 1 | 2 | 3
  price: number
  price_unit: string
}>()
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex flex-col items-center max-w-xl gap-8 p-4 mx-4 space-y-2 rounded-lg w-96 bg-neutral-white dark:bg-secondary-900 dark:border-secondary-700"
  >
    <div class="bg-plan-bronze rounded-2xl">
      <img class="w-12 h-12" :src="props.icon" />
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
        class="flex flex-row items-center justify-between w-full gap-2 font-demi-bold text-h6 text-primary-500 text-st-two"
      >
        <span>قابل پرداخت</span>
        <span>{{
          String(props.price).toPersianDigits().concat(` ${props.price_unit}`)
        }}</span>
      </div>
    </div>
    <div class="flex justify-between w-full gap-4">
      <Button fluid variant="outlined" label="انصراف" @click="props.onCancel" />
      <Button fluid label="پرداخت" @click="props.onConfirm" />
    </div>
  </VueFinalModal>
</template>
