<script setup lang="ts">
const props = withDefaults(defineProps<{ label: string; to: string }>(), {
  to: '',
  label: ''
})
</script>

<template>
  <router-link :to="props.to">
    <span class="text-primary-500 text-st-two font-demi-bold">
      {{ props.label }}
    </span>
  </router-link>
</template>
