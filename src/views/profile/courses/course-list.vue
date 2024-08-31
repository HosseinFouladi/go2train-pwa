<script lang="ts" setup>
import { CourseCard } from '../components'

import 'vue3-carousel/dist/carousel.css'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query';
import { ApiClient } from '@/utils';
import { ENDPOINTS, type ApiResponseTypeV3 } from '@/api';
import type { Course } from '@/queries';
import { useAuthStore } from '@/stores';
import { computed, ref } from 'vue';

const skelton = computed(() => new Array(6))
const courseBox=ref<HTMLDivElement>()

const handleScroll=()=>{
  if(courseBox.value&&courseBox.value.offsetWidth- courseBox.value.scrollLeft>=courseBox.value.scrollWidth-50){
    console.log('ireached')
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

const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  ...result
} = useInfiniteQuery({
  queryKey:['active-courses-mobile'],
  queryFn: () =>
    ApiClient.get<ApiResponseTypeV3<Array<Course>>>(
      ENDPOINTS.Course.active_courses(user?.id),
    ),
  initialPageParam: 1,
  getNextPageParam: (lastPage) =>
    {
      if (lastPage.meta.current_page !== lastPage.meta.last_page) {
          return lastPage.meta.current_page + 1;
        }
    }

})


</script>

<template>
  <div class="w-full card ">
    <h5 class="my-6 text-sm-h5 font-demi-bold md:hidden">دوره های آموزشی</h5>
    <div ref="courseBox" @scroll="handleScroll" v-if="isPending||!isFetching" class="flex flex-row w-full gap-4 overflow-auto md:hidden">
      <Skeleton v-for="item in skelton" :key="item"    class=" min-w-[253px] min-h-[253px]"></Skeleton>
    </div>
    <div 
      class="flex flex-row w-full gap-4 overflow-auto md:hidden"
      v-else
      @scrollend="handleScroll"
    >
        <CourseCard v-for="course in courses?.data" :key="course.id"  dir="rtl" v-bind="course"/>
    </div>
    <div class="flex-col hidden gap-4 md:flex">
      <h5 class="hidden mb-6 text-sm-h5 font-demi-bold md:block">دوره های آموزشی</h5>
      <div v-if="isPending||!isFetching" class="flex-row flex-wrap justify-center hidden w-full gap-4 md:flex">
      <Skeleton v-for="item in skelton" :key="item" size="250px" class=""></Skeleton>
    </div>
      <div class="flex flex-row flex-wrap w-full gap-4 " v-else>
        <CourseCard v-for="course in courses?.data" :key="course.id" dir="rtl" v-bind="course" />
      </div>
      <Paginator
        @page="
          (state) => {
            tablePageIndex = state.page + 1;
            refetch();
          }
        "
        :rows="10"
        :totalRecords="20"
        dir="ltr"
      />
    </div>
   
  </div>
</template>

<style >
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

.p-paginator-page-selected{
  background: #FF9900 !important;
  color: white !important;
}
</style>