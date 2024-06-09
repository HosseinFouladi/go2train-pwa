<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/utils'

import { InputInfo } from '@/components'
import { EyeIcon, EyeSlashIcon } from '@/components/icons'
import type { InputPasswordProps } from '.'

const { error } = withDefaults(defineProps<InputPasswordProps>(), {
  error: undefined,
  toggle: true
})

const showPassword = ref<boolean>(false)
const toggleShowPassword = () => (showPassword.value = !showPassword.value)
</script>

<template>
  <div class="flex w-full flex-col gap-0.5">
    <div
      class="relative w-full text-secondary-600 hover:text-secondary-700 focus:text-secondary-900"
    >
      <button
        v-if="toggle"
        @click="toggleShowPassword"
        class="absolute inset-y-0 flex items-center end-0 pe-3"
      >
        <EyeIcon v-if="!showPassword" />
        <EyeSlashIcon v-if="showPassword" />
      </button>
      <input
        :type="showPassword ? 'text' : 'password'"
        :class="
          cn(
            'text-secondary-600 hover:text-secondary-700 focus:text-secondary-900',
            'border border-secondary-600 hover:border-secondary-700 focus:border-secondary-900',
            'h-[52px] text-secondary-900 w-full focus:outline-none rounded-[14px] p-3',
            {
              'border-danger-500 hover:border-danger-500 focus:border-danger-500':
                error
            }
          )
        "
        v-bind="$attrs"
      />
    </div>
    <InputInfo :error="error" />
  </div>
</template>

<style scoped></style>
