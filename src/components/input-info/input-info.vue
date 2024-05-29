<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import WarningIcon from '@/components/icons/warning/index.vue'

const props = withDefaults(defineProps<{ label: string }>(), {
  label: undefined
})
</script>

<template>
  <span
    class="inline-flex text-danger-600 flex-row items-center text-st-two font-regular gap-[6px]"
  >
    <span>
      <WarningIcon />
    </span>
    <span>{{ props.label }}</span>
  </span>
</template>
