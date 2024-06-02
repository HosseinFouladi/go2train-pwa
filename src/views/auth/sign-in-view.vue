<script setup lang="ts">
import {
  Button,
  Divider,
  Checkbox,
  LinkText,
  InputText,
  InputPassword
} from '@/components'
import { AuthContainer } from '@/views/auth/components'
import { GoogleIcon, AppleIcon } from '@/components/icons'
</script>

<template>
  <AuthContainer>
    <div class="w-full">
      <div class="flex flex-col gap-8 my-9">
        <InputText :fluid="true" placeholder="نام کاربری خود را وارد کنید ..." />
        <InputPassword placeholder="رمز عبور ..." />
      </div>
      <div class="flex flex-row items-center justify-between my-3">
        <Checkbox label="‌ذخیره اطلاعات ورود" />
        <LinkText to="/forget-password" label="فراموشی رمز عبور" />
      </div>
      <Button fluid label="ورود به پنل" />
      <Divider sx="py-[16px]" />
      <div class="flex flex-col w-full gap-4 sm:flex-row lg:flex-col">
        <Button
          mode="secondary"
          variant="outlined"
          label="ورود با اپل"
          :iconRight="AppleIcon"
        />
        <Button
          mode="secondary"
          variant="outlined"
          label="ورود با گوگل"
          :iconRight="GoogleIcon"
        />
      </div>
    </div>
  </AuthContainer>
</template>
