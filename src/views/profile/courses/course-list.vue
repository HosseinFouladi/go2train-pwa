<script lang="ts" setup>
import { CourseCard } from '../components'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { useQuery } from '@tanstack/vue-query';
import { ApiClient } from '@/utils';
import { ENDPOINTS, type ApiResponseTypeV3 } from '@/api';
import type { Course } from '@/queries';
import { useAuthStore } from '@/stores';

const breakpoints = {
  0: {
    itemsToShow: 1,
    snapAlign: 'start'
  },
  320: {
    itemsToShow: 1.2,
    snapAlign: 'start'
  },

  480: {
    itemsToShow: 1.6,
    snapAlign: 'start'
  },
  620: {
    itemsToShow: 2.5,
    snapAlign: 'start'
  },
  920: {
    itemsToShow: 3.5,
    snapAlign: 'start'
  }
}

const {user}=useAuthStore()

const {
  data: courses,
  isPending,
  isFetching,
  isError,
} = useQuery({
  queryKey: ['active-courses'],
  queryFn: () =>
    ApiClient.get<ApiResponseTypeV3<Array<Course>>>(
      ENDPOINTS.Course.active_courses(user?.id),
    )
})
</script>

<template>
  <div class="w-full">
    <h5 class="my-6 text-sm-h5 font-demi-bold xl:hidden">دوره های آموزشی</h5>
    <Carousel
      :autoplay="3000"
       dir="rtl"
      :items-to-show="1"
      :breakpoints="breakpoints"
      class="xl:hidden"
    >
      <Slide v-for="course in courses?.data" :key="course.id">
        <CourseCard class="mx-1 xl:mx-0" dir="rtl" v-bind="course"/>
      </Slide>
    </Carousel>
    <div class="hidden xl:block card">
      <h5 class="hidden mb-6 text-sm-h5 font-demi-bold xl:block">دوره های آموزشی</h5>
      <div class="flex flex-row flex-wrap w-full gap-4">
        <CourseCard v-for="course in courses?.data" :key="course.id" dir="rtl" v-bind="course" />
      </div>
    </div>
  </div>
</template>
