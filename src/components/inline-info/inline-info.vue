<script lang="ts" setup>
import type { Component } from 'vue'
import { InfoCircleIcon } from '@/components/icons'

const props = defineProps<{ icon?: Component; text: string }>()
</script>

<template>
  <div class="flex items-start gap-2">
    <span><Component :is="props.icon ?? InfoCircleIcon" /></span>
    <p>{{ props.text }}</p>
  </div>
</template>
