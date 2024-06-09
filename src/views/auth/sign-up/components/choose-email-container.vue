<script setup lang="ts">
import { useRouter } from 'vue-router'
import { InputText, Button } from '@/components'

const router = useRouter()
</script>

<template>
  <div class="space-y-6">
    <InputText fluid placeholder="ایمیل خود را وارد کنید ..." />
    <Button
      label="بعدی"
      @click="() => router.push({ path: '/sign-up/confirm-code-email' })"
    />
  </div>
</template>
