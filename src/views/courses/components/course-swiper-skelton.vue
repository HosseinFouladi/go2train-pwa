<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'

const skelton = computed(() => new Array(10))
</script>

<template>
  <div class="space-y-2 lg:ps-40 lg:pe-4">
    <Skeleton height="40px" width="100px" />
    <div class="flex flex-row gap-2 py-2 cursor-pointer">
      <Skeleton
        :key="item"
        v-for="item in skelton"
        height="244px"
        class="lg:min-w-[253px] xl:min-w-80 w-80 h-40"
      />
    </div>
  </div>
</template>
