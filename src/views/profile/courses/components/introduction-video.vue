<template>
  <div class="flex flex-col gap-2">
    <CustomPlayer :access_list="props.access_list" :stream="props.stream" />
    <p class="flex gap-1 text-st-two md:text-sm-st-one font-demi-bold">
      <span class="text-primary-500">مدرس</span>
      <span class="text-text-400"> {{ teacher_name }}</span>
    </p>
    <div class="flex items-center justify-between gap-3 p-4">
      <div class="flex flex-col items-center gap-1">
        <language-square-icon />
        <span class="text-st-two font-regular"> {{ language_name }}</span>
      </div>
      <div class="w-[1px] h-9 divider"></div>
      <div class="flex flex-col items-center gap-1">
        <video-time-icon />
        <span class="text-st-two font-regular"
          >
          {{ sessionCount }} ویدیو ( {{ duration }} ساعت)
          </span
        >
      </div>
      <div class="w-[1px] h-9 divider"></div>
      <div class="flex flex-col items-center gap-1">
        <div class="flex">
          <UserAvatar v-for="user in users" :key="user.id" :avatar_url="user.avatar" width="20px" class="-mr-2 first:mr-0" />
        </div>
        <span class="text-st-two font-regular">{{ users.length }}+</span>
      </div>
    </div>
    <router-link :to="`/course_lessons/${courseId}`">
      <Button :fluid="true" label="همین حالا شروع کنید" :iconLeft="ArrowLeft" />

    </router-link>
  </div>
</template>

<script setup lang="ts">


import { VideoTimeIcon, LanguageSquareIcon, ArrowLeft } from '@/components/icons'
import { Button } from '@/components'
import { CustomPlayer } from './'
import type { AccessList, Stream } from '@/queries'

type Props = {
  stream: Stream
  access_list: Array<AccessList>
  teacher_name: string
  language_name: string
  sessionCount: string
  duration: string,
  courseId:number,
  users: [
    {
      avatar: string
      id: string
      name: string
    }
  ]
}
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.divider {
  background: linear-gradient(0deg, #dad9e6 0%, #dad9e6 100%);
}
</style>
