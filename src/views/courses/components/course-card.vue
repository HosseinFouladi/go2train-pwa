<script setup lang="ts">
import type { Component } from 'vue'

import { cn } from '@/utils'
import { UserAvatar, Button } from '@/components'
import { PlayIcon, ClockIcon, StarIcon } from '@/components/icons'

export type Course = {
  id: string
  title: string
  poster: string
  fullPoster: string
  shortDescription: string
  price: string
  oldPrice: string
  score: number
  teacher: CourseTeacher
  inLanguage: CourseInLanguage
  language: CourseLanguage
  level: CourseLevel
  userCount: number
  sessionCount: number
  contentLanguage: string
  duration: number
  isActive: number
  enDateOfRelease: any
  dateOfRelease: any
  bought: boolean
  users: Array<CourseStudent>
}

export type CourseTeacher = {
  id: string
  name: string
  avatar: string
  title: string
  score: number
}

export type CourseInLanguage = {
  id: string
  name: string
  image: string
  faName: string
  rtl: boolean
  show: boolean
}

export type CourseLanguage = {
  id: string
  name: string
  image: string
  faName: string
  rtl: boolean
  show: boolean
}

export type CourseLevel = {
  id: string
  title: string
  priority: number
}

export type CourseStudent = {
  id: string
  name: string
  avatar: string
  plan: CoursePlan
}

export type CoursePlan = {
  id: string
  title: string
  icon: string
}

const props = defineProps<
  Course & {
    action_title?: string | Component
    action_route?: string | Function
    action_variant?: 'outlined' | 'filled'
  }
>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-3 p-3 border shadow rounded-2xl border-secondary-200 w-full lg:min-w-[253px] xl:min-w-80',
        $props.class as string
      )
    "
  >
    <div class="flex gap-2">
      <div
        class="relative w-[85px] min-h-[158px] rounded-xl overflow-hidden flex flex-col justify-end p-2"
      >
        <img
          :src="props.fullPoster"
          alt=""
          class="absolute top-0 left-0 object-cover w-full h-full"
        />
        <div class="z-20 flex items-center justify-between">
          <img
            :src="props.language.image"
            alt=""
            class="w-4 rounded-full aspect-square"
          />
          <div class="flex gap-[2px] items-center justify-center">
            <StarIcon />
            <!-- TODO: Couldn't center the score here at the moment :) will do it later on-->
            <!-- I just don't have enough time -->
            <div class="inline mt-1 text-primary-200 text-sm-cp font-demi-bold">
              <span>{{ String(props.score).toPersianDigits() }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <span
            class="px-2 py-1 border text-sm-cp font-regular rounded-2xl border-success-500 text-success-500 w-fit"
          >
            به زبان {{ props.inLanguage.faName }}
          </span>
          <h2 class="text-st-two font-extra-bold text-text-500">
            {{ props.language.faName }} - {{ props.level.title }}
          </h2>
        </div>
        <div class="flex items-center gap-1">
          <div class="relative flex mr-2">
            <UserAvatar
              :key="student.id"
              v-for="student in props.users"
              :avatar_url="student.avatar"
              :badge_url="student.plan.icon"
              width="20px"
              class="relative -mr-3"
            />
          </div>
          <span class="text-sm-cp font-demi-bold text-accent-600"
            >{{ String(props.userCount).toPersianDigits() }}+</span
          >
        </div>
        <div class="">
          <div class="flex gap-2">
            <ClockIcon class="w-4 h-4 text-secondary-500" />
            <p class="text-sm-cp font-regular">
              <strong class="text-sm-cp font-extra-bold">{{
                String(props.duration).toPersianDigits()
              }}</strong>
              ساعت دوره آموزشی
            </p>
          </div>
          <div class="flex gap-2">
            <PlayIcon class="w-4 h-4" />
            <p class="text-sm-cp font-regular">
              <strong class="text-sm-cp font-extra-bold">{{
                String(props.sessionCount).toPersianDigits()
              }}</strong>
              جلسه
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <img
            :src="props.teacher.avatar"
            alt=""
            class="w-6 rounded-lg aspect-square object-fit"
          />
          <div class="flex gap-1">
            <span class="text-sm-cp font-demi-bold text-text-300">مدرس :</span>
            <span class="text-sm-cp font-demi-bold">{{
              props.teacher.name ?? 'فعلا مشخص نشده'
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="props.action_route ?? '/course/32'">
      <Button
        fluid
        size="xs"
        :variant="action_variant ?? 'outlined'"
        :label="props.action_title ?? 'ادامه دوره'"
      />
    </router-link>
  </div>
</template>

<style scoped></style>
