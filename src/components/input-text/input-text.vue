<script setup lang="ts">
import { cn } from '@/utils'
import { defineProps, withDefaults } from 'vue'

import type { InputTextProps } from './input-text'

const props = withDefaults(defineProps<InputTextProps>(), {
  error: false,
  iconLeft: undefined,
  iconRight: undefined
})
</script>

<template>
  <div
    class="relative text-secondary-600 hover:text-secondary-700 focus:text-secondary-900"
  >
    <div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
      <Component :is="props.iconLeft" />
    </div>
    <input
      :class="
        cn(
          'text-secondary-600 hover:text-secondary-700 focus:text-secondary-900',
          'border border-secondary-600 hover:border-secondary-700 focus:border-secondary-900',
          'h-[52px] text-secondary-900 max-w-60 w-full focus:outline-none rounded-[14px] p-3',
          {
            'border-danger-500 hover:border-danger-500 focus:border-danger-500':
              error,
            'ps-8': !!props.iconRight,
            'pe-3': !!props.iconLeft
          }
        )
      "
      v-bind="$attrs"
    />
    <div
      v-if="props.iconRight"
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
    >
      <Component :is="props.iconRight" />
    </div>
  </div>
</template>

<style scoped></style>
