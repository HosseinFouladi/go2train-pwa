<script setup lang="ts">
import { cn } from '@/utils'
import type { ButtonProps } from './button'
import { buttonTheme } from './button.style'
import SpinnerIcon from '@/components/icons/spinner/index.vue'

const { size, fluid, mode, isLoading, variant, iconRight, iconLeft, disabled } =
  withDefaults(defineProps<ButtonProps>(), {
    size: 'lg',
    fluid: false,
    mode: 'primary',
    isLoading: false,
    variant: 'filled',
    disabled: false
  })
</script>

<template>
  <button
    v-bind="$attrs"
    :class="
      cn(
        'font-demi-bold',
        'flex items-center justify-between font-demi-bold',
        'text-neutral-white rounded-[14px] shadow-lg duration-200',
        buttonTheme[variant][disabled ? 'disabled' : mode],
        {
          'p-[10px]': size === 'xs',
          'p-[14px]': size === 'lg',
          'px-[14px] py-3': size === 'md',
          'px-3 py-[11px]': size === 'sm'
        },
        {
          'w-full': fluid,
          'pointer-events-none': disabled
        }
      )
    "
    :disabled="disabled"
  >
    <Component v-if="iconLeft" :is="iconLeft" />
    <span
      :class="
        cn({
          'px-2': size === 'xs',
          'px-3': size === 'lg',
          'px-[10px]': size == 'md' || size == 'sm'
        })
      "
    >
      <span v-if="isLoading"><SpinnerIcon class="animate-spin" /></span>
      <span v-if="!isLoading">{{ label }}</span>
    </span>
    <Component v-if="iconRight" :is="iconRight" />
  </button>
</template>
