<script lang="ts" setup>
import { SidebarItem } from '.'
import { SidebarConfig } from '@/configs'
import { LogoutIcon } from '@/components/icons'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
const { purgeAuth } = useAuthStore()
const router = useRouter()
</script>

<template>
  <aside class="card rounded-2xl max-h-[640px]">
    <div class="w-[264px] flex-col p-6 flex justify-between h-full min-h-[640px]">
      <div>
        <SidebarItem
          :key="item.label"
          :icon="item.icon"
          :label="item.label"
          :route="item.route"
          :theme="item.theme"
          :external="item.external"
          v-for="item of SidebarConfig"
        />
      </div>
      <SidebarItem
        :icon="LogoutIcon"
        label="خروج از حساب"
        theme="default"
        class="mb-6"
        @click="() => purgeAuth(() => router.replace({ name: 'sign-in' }))"
      />
    </div>
  </aside>
</template>

<style scoped>
.card {
  box-shadow: 0 0 12px 0 rgba(34, 35, 40, 0.15);
}
</style>
