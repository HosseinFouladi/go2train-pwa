<template>
  <div class="flex justify-between w-full">
    <div class="flex gap-6">
      <div class="w-[72px] md:w-[124px] h-[72px] md:h-[124px]">
        <UserAvatar
          :badge_url="badge"
          :avatar_url="avatar"
          width="100%"
        />
      </div>
      <div v-if="!openEdit" class="flex flex-col justify-center gap-2">
        <h4 class="text-h6 md:text-h4"> {{ name }}</h4>
        <h6 class="text-st-one text-text-300">{{ username }}</h6>
      </div>
      <div v-else class="flex flex-col justify-center gap-2">
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="handleEditAvatar"
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
        v-if="!openEdit"
        class="border-t text-secondary-500 border-secondary-500"
        variant="outlined"
        label="ویرایش"
        size="sm"
        @click="openEdit = true"
      />
    </div>
    <DeleteAvatarModal />
    <EditAvatarModal />
  </div>
</template>

<script setup lang="ts">
import { UserAvatar, Button } from '@/components'
import { ref } from 'vue'

import { GalleryEdit, GallerySlash } from '@/components/icons'
import { useAvatarModals } from '@/stores'
import { DeleteAvatarModal, EditAvatarModal } from './'

defineProps({
  avatar: { type: String },
  badge: { type: String },
  name:{type:String},
  username:{type:String}
})
const openEdit = ref(false)


const handleDeleteDialog = () => {
  useAvatarModals().toggleDeleteAvatarModal()
}

const handleEditAvatar = () => {
  useAvatarModals().toggleEditAvatarModal()
}
</script>

<style scoped></style>
