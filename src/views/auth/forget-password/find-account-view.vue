<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { InputText, Button } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'

const router = useRouter()
</script>

<template>
  <AuthContainerWithNav title="فراموشی رمز عبور">
    <div class="flex flex-[2_2_0%] w-full sm:mb-8 lg:mb-0 justify-center">
      <Avatar label="عماد باقری" />
    </div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">حسابتان را پیدا کنید</h3>
        <p class="text-st-one text-secondary-500">
          نام کاربری یا ایمیل یا شماره تلفن مرتبط ‌شده با حسابتان را وارد کنید.
        </p>
      </div>
      <div class="flex flex-col gap-10">
        <InputText
          fluid
          placeholder="نام کاربری یا ایمیل یا شماره تلفن خود را وارد کنید ..."
        />
        <Button
          @click="() => router.push({ path: '/confirmation-code' })"
          label="بعدی"
        />
      </div>
    </div>
  </AuthContainerWithNav>
</template>
