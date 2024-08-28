<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, h, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import { getCourseList, type Language } from '@/queries'
import {
  CourseCard,
  CourseCardAction,
  CourseSwiperSkelton
} from '@/views/courses/components'

const route = useRoute()
const rParams = computed(() =>
  route.query.videoLanguageId ? Number(route.query.videoLanguageId) : undefined
)
const props = defineProps<Language & { isLangsLoading: boolean }>()

const { data, refetch, isLoading } = useQuery({
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
  <CourseSwiperSkelton v-if="isLoading || props.isLangsLoading" />
  <div v-else-if="courseList && courseList?.length > 0" class="space-y-2">
    <h2 class="text-text-500 text-h4 font-extra-bold lg:ps-40 lg:pe-4">
      {{ props.fa_name }}
    </h2>
    <div
      v-dragscroll
      class="flex flex-row gap-2 py-2 overflow-x-auto cursor-pointer lg:ps-40 lg:pe-4"
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
