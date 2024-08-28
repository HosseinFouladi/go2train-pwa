<template>
  <div class="w-full overflow-hidden">
    <div v-if="isError" class="h-[300px] flex items-center justify-center">
      مشکلی در برقراری ارتباط رخ داده است. مجددا امتحان کنید
    </div>
    <div
      v-if="pageLoading"
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
            :access_list="currentPlan?.data.results[0].access_list"
            :stream="courseInfo?.data?.stream"
            :teacher_name="courseInfo?.data.teacher.name"
            :language_name="courseInfo?.data.language.faName"
            :sessionCount="courseInfo?.data.sessionsCount"
            :duration="courseInfo?.data.duration"
            :users="courseInfo?.data.users"
            v-if="!isLargeScreen"
          />
          <Statistics
            :users="courseInfo?.data.users.slice(-3)"
            :score="courseInfo?.data.score"
          />

          <Rating
            v-if="!ratingPending && !ratingFetching"
            :ratings="rating?.data"
            :comments_count="all_comment_count || 1"
            :course_id="props.course_id"
          />
          <Comments
            class=""
            ref="scrollComponent"
            :course_id="props.course_id"
            @comments-count="(count) => (all_comment_count = count)"
          />
        </div>
      </div>
      <div class="justify-center hidden gap-6 py-10 xl:flex">
        <div class="p-6 w-[700px] flex flex-col gap-6 card overflow-hidden">
          <CustomPlayer
            :access_list="currentPlan?.data.results[0].access_list"
            :stream="courseInfo?.data?.stream"
            v-if="isLargeScreen"
          />
               <IntroductionDesktop
            :teacher_name="courseInfo?.data.teacher.name"
            :title="courseInfo?.data.title"
            :level-title="courseInfo?.data.level.title"
            :description="courseInfo?.data.shortDescription"
          />
          <Rating
            v-if="!ratingPending && !ratingFetching"
            :ratings="rating?.data"
            :comments_count="all_comment_count || 1"
            :course_id="props.course_id"
          />
          <Comments
            class=""
            ref="scrollComponent"
            :course_id="props.course_id"
            @comments-count="(count) => (all_comment_count = count)"
          />
        </div>
        <div class="flex flex-col gap-6 w-[406px]">
          <StatisticsDesktop
            :level-title="courseInfo?.data.level.title"
            :language_name="courseInfo?.data.language.faName"
            :duration="courseInfo?.data.duration"
            :users="courseInfo?.data.users"
            :score="courseInfo?.data.score"
            :poster="courseInfo?.data.fullPoster"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
import {  Loading } from '@/components'
import { useQuery } from '@tanstack/vue-query'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType, type Message } from '@/api'
import type { Course } from '@/queries/course'
import type { ApiResponseTypeV3 } from '@/utils/auth-providers'
import type { CurrentPlanResponseType, Comment, Ratings } from '@/queries'
import { useMediaQuery } from '@vueuse/core'


const props = defineProps({
  course_id: { type: Number }
})

const isLargeScreen = useMediaQuery('(min-width: 1280px)')


const pageLoading=computed(()=> isPending.value || isFetching.value ||currentPlanFetching.value||currentPlanPending.value)
const all_comment_count = ref(0)

const {
  data: courseInfo,
  isPending,
  isFetching,
  isError,
  error
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

const {
  data: rating,
  isPending: ratingPending,
  isFetching: ratingFetching
} = useQuery({
  queryKey: ['ratings'],
  queryFn: () =>
    ApiClient.get<ApiResponseTypeV3<Ratings>>(
      ENDPOINTS.comments.course_comment_rate(props?.course_id)
    )
})
</script>
