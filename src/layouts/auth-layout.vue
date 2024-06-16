<script setup lang="ts">
import { cn } from '@/utils'
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row bg-background-default">
    <div class="w-full px-4 lg:px-0">
      <slot />
    </div>
    <div
      :class="
        cn(
          'w-full hidden sm:inline-flex bg-auth-layout bg-cover bg-center bg-no-repeat h-[338px] lg:h-screen rounded-b-[78px] rounded-tr-none lg:rounded-bl-none  lg:rounded-r-[78px]'
        )
      "
    />
  </div>
</template>

<style scoped></style>
