<template>
  <div class="flex flex-col gap-2">
    <CustomPlayer :src="testVideo" />
    <p class="flex gap-1 text-st-two">
      <span class="text-primary-500">مدرس</span>
      <span class="text-text-400">حسام موسوی</span>
    </p>
    <div class="flex items-center justify-between gap-3 p-4">
      <div class="flex flex-col items-center gap-1">
        <language-square-icon />
        <span class="text-st-two font-regular">انگلیسی (بومی)</span>
      </div>
      <div class="w-[1px] h-9 divider"></div>
      <div class="flex flex-col items-center gap-1">
        <video-time-icon />
        <span class="text-st-two font-regular">۲۴ ویدیو ( 8 ساعت)</span>
      </div>
      <div class="w-[1px] h-9 divider"></div>
      <div class="flex flex-col items-center gap-1">
        <div class="flex">
          <UserAvatar :avatar_url="CoinImg" width="20px" class="" />
          <UserAvatar :avatar_url="CoinImg" width="20px" class="-mr-2" />
          <UserAvatar :avatar_url="CoinImg" width="20px" class="-mr-2" />
          <UserAvatar :avatar_url="CoinImg" width="20px" class="-mr-2" />
        </div>
        <span class="text-st-two font-regular"> +۴۳۵</span>
      </div>
    </div>
    <Button :fluid="true" label="همین حالا شروع کنید" :iconLeft="ArrowLeft" />
  </div>
</template>

<script setup lang="ts">
import testVideo from '@/assets/videos/test.mp4'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

import { VideoTimeIcon, LanguageSquareIcon, ArrowLeft } from '@/components/icons'
import CoinImg from '@/assets/images/coin-silver.png'
import { Button } from '@/components'
import CustomPlayer from '@/views/courses/components/custom-player.vue'
</script>

<style scoped lang="scss">
.divider {
  background: linear-gradient(0deg, #dad9e6 0%, #dad9e6 100%);
}
</style>
