<script setup lang="ts">
import { cn } from '@/utils'
import { defineProps, withDefaults, ref } from 'vue'
import EyeIcon from '@/components/icons/eye/index.vue'

import type { InputPasswordProps } from './input-password'

const { error } = withDefaults(defineProps<InputPasswordProps>(), {
  error: false
})

const showPassword = ref(false);

</script>

<template>
  <div class="flex flex-row text-secondary-600 hover:text-secondary-700 focus:text-secondary-900">
    <div @click="() => console.log('clicked!')" class="cursor-pointer z-50 inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
      <EyeIcon />
    </div>
    <input
      v-bind="$attrs"
      :class="
      cn(
        'pe-3 z-40 text-secondary-600 hover:text-secondary-700 focus:text-secondary-900',
        'border border-secondary-600 hover:border-secondary-700 focus:border-secondary-900',
        'h-[52px] text-secondary-900 max-w-60 w-full focus:outline-none rounded-[14px] p-3',
        {
          'border-danger-500 hover:border-danger-500 focus:border-danger-500': error,
        },
      )
    "
      :type="showPassword ? 'text' : 'password'"
    />
  </div>
</template>

<style scoped></style>
