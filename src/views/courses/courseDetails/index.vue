<template>
  <div class="w-full overflow-hidden">
    <div class="xl:hidden block">
      <Header />
      <div
        class="relative z-50 p-4 -mt-4 bg-neutral-white rounded-t-2xl md:-mt-16 md:max-w-[672px] md:mx-auto md:p-6 md:shadow"
      >
        <IntroductionVideo />
        <Statistics />
        <Rating />
        <Comments />
      </div>
    </div>
    <div class="hidden xl:flex gap-6 justify-center py-10">
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
</template>

<script setup lang="ts">
import {
  Header,
  IntroductionVideo,
  Statistics,
  Rating,
  Comments,
  IntroductionDesktop,
  StatisticsDesktop
} from '../components'
import { Button } from '@/components'
import LoginImg from '@/assets/images/login.webp'
import { CustomPlayer } from '@/views/courses/components'
import { ArrowLeft } from '@/components/icons'
</script>

<style scoped></style>
