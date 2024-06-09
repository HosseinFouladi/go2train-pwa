<script setup lang="ts">
import { Button, InputText } from '@/components'
import { AuthContainer } from '@/views/auth/components'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <AuthContainer>
    <div class="flex flex-col space-y-6">
      <div class="space-y-6">
        <div class="flex flex-col gap-3 text-center">
          <h3 class="text-st-one font-demi-bold">انتخاب نام کاربری</h3>
          <p class="text-st-two text-secondary-500">
            نام کاربری می‌تواند شامل حروف انگلیسی ، اعداد و زیرخط (_) باشد.
          </p>
        </div>
        <InputText placeholder="نام کاربری" fluid />
      </div>
      <Button
        fluid
        label="بعدی"
        @click="() => router.push({ path: '/sign-up/choose-password' })"
      />
    </div>
  </AuthContainer>
</template>
