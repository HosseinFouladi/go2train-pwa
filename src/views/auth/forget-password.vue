<script lang="ts" setup>
import { InputText, Button } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'
</script>

<template>
  <AuthContainerWithNav title="فراموشی رمز عبور">
    <div class="flex flex-col flex-1 max-w-sm gap-8 md:gap-14 lg:gap-20">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">حسابتان را پیدا کنید</h3>
        <p class="text-st-one text-secondary-500">
          نام کاربری یا ایمیل یا شماره تلفن مرتبط‌شده با حسابتان را وارد کنید.
        </p>
      </div>
      <div class="flex flex-col gap-10">
        <InputText
          fluid
          placeholder="نام کاربری یا ایمیل یا شماره تلفن خود را وارد کنید ..."
        />
        <Button label="بعدی" />
      </div>
    </div>
  </AuthContainerWithNav>
</template>
