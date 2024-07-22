<template>
  <div
    class="drawer-mask"
    :style="{
      width: isOpen ? '100vw' : '0',
      opacity: isOpen ? '0.1' : '0'
    }"
    @click="isOpen = false"
  ></div>
  <div
    class="drawer"
    :style="{
      width: isOpen ? '264px' : '0'
    }"
  >
    <div class="flex flex-col justify-between w-[264px] min-h-full p-6">
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
        @click="() => purgeAuth(() => router.replace({ name: 'sign-in' }))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { SidebarItem } from '.'
import { SidebarConfig } from '@/configs'
import { LogoutIcon } from '@/components/icons'
import { useAuthStore, useToggleSidebar } from '@/stores'
import { useRouter } from 'vue-router'

const store = useToggleSidebar()
const { isOpen } = storeToRefs(store)

const { purgeAuth } = useAuthStore()
const router = useRouter()
</script>

<style scoped>
.drawer {
  position: absolute;
  top: 72px;
  right: 0;
  z-index: 30;
  width: 0;
  background: white;
  height: calc(100% - 72px);
  overflow: hidden;
  transition: all 0.5s;
  border-top-left-radius: 8px;
}

.drawer-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 0; /* initially */
  height: 100vh;
  background: #000;
  z-index: 20;
}
</style>
