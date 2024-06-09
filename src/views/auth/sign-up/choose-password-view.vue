<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button, InputPassword } from '@/components'
import { AuthContainer } from '@/views/auth/components'

const router = useRouter()
</script>

<template>
  <AuthContainer>
    <div class="flex flex-col space-y-6">
      <div class="space-y-6">
        <div class="flex flex-col gap-3 text-center">
          <h3 class="text-st-one font-demi-bold">ایجاد گذرواژه</h3>
          <p class="text-st-two text-secondary-500">
            بنا به‌‌دلایل امنیتی، گذرواژه‌تان باید حداقل ۸ کاراکتر داشته باشد.
          </p>
        </div>
        <InputPassword placeholder="نام کاربری" fluid />
      </div>
      <Button
        @click="() => router.push({ path: '/sign-up/choose-email-or-number' })"
        fluid
        label="بعدی"
      />
    </div>
  </AuthContainer>
</template>
