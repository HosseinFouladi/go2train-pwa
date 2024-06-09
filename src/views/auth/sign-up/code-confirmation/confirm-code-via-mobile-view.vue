<script lang="ts" setup>
import { InputText, Button } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'
</script>

<template>
  <AuthContainerWithNav title="تایید شماره موبایل">
    <div class="flex flex-[2_2_0%] w-full sm:mb-8 lg:mb-0 justify-center"></div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">کد تأیید را وارد کنید</h3>
        <p class="text-st-one text-secondary-500">
          کد تأیید شما به ۹۸۱۲۳۴۵۶۷۸۹+ ارسال شد.
        </p>
      </div>
      <div class="flex flex-col gap-10">
        <InputText fluid placeholder="کد ورود" />
        <Button label="بعدی" />
      </div>
    </div>
  </AuthContainerWithNav>
</template>
