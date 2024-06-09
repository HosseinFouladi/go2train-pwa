<script lang="ts" setup>
import { AuthContainerWithNav } from '@/views/auth/components'
import { InputPassword, Avatar, Button } from '@/components'
</script>

<template>
  <AuthContainerWithNav title="بازنشانی رمز عبور">
    <div class="flex flex-[2_2_0%] w-full sm:mb-8 lg:mb-0 justify-center">
      <Avatar label="عماد باقری" />
    </div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">رمز عبور خود را بازنشانی کنید</h3>
        <p class="text-st-one text-secondary-500">
          رمز عبور جدید باید شامل حداقل ۸ کاراکتر، یک حرف کوچک و یک حرف بزرگ باشد.
        </p>
      </div>
      <div class="flex flex-col gap-10">
        <InputPassword fluid placeholder="رمز عبور جدیدتان..." />
        <InputPassword
          fluid
          :toggle="false"
          placeholder="تکرار رمز عبور جدیدتان..."
        />
        <Button label="بازنشانی رمز عبور" />
      </div>
    </div>
  </AuthContainerWithNav>
</template>
