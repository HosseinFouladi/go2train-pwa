<script lang="ts" setup>
import { AuthTabs, Logo } from '@/components'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center max-w-sm mx-auto max-sm:min-h-screen md:h-full max-tablet:px-4"
  >
    <Logo class="mt-0 sm:mt-8 lg:mt-0" />
    <div class="w-full mt-8 md:mt-10 lg:mt-14">
      <AuthTabs />
    </div>
    <slot />
  </div>
</template>
