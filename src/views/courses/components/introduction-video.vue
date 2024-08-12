<template>
  <div class="flex flex-col gap-2">
    <video-player
      :src="testVideo"
      :poster="AvatarPlaceholder"

      class="w-full overflow-hidden rounded-2xl"
    >
      <template v-slot="{ player, state }">

        <div class="  h-full flex  items-end  bg-plan-gold pb-10 px-2">
          <div class="flex w-full justify-between relative z-5">
            <div class="flex gap-6 items-center">
              <VideoTimeIcon/>
              <VideoTimeIcon/>
            </div>
            <span> 01:22/12:30</span>
          </div>
<!--          <button @click="state.playing ? player.pause() : player.play()" class="0">-->
<!--            {{ state.playing ? 'Pause' : 'Play' }}-->
<!--          </button>-->
<!--          <button @click="player.muted(!state.muted)">-->
<!--            {{ state.muted ? 'UnMute' : 'Mute' }}-->
<!--          </button>-->
<!--          &lt;!&ndash; more custom controls elements ... &ndash;&gt;-->
<!--          <h3>hello</h3>-->
        </div>
      </template>
    </video-player>
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
          <UserAvatar
            :avatar_url="CoinImg"

            width="20px"
            class=""
          />
          <UserAvatar
            :avatar_url="CoinImg"
            width="20px"
            class="-mr-2"
          />
          <UserAvatar
            :avatar_url="CoinImg"
            width="20px"
            class="-mr-2"
          />
          <UserAvatar
            :avatar_url="CoinImg"
            width="20px"
            class="-mr-2"
          />
        </div>
        <span class="text-st-two font-regular"> +۴۳۵</span>
      </div>
    </div>
    <Button :fluid="true" label="همین حالا شروع کنید" :iconLeft="ArrowLeft"/>
  </div>
</template>

<script setup lang="ts">
import testVideo from '@/assets/videos/test.mp4'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { VideoTimeIcon, LanguageSquareIcon,ArrowLeft } from '@/components/icons'
import CoinImg from '@/assets/images/coin-silver.png'
import { Button } from '@/components'
</script>

<style scoped>
.divider {
  background: linear-gradient(0deg, #dad9e6 0%, #dad9e6 100%);
}
</style>
