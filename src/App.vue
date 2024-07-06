<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <router-view />
  <VueQueryDevtools :initialIsOpen="true" />
  <ModalsContainer />
</template>
