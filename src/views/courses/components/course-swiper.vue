<script setup lang="ts">
import { computed, h, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { Language } from '@/queries'
import { getCourseList } from '@/queries'
import { CourseCard, CourseCardAction } from '@/views/courses/components'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const rParams = computed(() =>
  route.query.videoLanguageId ? Number(route.query.videoLanguageId) : undefined
)
const props = defineProps<Language>()

const { data, refetch } = useQuery({
  queryKey: [
    'course',
    'list',
    1,
    { languageId: props.id },
    { videoLanguageId: rParams.value }
  ],
  queryFn: () =>
    getCourseList({ page: 1, languageId: props.id, videoLanguageId: rParams.value }),
  enabled: !!rParams.value
})

watch(
  () => rParams,
  () => refetch(),
  { immediate: true, deep: true }
)

const courseList = computed(() => data.value?.data)
</script>

<template>
  <div v-if="courseList && courseList?.length > 0" class="space-y-2">
    <h2 class="text-text-500 text-h4 font-extra-bold lg:ps-40 lg:pe-4">
      {{ props.fa_name }}
    </h2>
    <div
      v-dragscroll
      class="flex flex-row gap-2 py-2 overflow-x-auto cursor-pointer fancy-scrollbar lg:ps-40 lg:pe-4"
    >
      <CourseCard
        v-bind="course"
        :key="course.id"
        v-for="course in courseList"
        action_variant="filled"
        :action_title="
          h(CourseCardAction, { title: 'دیدن دوره', subTitle: 'رایگان' })
        "
        :action_route="`/course/${course.id}`"
      />
    </div>
  </div>
</template>
