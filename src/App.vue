<script setup lang="ts">
import { onMounted } from 'vue'
import { PWABadge } from '@/components'
import nightwind from 'nightwind/helper'
import { ModalsContainer } from 'vue-final-modal'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

onMounted(() => {
  const script = document.createElement('script')
  script.innerHTML = nightwind.init()
  document.head.appendChild(script)
})
</script>

<template>
  <router-view />
  <VueQueryDevtools :initialIsOpen="true" />
  <ModalsContainer />
  <PWABadge />
</template>
