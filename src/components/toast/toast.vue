<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
  }>(),
  {
    title: 'Hello, World!',
    text: 'Nothing Fancy In This World By The Way'
  }
)
</script>

<template>
  <div>custom title: {{ props.title }}</div>
  <div>custom text: {{ props.text }}</div>
</template>
