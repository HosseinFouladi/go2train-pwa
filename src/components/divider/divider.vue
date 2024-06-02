<script setup lang="ts">
import { defineProps } from 'vue'
import type { ClassValue } from 'clsx'

import { cn } from '@/utils'

withDefaults(defineProps<{ sx: ClassValue }>(), {
  sx: ''
})
</script>

<template>
  <div
    :class="
      cn('flex flex-row items-center justify-center gap-2 text-secondary-200', sx)
    "
  >
    <span class="h-[1px] flex-1 w-full bg-secondary-200" />
    <span>یا</span>
    <span class="h-[1px] flex-1 w-full bg-secondary-200" />
  </div>
</template>
