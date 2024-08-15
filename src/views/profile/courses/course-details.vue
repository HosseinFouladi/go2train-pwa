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
          <IntroductionVideo />
          <Statistics />
          <Rating />
          <Comments />
        </div>
      </div>
      <div class="justify-center hidden gap-6 py-10 xl:flex">
        <div class="p-6 w-[700px] flex flex-col gap-6 card overflow-hidden">
          <CustomPlayer
            src="https://train-test.g2storage.com/teacher/section/videos/encoded/p240/1699174185-4cd06dc8-be26-4f9d-9d84-1019970c1a77.mp4"
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

const props=defineProps({
  course_id:{type:Number}
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
</script>

<style scoped></style>
