<script setup lang="ts">
import { useRoute } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
const route = useRoute()
</script>

<template>
  <component :is="route.meta.layout">
    <router-view />
  </component>
  <VueQueryDevtools :initialIsOpen="true" />
</template>
