<script setup lang="ts">
import { WarningIcon } from '@/components/icons'
import type { ValidationError } from '@tanstack/vue-form'

const props = withDefaults(defineProps<{ error?: ValidationError }>(), {
  error: undefined
})
</script>

<template>
  <div
    class="min-h-8 pb-2 text-danger-600 flex flex-row items-center text-st-two font-regular gap-[6px]"
  >
    <span class="inline-block">
      <WarningIcon />
    </span>
    <span class="inline-block">{{ props.error }}</span>
  </div>
</template>
