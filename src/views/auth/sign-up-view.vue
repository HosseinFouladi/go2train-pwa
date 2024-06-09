<script setup lang="ts">
import { h } from 'vue'
import { Button, InputText } from '@/components'
import { AuthContainer } from '@/views/auth/components'
import { TickSquaredIcon } from '@/components/icons'
</script>

<template>
  <AuthContainer>
    <div class="w-full">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-st-one font-demi-bold">رمز عبور خود را بازنشانی کنید</h3>
        <p class="text-st-two text-secondary-500">
          رمز عبور جدید باید شامل حداقل ۸ کاراکتر، یک حرف کوچک و یک حرف بزرگ باشد.
        </p>
      </div>
      <InputText
        fluid
        :iconLeft="h(TickSquaredIcon, { class: 'text-success-500' })"
      />
      <Button fluid label="ورود به پنل" />
    </div>
  </AuthContainer>
</template>
