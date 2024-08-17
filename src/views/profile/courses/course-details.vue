<template>
  <div class="w-full overflow-hidden">
    <div
      v-if="isPending || isFetching"
      class="flex items-center justify-center w-full min-h-[540px]"
    >
      <Loading />
    </div>
    <div v-else>
      <div class="block xl:hidden">
        <Header
          :title="courseInfo?.data.title"
          :level-title="courseInfo?.data.level.title"
          :score="courseInfo?.data.score"
          :lang-icon="courseInfo?.data.language.image"
          :poster="courseInfo?.data.fullPoster"
          :description="courseInfo?.data.shortDescription"
        />
        <div
          class="relative z-50 p-4 -mt-4 bg-neutral-white rounded-t-2xl md:-mt-16 md:max-w-[672px] md:mx-auto md:p-6 md:shadow"
        >
          <IntroductionVideo
            v-if="!currentPlanFetching && !currentPlanPending"
            :access_list="currentPlan?.data.results[0].access_list"
            :stream="courseInfo?.data?.stream"
            :teacher_name="courseInfo?.data.teacher.name"
            :language_name="courseInfo?.data.language.faName"
            :sessionCount="courseInfo?.data.sessionsCount"
            :duration="courseInfo?.data.duration"
            :users="courseInfo?.data.users"
          />
          <Statistics
            :users="courseInfo?.data.users.slice(-3)"
            :score="courseInfo?.data.score"
          />
          <Rating />
          <Comments />
        </div>
      </div>
      <div class="justify-center hidden gap-6 py-10 xl:flex">
        <div class="p-6 w-[700px] flex flex-col gap-6 card overflow-hidden">
          <CustomPlayer
            v-if="!currentPlanFetching && !currentPlanPending"
            :access_list="currentPlan?.data.results[0].access_list"
            :stream="courseInfo?.data?.stream"
            class="w-full h-[364px]"
          />
          <IntroductionDesktop />
          <Rating />
          <Comments />
        </div>
        <div class="flex flex-col gap-6 w-[406px]">
          <StatisticsDesktop />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Header,
  IntroductionVideo,
  Statistics,
  Rating,
  Comments,
  IntroductionDesktop,
  StatisticsDesktop,
  CustomPlayer
} from './components'
import { Button, Loading } from '@/components'
import LoginImg from '@/assets/images/login.webp'
import { ArrowLeft } from '@/components/icons'
import { useQuery } from '@tanstack/vue-query'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType, type Message } from '@/api'
import type { Course } from '@/queries/course'
import type { ApiResponseTypeV3 } from '@/utils/auth-providers'
import type { CurrentPlanResponseType } from '@/queries'

const props = defineProps({
  course_id: { type: Number }
})
const {
  data: courseInfo,
  isPending,
  isFetching
} = useQuery({
  queryKey: ['course-info', Date.now()],
  queryFn: () =>
    ApiClient.get<ApiResponseTypeV3<Course>>(
      ENDPOINTS.Courses.course_info(props?.course_id)
    )
})

const {
  data: currentPlan,
  isPending: currentPlanPending,
  isFetching: currentPlanFetching
} = useQuery({
  queryKey: ['current-plan'],
  queryFn: () =>
    ApiClient.get<ApiResponseType<Array<CurrentPlanResponseType>, Message>>(
      ENDPOINTS.Profile.CurrentPlan
    )
})
</script>

<style scoped></style>
