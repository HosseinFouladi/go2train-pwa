<script setup lang="ts">
import { UserAvatar, Button } from '@/components'
import { PlayIcon, ClockIcon, StarIcon } from '@/components/icons'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import CoinImg from '@/assets/images/coin-silver.png'
import LoginImg from '@/assets/images/login.webp'
import { cn } from '@/utils'
import type { Course } from '@/queries';

const props=defineProps<Course>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-3 p-3 border shadow rounded-2xl border-secondary-200 w-[300px]',
        $props.class as string
      )
    "
  >
    <div class="flex gap-2">
      <div
        class="relative w-[85px] min-h-[158px] rounded-xl overflow-hidden flex flex-col justify-end p-2"
      >
        <img :src="props.fullPoster" alt="" class="absolute top-0 left-0 object-cover w-full h-full" />
        <div class="absolute top-0 left-0 w-full h-full overlay"></div>
        <div class="z-20 flex items-center justify-between">
          <img
            :src="props.language.image"
            alt="lang_icon"
            class="w-4 rounded-full aspect-square"
          />
          <div class="flex gap-[2px] items-center">
            <StarIcon class="w-5 h-5 text-primary-200" />
            <span class="text-primary-200 text-sm-cp font-demi-bold">{{score}}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <span
            class="px-2 py-1 border text-sm-cp font-regular rounded-2xl border-success-500 text-success-500 w-fit"
            >به زبان {{ props.inLanguage.faName }}</span
          >
          <h2 class="text-st-two font-extra-bold text-text-500">
            دوره {{props.title}} - {{props.level.title}}
          </h2>
        </div>
        <div class="flex items-center gap-1">
          <div class="flex">
            <UserAvatar
              v-for="user in props.users.slice(-4)"
              :key="user.id"
              :avatar_url="user.avatar"
              :badge_url="user.plan.icon"
              width="20px"
              class="-mr-2 first:mr-0"
            />
            
          </div>
          <span class="text-sm-cp font-demi-bold text-accent-600">{{props.users.length}}+</span>
        </div>
        <div class="">
          <div class="flex gap-2">
            <ClockIcon class="w-4 h-4 text-secondary-500" />
            <p class="text-sm-cp font-regular">
              <strong class="text-sm-cp font-extra-bold">{{props.duration}}</strong>
              ساعت دوره آموزشی
            </p>
          </div>
          <div class="flex gap-2">
            <PlayIcon class="w-4 h-4" />
            <p class="text-sm-cp font-regular">
              <strong class="text-sm-cp font-extra-bold">{{ props.sessionsCount }}</strong>
              جلسه
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <img
            :src="props.teacher.avatar"
            alt=""
            class="object-cover w-6 rounded-lg aspect-square"
          />
          <div class="flex gap-1">
            <span class="text-sm-cp font-demi-bold text-text-300">مدرس :</span>
            <span class="text-sm-cp font-demi-bold">{{ props.teacher.title }}  </span>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="`/course/${props.id}`">
      <Button label="ادامه دوره" fluid variant="outlined" />
    </router-link>
  </div>
</template>

<style scoped>
.overlay{
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%);
}
</style>
