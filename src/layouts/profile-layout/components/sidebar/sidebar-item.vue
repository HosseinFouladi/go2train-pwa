<script lang="ts" setup>
import type { Component } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { cn } from '@/utils'

const r = useRoute()
const router = useRouter()

const props = defineProps<{
  label: string
  icon: Component
  route?: string
  click?: () => void
  theme: 'default' | 'premium'
  external?: boolean
}>()

</script>

<template>
  <component
    :is="external === true ? 'a' : 'div'"
    :href="props.route"
    :class="
      cn(
        'flex gap-3 rtl:flex-row-reverse rtl:justify-end w-full p-3 cursor-pointer my-1',
        props.theme === 'premium' &&
          r.path.includes(props.route as string) &&
          'bg-[#6613EE]/10 text-[#6613EE] font-demi-bold rounded-full',
        props.theme === 'default' &&
          r.path.includes(props.route as string) &&
          'bg-primary-50 text-primary-600 font-demi-bold rounded-full',
        {
          'hover:bg-[#6613EE]/10 hover:text-[#6613EE] hover:font-demi-bold transition-all rounded-full duration-300':
            props.theme === 'premium',
          'hover:bg-primary-50 hover:text-primary-600 hover:font-demi-bold transition-all rounded-full duration-300':
            props.theme === 'default'
        }
      )
    "
    @click="
      () => {
        if (external) return
        click && typeof click === 'function'
          ? click()
          : props.route
            ? router.push(`/profile${props.route}`)
            : undefined
      }
    "
  >
    <span class="text-st-one">{{ props.label }}</span>
    <span :class="cn({ 'text-[#6613EE]': props.theme === 'premium' })">
      <Component :is="props.icon" />
    </span>
  </component>
</template>
