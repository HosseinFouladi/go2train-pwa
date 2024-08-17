<script lang="ts" setup>
import { Button } from '@/components'
import { DangerIcon } from '@/components/icons'
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen max-w-md px-4 mx-auto space-y-12">
    <div class="flex flex-col items-center space-y-6">
      <DangerIcon class="text-danger-500" height="64px" width="64px" />
      <div class="flex flex-col space-y-3">
        <h2 class="text-center text-text-500 text-h6 font-extra-bold">
          در برقراری ارتباط به مشکل خوردیم!
        </h2>
        <p class="text-center text-st-one text-text-300">
          در فرآیند پرداخت مشکلی پیش آمده است، لطفاً به اپلیکیشن برگردید و دوباره
          تلاش کنید.
        </p>
      </div>
    </div>
    <a href="https://go2train.co" target="_blank" class="w-full"><Button mode="danger" fluid label="بازگشت به اپلیکیشن" /></a>
  </div>
</template>
