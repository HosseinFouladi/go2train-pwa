<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AuthContainerWithNav } from '@/views/auth/components'
import { Avatar, InputText, Button } from '@/components'

const router = useRouter()
</script>

<template>
  <AuthContainerWithNav title="تأیید ایمیل">
    <div class="flex flex-[2_2_0%] min-h-min w-full sm:mb-8 lg:mb-0 justify-center">
      <Avatar label="عماد باقری" />
    </div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">کد تأیید را وارد کنید</h3>
        <p class="text-st-one text-secondary-500">
          کد ۵ رقمی ارسال شده به e*****q@gmail.com را وارد کنید.
        </p>
      </div>
      <div class="flex flex-col gap-10">
        <InputText
          fluid
          placeholder="نام کاربری یا ایمیل یا شماره تلفن خود را وارد کنید ..."
        />
        <Button
          @click="() => router.push({ path: '/recover-password' })"
          label="بعدی"
        />
      </div>
    </div>
  </AuthContainerWithNav>
</template>
