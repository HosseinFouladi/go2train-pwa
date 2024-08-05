<script lang="ts" setup>
  import { ref } from 'vue';
import {CourseCard} from './components';

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const breakpoints= {
      // 700px and up
      390: {
        itemsToShow: 1.2,
        snapAlign: 'start',
      },
      
      480: {
        itemsToShow: 1.5,
        snapAlign: 'start',

      },
      700: {
        itemsToShow: 2,
        snapAlign: 'start',
      },
      1200: {
        itemsToShow: 3,
        snapAlign: 'start',
      },
    }
</script>

<template>
  <div class="w-full">
     <h5 class="my-6 text-sm-h5 font-demi-bold xl:hidden">دوره های آموزشی</h5>
    <Carousel :autoplay="3000" dir="rtl" :items-to-show="1"  :breakpoints="breakpoints" class="xl:hidden ">
    <Slide v-for="slide in 10" :key="slide">
      <CourseCard dir="rtl"/>
    </Slide>
  </Carousel>
  <div class="hidden xl:block card ">
    <h5 class="hidden mb-6 text-sm-h5 font-demi-bold xl:block">دوره های آموزشی</h5>
  <div  class="flex flex-row flex-wrap w-full gap-4">
    <CourseCard v-for="item in 10" :key="item"  dir="rtl"/>
  </div>
  </div>
  </div>
</template>
