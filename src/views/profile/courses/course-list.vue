<script lang="ts" setup>
import { computed, ref } from 'vue'

import Message from 'primevue/message'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import 'vue3-carousel/dist/carousel.css'
import Paginator from 'primevue/paginator';

import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseTypeV3 } from '@/api'
import type { Course } from '@/queries'
import { useAuthStore } from '@/stores'
import { CourseCard } from '../components'

const skelton = computed(() => new Array(6))
const courseBox = ref<HTMLDivElement>()
const tablePageIndex = ref(1)
const serverError = ref('')
const { user } = useAuthStore()

const handleScroll = () => {
  if (
    courseBox.value &&
    courseBox.value.offsetWidth - courseBox.value.scrollLeft >=
      courseBox.value.scrollWidth - 50
  ) {
    fetchNextPage()
  }
}

const {
  data: courses,
  isPending,
  isFetching,
  refetch
} = useQuery({
  queryKey: ['active-courses', { page: tablePageIndex.value }],
  queryFn: () =>
    ApiClient.get<ApiResponseTypeV3<Array<Course>>>(
      ENDPOINTS.Course.active_courses(user?.id),
      {
        params: {
          page: tablePageIndex.value
        }
      }
    ).catch((err) => {
      serverError.value = err.response.data.message[0].content
    }),
  gcTime: 0
})

const { fetchNextPage, isLoading, data } = useInfiniteQuery({
  queryKey: ['active-courses-mobile', { page: Math.random() }],
  queryFn: ({ pageParam }) =>
    ApiClient.get<ApiResponseTypeV3<Array<Course>>>(
      ENDPOINTS.Course.active_courses(user?.id),
      {
        params: {
          page: pageParam
        }
      }
    ).catch((err) => (serverError.value = err.response.data.message[0].content)),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    if (lastPage.meta.current_page !== lastPage.meta.last_page) {
      return lastPage.meta.current_page + 1
    }
  }
})
</script>

<template>
  <div class="w-full card">
    <Message severity="error" v-if="serverError" class="mx-auto my-10">{{
      serverError
    }}</Message>
    <div v-else>
      <h5 class="my-6 text-sm-h5 font-demi-bold md:hidden">دوره های آموزشی</h5>
      <div
        @scroll="handleScroll"
        v-if="isLoading"
        class="flex flex-row w-full gap-4 overflow-auto md:hidden"
      >
        <Skeleton
          v-for="item in skelton"
          :key="item"
          class="min-w-[300px] min-h-[250px]"
        ></Skeleton>
      </div>
      <div
        ref="courseBox"
        class="flex flex-row w-full gap-4 overflow-auto md:hidden"
        v-else
        @scrollend="handleScroll"
      >
        <div
          class="flex flex-row gap-4"
          v-for="(course, index) in data?.pages"
          :key="index"
          dir="rtl"
        >
          <CourseCard
            v-for="item in course.data"
            :key="item.id"
            dir="rtl"
            v-bind="item"
          />
        </div>
      </div>
      <div class="flex-col hidden gap-4 md:flex">
        <h5 class="hidden mb-6 text-sm-h5 font-demi-bold md:block">
          دوره های آموزشی
        </h5>
        <div
          v-if="isPending || isFetching"
          class="flex-row flex-wrap justify-center hidden w-full gap-4 md:flex"
        >
          <Skeleton
            v-for="item in skelton"
            :key="item"
            size="250px"
            class="min-w-[300px] h-[250px]"
            ></Skeleton>
        </div>
        <div class="flex flex-row flex-wrap justify-center w-full gap-4" v-else>
          <CourseCard
            v-for="course in courses?.data"
            :key="course.id"
            dir="rtl"
            v-bind="course"
          />
        </div>
        <Paginator
          v-if="courses?.data.length>0"
          @page="
            (state) => {
              tablePageIndex = state.page + 1
              refetch()
            }
          "
          :rows="courses?.meta.per_page"
          :totalRecords="courses?.meta.total"
          dir="ltr"
        />
      </div>
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.p-paginator-page-selected {
  background: #ff9900 !important;
  color: white !important;
}
</style>
