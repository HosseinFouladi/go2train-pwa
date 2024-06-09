<script setup lang="ts">
import { WarningIcon } from '@/components/icons'

const props = withDefaults(defineProps<{ error?: string }>(), {
  error: undefined
})
</script>

<template>
  <span
    class="inline-flex h-5 max-h-5 text-danger-600 flex-row items-center text-st-two font-regular gap-[6px]"
  >
    <span v-if="props.error">
      <span>
        <WarningIcon />
      </span>
      <span>{{ props.error }}</span>
    </span>
  </span>
</template>
