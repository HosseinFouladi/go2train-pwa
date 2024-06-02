<script lang="ts" setup>
import { useRouter } from 'vue-router'
import ArrowRightIcon from '@/components/icons/arrow-right/index.vue'

const router = useRouter()
const goBack = () => router.go(-1)

const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-end w-full h-20 max-w-sm mx-auto lg:h-24">
    <div class="relative flex items-center justify-center w-full">
      <span @click="() => goBack()" class="absolute right-0 p-4 cursor-pointer">
        <ArrowRightIcon />
      </span>
      <span class="font-demi-bold text-h6 md:text-h5">
        {{ props.title }}
      </span>
    </div>
  </div>
</template>
