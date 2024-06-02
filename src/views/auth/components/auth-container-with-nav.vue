<script lang="ts" setup>
import { AuthHeader } from '@/views/auth/components'

const props = defineProps<{ title: string }>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center max-w-sm mx-auto max-sm:min-h-screen md:h-full max-tablet:px-4"
  >
    <AuthHeader :title="props.title" />
    <div
      class="flex items-center justify-center flex-1 h-full mt-0 sm:mt-16 lg:mt-0"
    >
      <slot />
    </div>
  </div>
</template>
