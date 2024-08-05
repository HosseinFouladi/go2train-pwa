<template>
  <nav class="flex items-center justify-between px-4 py-3 shadow-md">
    <div
      class="flex flex-col items-center justify-center gap-1"
      @click="toggleSidebar"
    >
      <span
        :class="
          cn({
            'rotate-45 translate-y-[3.5px]': isOpen
          })
        "
        class="w-6 h-[3px] bg-text-500"
      ></span>
      <span v-if="!isOpen" class="w-6 h-[3px] bg-text-500"></span>
      <span
        :class="
          cn({
            '-rotate-45 -translate-y-[3.5px] ': isOpen
          })
        "
        class="w-6 h-[3px] bg-text-500"
      ></span>
    </div>

    <Logo class="w-[180px] h-[48px]" />
    <!-- TODO: Do Not Have Notification Service Enabled Yet -->
    <!-- <div class="relative">
      <MessageIcon />
      <div
        class="absolute flex items-center justify-center w-4 rounded-full bg-primary-500 text-neutral-white -right-2 -top-2"
      >
        <span class="leading-normal text-sm-cp">3</span>
      </div>
    </div> -->
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { Logo } from '@/components'
import { MessageIcon } from '@/components/icons'
import { cn } from '@/utils'
import { useToggleSidebar } from '@/stores'



const store = useToggleSidebar()
const { toggleSidebar } = store
const { isOpen } = storeToRefs(store)
</script>

<style scoped></style>
