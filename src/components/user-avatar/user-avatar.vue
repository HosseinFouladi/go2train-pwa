<script lang="ts" setup>
const props = defineProps<{ avatar_url: string; badge_url: string }>()
</script>

<template>
  <div class="relative w-10 h-10 isolate">
    <img :src="props.badge_url" class="absolute z-50 w-full h-full" />
    <img
      :src="props.avatar_url"
      class="absolute top-0 bottom-0 left-0 right-0 m-auto rounded-full h-[86%] w-[86%]"
    />
  </div>
</template>
