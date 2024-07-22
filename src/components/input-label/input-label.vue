<script lang="ts" setup>
const props = defineProps<{ name: string; text: string }>()
</script>

<template>
  <label :for="name" class="text-text-500 text-st-two font-demi-bold">
    {{ props.text }}
  </label>
</template>
