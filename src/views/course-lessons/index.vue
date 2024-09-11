<script lang="ts" setup>
import { computed } from 'vue'
import { first } from 'lodash'
import Message from 'primevue/message'

import { FlagIcon, ArrowRight } from '@/components/icons'
import {
  CourseStatus,
  LessonsList,
  LessonTabs,
  LessonAccordion
} from '@/views/course-lessons/components'
import { useCourseSectionsQuery } from '@/queries'
import { useRoute } from 'vue-router'
import { CustomPlayer } from '../profile/courses/components'

const route = useRoute()

const {
  data: courseSections,
  isFetching,
  isPending,
  isError,
  error
} = useCourseSectionsQuery(String(route.params.courseId))

const section = computed(() => {
  return (
    first(
      courseSections.value?.data.filter((item) => item.id == route.query.section_id)
    ) || courseSections.value?.data[0] //if not exist section id in query params it takes first section
  )
})
</script>

<template>
  <div class="flex-col-reverse hidden lg:flex bg-background-default">
    <div class="w-full flex flex-row pt-6 h-full max-w-[1128px] mx-auto gap-6">
      <div class="min-w-[360px] card min-h-56 space-y-6">
        <CourseStatus />
        <LessonsList />
      </div>
      <div class="w-full p-6 card">
        <div class="space-y-3">
          <h2 v-if="section" class="text-h5 font-demi-bold text-text-500">
            {{ section.title }}
          </h2>
          <div
            class="w-full border-2 bg-secondary-50 h-96 rounded-2xl border-secondary-400"
          >
            <CustomPlayer
              :access_list="[
                {
                  id: 0,
                  title: 'p240',
                  description: '',
                  image: '',
                  slug: 'has p240 access'
                },
                { id: 1, title: 'p360', description: '', image: '', slug: '' },
                { id: 2, title: 'p720', description: '', image: '', slug: '' },
                { id: 3, title: 'p1080', description: '', image: '', slug: '' }
              ]"
              :stream="section?.stream"
            />
          </div>
          <div data-title="lesson_action">
            <div
              @click="() => console.log('')"
              class="flex items-center justify-center gap-1 p-2 cursor-pointer w-fit"
            >
              <span class="">گزارش</span>
              <FlagIcon class="text-[16px]" />
            </div>
          </div>
        </div>
        <LessonTabs />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 p-4 lg:hidden mobile-box">
    <div class="flex justify-between">
      <ArrowRight />
      <h3 class="text-text-400 font-demi-bold text-sm-st-one md:text-h6">
        لیست دروس
      </h3>
      <div class=""></div>
    </div>
    <CourseStatus />
    <h1 class="text-h5 text-text-500 font-demi-bold">درسهای دوره</h1>
    <Skeleton
      v-if="isFetching || isPending"
      size="250px"
      class="min-w-full h-[2000px]"
    ></Skeleton>
    <Message class="mx-auto my-10" v-else-if="isError" severity="error" > {{ error }}</Message>
    <LessonAccordion :courseSections="courseSections?.data" v-else />
  </div>
</template>

<!-- course/section/{courseId} [*] -->
<!-- user/profile [ * ] -->
<!-- user/cups [ * ] -->
<!-- profile/statistics [ * ] -->
