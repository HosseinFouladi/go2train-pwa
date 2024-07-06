<script lang="ts" setup>
import { computed, h } from 'vue'
import { differenceInDays, parseISO } from 'date-fns'

import { DateInfo } from '.'
import { useGetCurrentPlan } from '@/queries'
import { ClockIcon, ReceiptIcon } from '@/components/icons'
import { Button, InlineInfo, LineDivider } from '@/components'

const { data } = useGetCurrentPlan()
const currentPlan = computed(() => data.value?.data.results)
const daysLeft = computed(
  () =>
    currentPlan.value?.expired_at &&
    String(
      differenceInDays(parseISO(currentPlan.value?.expired_at), new Date())
    ).toPersianDigits()
)
</script>

<template>
  <section class="w-full p-6 space-y-4 card rounded-2xl bg-neutral-white h-fit">
    <div class="flex items-center justify-between">
      <div class="flex gap-1">
        <span class="text-h6 font-demi-bold"
          >اشتراک فعال شما: {{ currentPlan?.title }}</span
        >
        <span class="text-h6 font-demi-bold text">
          <!-- {{ Accounts[props.account_type] }} -->
        </span>
      </div>
      <Button
        v-if="daysLeft"
        disabled
        size="sm"
        :fluid="false"
        variant="outlined"
        :label="`${daysLeft} روز مانده`"
        :iconRight="h(ClockIcon, { height: '18', width: '18' })"
      />
    </div>
    <InlineInfo
      class="text-st-two text-text-400"
      text="همواره میتوانید اشتراک فعلی خود را ارتقا دهید. توجه داشته باشید در صورت خرید اشتراک جدید، مانده اشتراک فعلی از بین می رود."
    />
    <LineDivider />
    <div class="flex items-center justify-between">
      <div class="flex gap-4 text-text-400">
        <DateInfo :date="currentPlan?.expired_at" label="زمان خرید‍" />
        <DateInfo :date="currentPlan?.expired_at" label="زمان اتمام اشتراک" />
      </div>
      <Button
        label="مشاهده فاکتور"
        :iconRight="ReceiptIcon"
        variant="text"
        mode="disabled"
        size="xs"
      />
    </div>
  </section>
</template>

<style></style>
