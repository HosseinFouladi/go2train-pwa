<script lang="ts" setup>
import type { Component } from 'vue'
import { useRouter } from 'vue-router'

import { cn } from '@/utils'

const router = useRouter()

const props = defineProps<{
  label: string
  icon: Component
  route?: string
  click?: Function
  theme: 'default' | 'premium'
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex gap-3 rtl:flex-row-reverse rtl:justify-end w-full p-3 cursor-pointer',
        {
          'hover:bg-[#6613EE]/10 hover:text-[#6613EE] hover:font-demi-bold transition-all rounded-full duration-300':
            props.theme === 'premium',
          'hover:bg-primary-50 hover:text-primary-600 hover:font-demi-bold rounded-full duration-300':
            props.theme === 'default'
        }
      )
    "
    @click="
      click && typeof click === 'function'
        ? click()
        : props.route
          ? router.push(`/profile${props.route}`)
          : undefined
    "
  >
    <span class="text-st-one">{{ props.label }}</span>
    <span :class="cn({ 'text-[#6613EE]': props.theme === 'premium' })">
      <Component :is="props.icon" />
    </span>
  </div>
</template>
