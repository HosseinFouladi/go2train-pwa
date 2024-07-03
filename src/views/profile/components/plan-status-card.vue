<script lang="ts" setup>
import { Button } from '@/components'
import { useGetCurrentPlan } from '@/queries'
import { watch } from 'vue'

const { data: currentPlan } = useGetCurrentPlan()
</script>

<template>
  <section class="w-full p-6 card rounded-2xl bg-neutral-white h-fit">
    <div class="flex items-center justify-between">
      <div class="flex gap-1">
        <span class="text-h6 font-demi-bold">اشتراک فعال شما:</span>
        <span class="text-h6 font-demi-bold">
          <!-- {{ Accounts[props.account_type] }} -->
        </span>
      </div>
      <Button
        disabled
        size="sm"
        :fluid="false"
        variant="outlined"
        :label="'۱۸ روز مانده'"
      />
    </div>
  </section>
</template>

<style></style>
