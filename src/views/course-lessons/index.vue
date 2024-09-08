<script lang="ts" setup>
import { computed } from 'vue'
import { first } from 'lodash'
import { FlagIcon } from '@/components/icons'
import {
  CourseStatus,
  LessonsList,
  LessonTabs
} from '@/views/course-lessons/components'
import { useCourseSectionsQuery } from '@/queries'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: courseSections } = useCourseSectionsQuery(
  String(route.params.courseId)
)

const section = computed(() => {
  return first(
    courseSections.value?.data.filter((item) => item.id == route.query.section_id)
  )
})
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row bg-background-default">
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
          ></div>
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
</template>

<!-- course/section/{courseId} [*] -->
<!-- user/profile [ * ] -->
<!-- user/cups [ * ] -->
<!-- profile/statistics [ * ] -->
