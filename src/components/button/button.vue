<script setup lang="ts">
import { cn } from '@/utils'
import type { ButtonProps } from './button'
import { buttonTheme } from './button.style'
import { SpinnerIcon } from '@/components/icons'

const { size, fluid, mode, isLoading, variant, iconRight, iconLeft, disabled } =
  withDefaults(defineProps<ButtonProps>(), {
    size: 'md',
    fluid: false,
    mode: 'primary',
    isLoading: false,
    variant: 'filled',
    disabled: false
  })
</script>

<template>
  <button
    :class="
      cn(
        'font-demi-bold',
        'flex items-center justify-center font-demi-bold',
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
          'w-fit': !fluid,
          'pointer-events-none': disabled
        }
      )
    "
    :disabled="disabled"
    v-bind="$attrs"
  >
    <Component v-if="iconRight" :is="iconRight" />
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
    <Component v-if="iconLeft" :is="iconLeft" />
  </button>
</template>
