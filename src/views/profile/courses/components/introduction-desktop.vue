<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <img :src="AvatarPlaceholder" class="w-8 rounded-lg aspect-square" alt="" />
      <h2 class="text-h4 font-extra-bold">          دوره  {{ title }} - {{ levelTitle }}
      </h2>
    </div>
    <p class="flex gap-1 text-h6 font-demi-bold">
      <span class="text-primary-500">مدرس</span>
      <span class="text-text-400"> {{ teacher_name }}</span>
    </p>
    <div class="flex flex-col items-end gap-2 text-sm-st-two md:text-st-two">
      <p class="text-text-300">
        {{description.length>160? description.slice(0, 160) + '...':description }}      </p>
      <Button
         v-if="description.length>160"
        :fluid="false"
        :label="!showMore ? 'بستن' : 'بیشتراطلاعات'"
        :iconLeft="ArrowLeft"
        variant="text"
        @click="showMore = !showMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { ArrowLeft } from '@/components/icons'
import { Button } from '@/components'
import { ref } from 'vue'

const props=defineProps({
  title:{type:String,default:'زبان انگلیسی'},
  levelTitle:{type:String,default:'A1'},
  description:{type:String,default:''},
  teacher_name:{type:String,default:''},

})

const showMore = ref(false)


</script>

<style scoped></style>
