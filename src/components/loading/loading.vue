<template>
  <ProgressSpinner
    :style="props.style"
    strokeWidth="6"
    :fill="props.fill"
    :animationDuration="props.animationDuration"
    aria-label="Custom ProgressSpinner"
  />
</template>

<script setup lang="ts">
import type { LoadingProps } from './loading'
const props = withDefaults(defineProps<LoadingProps>(), {
  style: 'width: 50px; height: 50px',
  fill: 'transparent',
  animationDuration: '.5s'
})
</script>
