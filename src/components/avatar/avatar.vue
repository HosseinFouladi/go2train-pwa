<script setup lang="ts">
const props = withDefaults(defineProps<{ image?: string; label?: string }>(), {})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="h-[78px] w-[78px] rounded-full overflow-hidden">
      <img
        class="object-cover w-full h-full"
        :src="
          props.image
            ? props.image
            : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
        "
      />
    </div>
    <span class="text-st-one font-demi-bold">{{ props.label }}</span>
  </div>
</template>
