<script setup lang="ts">
import { Tab } from '@/components'
import { AuthContainer } from '@/views/auth/components'
import {
  ChooseEmailContainer,
  ChooseMobileContainer
} from '@/views/auth/sign-up/components'
</script>

<template>
  <AuthContainer>
    <div class="flex flex-col space-y-6">
      <div class="space-y-6">
        <h3 class="text-center text-st-one font-demi-bold">افزودن ایمیل یا تلفن</h3>
        <Tab
          :tabs="[
            { title: 'ایمیل', component: ChooseEmailContainer },
            { title: 'شماره تلفن', component: ChooseMobileContainer }
          ]"
        />
      </div>
    </div>
  </AuthContainer>
</template>
