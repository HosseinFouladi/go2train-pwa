<template>
  <div
    class="relative flex flex-col justify-end md:justify-start md:pt-16 md:px-16 w-full px-4 py-8 h-[326px]"
  >
    <div class="absolute top-0 left-0 z-20 w-full h-full overlay"></div>
    <img
      :src="poster"
      alt="header-img"
      class="absolute top-0 left-0 z-10 object-cover w-full h-full"
    />
    <div class="z-30 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <img :src="langIcon" class="w-8 rounded-lg aspect-square" alt="language_icon" />
        <h2 class="text-neutral-white text-h6 font-demi-bold">
          دوره  {{ title }} - {{ levelTitle }}
        </h2>
      </div>
      <div
        class="flex gap-1 text-neutral-white px-2 py-[2px] text-sm-st-two font-regular rounded-2xl gadget"
      >
        <StarIcon />
        {{ score }}
      </div>
      <div class="flex flex-col items-end gap-2 text-sm-st-two md:text-st-two">
        <p class="text-neutral-white">
          {{description.length>160? description.slice(0, 160) + '...':description }}
        </p>
        <Button
           v-if="description.length>160"
          :fluid="false"
          label=" ادامه مطلب"
          :iconLeft="ArrowLeft"
          variant="text"
          @click="showMore = true"
        />
      </div>
    </div>
    <Drawer
      v-model:visible="showMore"
      position="bottom"
      class="md:max-w-[540px] md:rounded-t-2xl"
    >
      <template #container>
        <div class="flex flex-col items-center gap-2 p-4 rounded-t-lg">
          <h2 class="text-h6 font-demi-bold">دوره زبان انگلیسی - {{ 'A2' }}</h2>
          <div class="h-[1px] w-full bg-secondary-100"></div>
          <p
            class="text-right text-sm-st-two font-regular text-secondary-900 md:text-st-one md:text-text-500"
          >
            {{ description }}
          </p>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { StarIcon, ArrowLeft } from '@/components/icons'
import { Button } from '@/components'

const props=defineProps({
  title:{type:String,default:'زبان انگلیسی'},
  levelTitle:{type:String,default:'A1'},
  langIcon:{type:String,default:''},
  score:{type:Number,default:4.5},
  description:{type:String,default:''},
  poster:{type:String,default:'/assets/images/login.webp'},

})

const showMore = ref(false)

</script>

<style>
.overlay {
  background: linear-gradient(
    180deg,
    rgba(14, 14, 16, 0.5) 0%,
    rgba(14, 14, 14, 0.6) 49%,
    rgba(14, 14, 14, 0.9) 90%
  );
}
.gadget {
  background: rgba(34, 35, 40, 0.8);
  width: fit-content;
}

.p-drawer-bottom .p-drawer {
  height: auto !important;
}
</style>
