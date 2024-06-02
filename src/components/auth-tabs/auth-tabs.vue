<script setup lang="ts">
import { cn } from '@/utils'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const { path } = useRoute()

const tabs = computed(() => [
  { name: 'ورود', href: '/sign-in', current: path === '/sign-in' },
  { name: 'ثبت نام', href: '/sign-up', current: path === '/sign-up' }
])
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div class="h-[52px] rounded-full bg-secondary-100 min-w-[258px]">
      <nav
        class="flex items-center justify-between flex-1 min-w-full h-full gap-2 p-[6px]"
        aria-label="Auth Tabs"
      >
        <router-link
          v-for="tab in tabs"
          :key="tab.name"
          :to="tab.href"
          :class="
            cn(
              'w-full flex items-center justify-center h-full rounded-full text-center',
              {
                'bg-neutral-white font-demi-bold transition-all duration-200 shadow-lg':
                  tab.current,
                'text-st-one': !tab.current
              }
            )
          "
          :aria-current="tab.current ? 'page' : undefined"
        >
          <span>{{ tab.name }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
