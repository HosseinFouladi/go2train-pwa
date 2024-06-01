<script setup lang="ts">
import InputText from '@/components/input-text/input-text.vue'
import InputPassword from '@/components/input-password/input-password.vue'
import Checkbox from '@/components/checkbox/index.vue'
import Button from '@/components/button/button.vue'
import LinkText from '@/components/link-text/index.vue'
import Divider from '@/components/divider/index.vue'
import GoogleIcon from '@/components/icons/google/index.vue'
import AppleIcon from '@/components/icons/apple/index.vue'
import AuthContainer from './components/auth-container.vue'
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
        <LinkText to="forget-password" label="فراموشی رمز عبور" />
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
