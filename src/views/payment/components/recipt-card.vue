<script lang="ts" setup>
import Skeleton from 'primevue/skeleton'
import { format } from 'date-fns-jalali'
import type { PaymentPlanResponse } from '@/queries';

defineProps<Partial<PaymentPlanResponse & { isLoading: boolean }>>()
</script>

<template>
  <div v-if="isLoading" class="overflow-hidden rounded-3xl">
    <Skeleton width="100%" height="140px"></Skeleton>
  </div>
  <div v-else class="flex flex-col h-[140px] items-center justify-center w-full p-6 space-y-6 bg-secondary-50 rounded-3xl">
    <div class="flex flex-row items-center w-full gap-4 text-st-one">
      <span>نام</span>
      <span class="border flex-1 border-dashed h-[0.5px] border-text-200"></span>
      <span>{{ username }}</span>
    </div>
    <div class="flex flex-row items-center w-full gap-4 text-st-one">
      <span>تاریخ</span>
      <span class="border flex-1 border-dashed h-[0.5px] border-text-200"></span>
      <span>{{ format(today_date as string, 'yyyy/M/d').toPersianDigits() }}</span>
    </div>
  </div>
</template>
