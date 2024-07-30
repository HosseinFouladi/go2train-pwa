<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import axios from 'axios'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

const props = withDefaults(
  defineProps<{ avatar_url: string; badge_url: string; width: string }>(),
  {
    width: '40px'
  }
)

const imagePlaceholder = ref('')

onMounted(async () => {
  axios
    .get(props.avatar_url)
    .then(() => (imagePlaceholder.value = props.avatar_url))
    .catch(() => (imagePlaceholder.value = AvatarPlaceholder))
})
</script>

<template>
  <div :style="{ width: width,height:width }" class="relative isolate">
    <img :src="props.badge_url" class="absolute z-50 w-full h-full" />
    <img
      :src="imagePlaceholder"
      class="absolute top-0 bottom-0 left-0 right-0 m-auto rounded-full h-[86%] w-[86%] aspect-square"
    />
  </div>
</template>
