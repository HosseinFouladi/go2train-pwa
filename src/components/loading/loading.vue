<template>
  <ProgressSpinner
    :style="style"
    strokeWidth="6"
    :fill="fill"
    :animationDuration="animationDuration"
    aria-label="Custom ProgressSpinner"
  />
</template>

<script setup lang="ts">
import type { LoadingProps } from './loading'
const { style, fill, animationDuration } = withDefaults(
  defineProps<LoadingProps>(),
  {
    style: 'width: 50px; height: 50px',
    fill: 'transparent',
    animationDuration: '.5s'
  }
)
</script>
