<script lang="ts" setup>
import { Logo } from '@/components'
import { AuthTabs } from '@/views/auth/components'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center max-w-sm mx-auto gap-9 max-sm:min-h-screen md:h-full max-tablet:px-4"
  >
    <div class="flex flex-col flex-[2_2_0%] items-center justify-end w-full">
      <Logo class="mt-0 sm:mt-8 lg:mt-0" />
      <div class="w-full mt-8 md:mt-10 lg:mt-14">
        <AuthTabs />
      </div>
    </div>
    <div class="flex-[4_4_0%] w-full">
      <slot />
    </div>
  </div>
</template>
