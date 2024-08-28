<script lang="ts" setup>
const props = defineProps<{ title: string; subTitle?: string }>()
</script>

<template>
  <span class="flex flex-row items-center justify-center gap-1">
    <span class="text-st-two text-neutral-white font-demi-bold">{{
      props.title
    }}</span>
    <span v-if="props.subTitle" class="text-secondary-900 text-st-two font-demi-bold"
      >({{ props.subTitle }})</span
    >
  </span>
</template>
