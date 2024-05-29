<script setup lang="ts">
import { cn } from '@/utils'
</script>

<template>
  <div
    class="flex flex-col tablet:flex-row justify-between w-full h-full min-h-screen bg-background-default"
  >
    <div
      :class="
        cn(
          'w-full bg-auth-layout bg-cover min-h-[248px] mobile:min-h-[374px] tablet:min-h-screen',
          'max-mobile:rounded-b-[68px] max-tablet:rounded-b-[78px] tablet:rounded-r-[78px]'
        )
      "
    />
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
