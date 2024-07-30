<template>
  <div class="flex justify-between w-full">
    <div class="flex gap-6">
      <div class="p-3">
        <UserAvatar
          :badge_url="user_avatar.badge_url"
          :avatar_url="avatar"
          width="124px"
        />
      </div>
      <div v-if="!openEdit" class="flex flex-col justify-center gap-2">
        <h4 class="text-h4">بهناز نوری</h4>
        <h6 class="text-h6 text-text-300">behnaz.nouri</h6>
      </div>
      <div v-else class="flex flex-col justify-center gap-2">
        <div class="flex items-center gap-2 cursor-pointer"           @click="handleEditAvatar"
        >
          <GalleryEdit />
          <span class="text-primary-500 text-st-two-loose font-demi-bold"
            >ویرایش عکس</span
          >
        </div>
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="handleDeleteDialog"
        >
          <GallerySlash />
          <span class="text-danger-500 text-st-two-loose font-demi-bold"> حذف</span>
        </div>
      </div>
    </div>
    <div class="">
      <Button
        class="border-t text-secondary-500 border-secondary-500"
        variant="outlined"
        label="ویرایش"
        size="sm"
        @click="openEdit = true"
        :disabled="openEdit"
      />
    </div>
    <DeleteAvatarModal/>
    <EditAvatarModal/>
  </div>
</template>

<script setup lang="ts">
import { UserAvatar, Button } from '@/components'
import { ref } from 'vue'

import { GalleryEdit, GallerySlash } from '@/components/icons'
import { useToggleDeleteAvatarModal } from '@/stores'
import { DeleteAvatarModal,EditAvatarModal } from './'

 defineProps({
  avatar: { type: String },
  badge: { type: String }
})
const openEdit = ref(false)

const user_avatar = {
  avatar_url:
    'https://cdn.pixabay.com/photo/2017/06/06/16/48/woman-2377742_960_720.jpg',
  badge_url:
    'https://train-release.file.g2storage.com/plan/icon/r3QYKaakG9mNwRwUBPHABH2XyqWHh2Ck2yc72OrG.png'
}

const handleDeleteDialog = () => {
  useToggleDeleteAvatarModal().toggleDeleteAvatarModal()
}

const handleEditAvatar = () => {
  useToggleDeleteAvatarModal().toggleEditAvatarModal()
}
</script>

<style scoped></style>
