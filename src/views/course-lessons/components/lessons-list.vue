<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Skeleton from 'primevue/skeleton'

import { CourseListItem } from '.'
import { useCourseSectionsQuery } from '@/queries'

const route = useRoute()

const { data, isLoading } = useCourseSectionsQuery(String(route.params.courseId))
const sections = computed(() => data.value?.data)
</script>

<template>
  <div class="space-y-2.5">
    <h2 class="text-h6 text-text-500 font-demi-bold">لیست دروس</h2>
    <div class="space-y-4">
      <Skeleton
        height="64px"
        borderRadius="16px"
        class="rounded-2xl"
        :key="index"
        v-show="isLoading"
        v-for="(_, index) in new Array(10)"
      />
      <CourseListItem
        v-bind="section"
        :key="section.id"
        v-show="!isLoading"
        v-for="section in sections"
      />
    </div>
  </div>
</template>
