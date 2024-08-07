<template>
  <div class="flex flex-col gap-2 ">
    <video-player
      :src="testVideo"
      :poster="AvatarPlaceholder"
      controls
      class="w-full overflow-hidden rounded-2xl"
    >
      <template v-slot="{ player, state }">
        <div class="flex gap-4 bg-plan-gold ">
          <button @click="state.playing ? player.pause() : player.pause()">
            {{ state.playing ? 'Pause' : 'Play' }}
          </button>
          <button @click="player.muted(!state.muted)">
            {{ state.muted ? 'UnMute' : 'Mute' }}
          </button>
          <!-- more custom controls elements ... -->
           <h3>hello</h3>
        </div>
      </template>
    </video-player>
    <p class="flex gap-1 text-st-two">
        <span class="text-primary-500">مدرس</span>
        <span class="text-text-400">حسام موسوی</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import testVideo from '@/assets/videos/test.mp4'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

  import { VideoPlayer } from '@videojs-player/vue'
  import 'video.js/dist/video-js.css'
</script>

<style scoped></style>
