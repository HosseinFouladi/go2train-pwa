<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { defineProps, withDefaults } from 'vue'
import ArrowRightIcon from '@/components/icons/arrow-right/index.vue'

const router = useRouter()
const goBack = () => router.go(-1)

const props = withDefaults(defineProps<{ title: string }>(), {
  title: ''
})
</script>

<template>
  <div
    class="relative flex flex-row items-center justify-center w-full h-10 max-w-sm mx-auto"
  >
    <span
      @click="goBack"
      class="absolute inset-x-0 cursor-pointer inset-y-2 place-self-center"
    >
      <ArrowRightIcon />
    </span>
    <div>
      {{ props.title }}
    </div>
  </div>
</template>
