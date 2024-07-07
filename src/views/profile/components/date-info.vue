<script setup lang="ts">
import { computed } from 'vue'
import { format, parseISO } from 'date-fns-jalali'

import { CalendarIcon } from '@/components/icons'
const props = defineProps<{ date?: string; label?: string }>()
const date = computed(() => format(parseISO(props.date || ''), 'yyyy,MM,dd'))
</script>

<template>
  <div v-if="props.date" class="flex items-center gap-2">
    <CalendarIcon />
    <div class="text-st-two">
      <span v-if="props.label">{{ props.label }}: </span>
      <span>{{ date.toPersianDigits() }}</span>
    </div>
  </div>
</template>
