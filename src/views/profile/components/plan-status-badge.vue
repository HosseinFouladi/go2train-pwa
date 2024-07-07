<script lang="ts" setup>
import { cn } from '@/utils'
import type { Component } from 'vue'
import { ClockIcon } from '@/components/icons'

const props = withDefaults(
  defineProps<
    Partial<{
      label: string
      iconLeft: Component
      iconRight: Component
      isLoading: boolean
      plan_priority: 1 | 2 | 3
      disabled: boolean
      theme: string
    }>
  >(),
  { plan_priority: 1, iconRight: ClockIcon }
)
</script>

<template>
  <button
    :class="
      cn(
        'font-demi-bold flex items-center justify-center gap-0.5 text-secondary-900 p-3 rounded-[14px]',
        {
          'border border-plan-bronze': props.plan_priority === 1,
          'border border-plan-silver': props.plan_priority === 2,
          'border border-plan-gold': props.plan_priority === 3
        }
      )
    "
    :disabled="props.disabled"
    v-bind="$attrs"
  >
    <Component v-if="props.iconRight" :is="props.iconRight" />
    <span class="px-[10px] text-st-two">
      <span v-if="props.isLoading"><SpinnerIcon class="animate-spin" /></span>
      <span v-if="!props.isLoading">
        {{ props.label?.concat(' روز مانده').toPersianDigits() }}</span
      >
    </span>
    <Component v-if="props.iconLeft" :is="props.iconLeft" />
  </button>
</template>


