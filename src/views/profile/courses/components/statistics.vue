<template>
  <div class="flex flex-col gap-3 py-4">
    <div
      class="relative flex justify-between w-full p-3 overflow-hidden rounded-2xl min-h-[116px]"
    >
      <img
        :src="LeaderboardImg"
        alt=""
        class="absolute top-0 left-0 w-full h-full object-fit"
      />
      <div class="z-30 flex flex-col justify-center gap-1 text-accent-50">
        <h6 class="text-sm-h6 font-extra-bold">برترین ها</h6>
        <p class="font-normal text-sm-st-one">جایگاه شما در جدول امتیازات</p>
        <div class="flex items-center gap-1">
          <div class="flex">
            <UserAvatar :avatar_url="CoinImg" width="20px" class="" />
            <UserAvatar :avatar_url="CoinImg" width="20px" class="-mr-2" />
            <UserAvatar :avatar_url="CoinImg" width="20px" class="-mr-2" />
            <UserAvatar :avatar_url="CoinImg" width="20px" class="-mr-2" />
          </div>
          <span class="text-sm-st-two font-demi-bold">سه کاربر برتر</span>
        </div>
      </div>
      <div class="z-30 flex flex-col items-center justify-center gap-2">
        <CupIcon />
        <div class="flex items-center gap-1 p-1 bg-confirmation-100 rounded-2xl">
          <ThunderIcon />
          <span class="font-normal text-cp">امتیاز شما</span>
          <span class="font-regular text-cp">۲۰۰۰ </span>
        </div>
      </div>
    </div>

    <div
      class="relative flex justify-between w-full p-3 overflow-hidden rounded-2xl min-h-[116px]"
    >
      <img :src="RoadmapImg" alt="" class="absolute top-0 left-0 w-full h-full" />
      <div class="z-30 flex flex-col justify-center gap-1 text-accent-50">
        <h6 class="text-sm-h6 font-extra-bold">نقشه راه شما</h6>
        <Button
          mode="accent"
          label=" برو بریم  "
          :iconLeft="ArrowLeft"
          class="py-1"
        />
      </div>
      <div class="z-30 flex items-center">
        <div class="px-2 py-1 -mr-16 rounded-2xl bg-accent-200 text-cp md:-mr-32">
          50% مسیر طی شده
        </div>
      </div>
      <div class="z-30 flex flex-col items-center justify-center gap-2">
        <PeoplesIcon />
        <span class="font-normal text-sm-st-two text-accent-50">درس ۱</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import CoinImg from '@/assets/images/coin-silver.png'
import { CupIcon, ThunderIcon, ArrowLeft, PeoplesIcon } from '@/components/icons'
import LeaderboardImg from '@/assets/images/Leaderboard-Banner.png'
import RoadmapImg from '@/assets/images/Roadmap-Banner.png'

import { Button } from '@/components'
</script>

<style scoped></style>
