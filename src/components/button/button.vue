<script setup lang="ts">
import { cn } from '@/utils'
import type { ButtonProps } from './button'

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'lg',
  mode: 'primary',
  isLoading: false
})

const colours = {
  danger: 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700',
  primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700',
  success: 'bg-success-500 hover:bg-success-600 active:bg-success-700'
}
</script>

<template>
  <button
    :class="
      cn(colours[props.mode], 'text-neutral-white rounded-[14px] shadow-lg ', {
        'p-[10px]': props.size === 'xs',
        'p-[14px]': props.size === 'lg',
        'px-[14px] py-3': props.size === 'md',
        'px-3 py-[11px]': props.size === 'sm'
      })
    "
  >
    <slot name="rightIcon"></slot>
    <span :class="cn()">{{ label }}</span>
    <slot name="leftIcon"></slot>
  </button>
</template>
