<template>
  <Drawer v-model:visible="visible"   position="left">
    <div class="w-[264px] flex-col py-6 flex justify-between min-h-full">
      <div>
        <SidebarItem
          :key="item.label"
          :icon="item.icon"
          :label="item.label"
          :route="item.route"
          :theme="item.theme"
          v-for="item of SidebarConfig"
        />
      </div>
      <SidebarItem
        :icon="LogoutIcon"
        label="خروج از حساب"
        theme="default"
        @click="() => purgeAuth(() => router.replace({ name: 'sign-in' }))"
      />
    </div></Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { SidebarItem } from '.'
import { SidebarConfig } from '@/configs'
import { LogoutIcon } from '@/components/icons'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
const { purgeAuth } = useAuthStore()
const router = useRouter()

const props=defineProps({
    isVisible:{type:Boolean,default:false}
})

const visible=ref(props.isVisible)
</script>

<style scoped>

</style>