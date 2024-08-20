<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components'
import { ArrowBack } from '@/components/icons'
import NotFoundImage from '@/assets/images/404.svg'
import NotFoundVector from '@/assets/images/404-vector.svg'

const router = useRouter()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full h-screen px-4 mx-auto space-y-10 text-center lg:max-w-7xl lg:mx-auto lg:flex-row-reverse lg:text-start max-w-7xl"
  >
    <img class="w-[80%] lg:w-full" :src="NotFoundVector" /> 
    <div class="flex flex-col items-center w-full space-y-4">
      <img class="w-[70%]" :src="NotFoundImage" />
      <p class="text-primary-500 text-h6 font-extra-bold">
        صـفـــحـــــه ای پــیـــدا نشـــــد :(
      </p>
      <p class="text-text-200 text-st-two">
        متاسفانه صفحه ای که دنبالش هستید رو پیدا نکردیم. لطفاً عبارت جستجو شده را
        مجدداً بررسی کنید.
      </p>
      <Button
        label="بازگشت"
        variant="text"
        :iconLeft="h(ArrowBack)"
        @click="() => router.go(-1)"
      />
    </div>
  </div>
</template>

<style scoped></style>
