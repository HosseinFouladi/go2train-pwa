<script setup lang="ts">
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
const props = withDefaults(defineProps<{ image?: string; label?: string }>(), {})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="h-[78px] w-[78px] rounded-full overflow-hidden">
      <img
        class="object-cover w-full h-full"
        :src="props.image ? props.image : AvatarPlaceholder"
      />
    </div>
    <span class="text-st-one font-demi-bold">{{ props.label }}</span>
  </div>
</template>
