<script lang="ts" setup>
import { TokenIcon } from '@/components/icons'

const props = defineProps<{ token_count: number }>()
</script>

<template>
  <div
    class="flex rtl:flex-row-reverse gap-1.5 items-center rounded-full px-4 py-3 h-12 bg-[#7B33BB]/20"
  >
    <span
      class="inline-flex rtl:flex-row-reverse text-st-one font-extra-bold text-[#7B33BB]"
    >
      <span>توکن</span>
      <span>{{ String(props.token_count).toPersianDigits() }}</span>
    </span>
    <TokenIcon />
  </div>
</template>
