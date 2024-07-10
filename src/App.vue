<script setup lang="ts">
import { PWABadge } from '@/components'
import { ModalsContainer } from 'vue-final-modal'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <router-view />
  <VueQueryDevtools :initialIsOpen="true" />
  <ModalsContainer />
  <PWABadge />
</template>
