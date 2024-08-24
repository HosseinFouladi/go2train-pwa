<script lang="ts" setup>
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

const props = withDefaults(
  defineProps<{ avatar_url: string; badge_url: string; width: string }>(),
  {
    width: '40px'
  }
)


</script>

<template>
  <div :style="{ width: width,height:width }" class="relative isolate">
    <img v-if="badge_url" :src="props.badge_url" class="absolute z-20 w-full h-full" alt="badge"/>
    <img
     v-if="avatar_url"
      :src="avatar_url"
      class="absolute top-0 bottom-0 left-0 right-0 z-50 m-auto rounded-full h-[86%] w-[86%] aspect-square"
      alt="avatar"
    />
    <img v-else :src="AvatarPlaceholder" alt="placeholder">
  </div>
</template>
