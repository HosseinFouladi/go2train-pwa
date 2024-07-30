<template>
  <Dialog v-model:visible="isEditPopup" modal :style="{ width: '450px' }" dismissableMask>
    <template #container>
      <div class="flex flex-col items-center gap-6 p-6">
        <div class="flex-col gap-2 d-flex">
          <h6 class="text-center text-h6 font-demi-bold">اضافه کردن تصویر پروفایل  </h6>
          <p class="text-st-two text-text-200">
            یک عکس پروفایل اضافه کنید تا دوستانتان  شما را بشناسند.</p>
        </div>
        <div class="flex justify-center gap-2">
            
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToggleDeleteAvatarModal } from '@/stores'
import { storeToRefs } from 'pinia'
import { Button } from '@/components'

const { toggleEditAvatarModal } = useToggleDeleteAvatarModal()
const { isEditPopup } = storeToRefs(useToggleDeleteAvatarModal())
</script>

<style scoped></style>
