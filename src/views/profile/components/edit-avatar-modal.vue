<template>
  <Dialog
    v-model:visible="isEditPopup"
    modal
    dismissableMask
  >
    <template #container>
      <div class="flex flex-col items-center gap-6 p-6 w-[350px] md:w-auto">
        <div class="flex flex-col gap-4">
          <h6 class="text-center text-h6 font-demi-bold">
            اضافه کردن تصویر پروفایل
          </h6>
          <p class="text-st-two text-text-200">
            یک عکس پروفایل اضافه کنید تا دوستانتان شما را بشناسند.
          </p>
        </div>
        <div class="flex flex-col w-full gap-3">
          <input
            type="file"
            accept="image/*"
            @change="($event) => handleUploadImage($event)"
            id="image-uploader"
            class="hidden"
          />
          <label
            for="image-uploader"
            class="relative flex flex-col items-start w-full gap-1 px-4 py-3 cursor-pointer gallery-uploader rounded-2xl"
          >
            <h3 class="text-st-one font-demi-bold text-secondary-900">
              انتخاب از گالری
            </h3>
            <p class="text-st-two font-regular text-secondary-700">
              از گالری خود تصویری انتخاب کنید
            </p>
            <BorderAroowLeft />
            <SelectGallery class="absolute md:left-0 -top-2 -left-6" />
          </label>

          <div
            class="relative flex flex-col items-start w-full gap-1 px-4 py-3 cursor-pointer avatars-uploader rounded-2xl"
            @click="toggleAvatarListModal"
          >
            <h3 class="text-st-one font-demi-bold text-secondary-900">
              انتخاب از میان آواتار های ما
            </h3>
            <p class="text-st-two font-regular text-secondary-700">
              از میان آواتار های ما انتخاب کنید
            </p>
            <BorderAroowLeft />
            <SelectAvatar class="absolute md:left-0 -top-1 -left-6" />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
  <AvatarListModal />
  <GalleryModal :src="selectedImage"/>
</template>

<script setup lang="ts">
import { useAvatarModals } from '@/stores'
import { storeToRefs } from 'pinia'
import { BorderAroowLeft, SelectGallery, SelectAvatar } from '@/components/icons'
import { AvatarListModal,GalleryModal } from './'
import { ref } from 'vue'

const { toggleAvatarListModal,toggleGalleryModal } = useAvatarModals()
const { isEditPopup } = storeToRefs(useAvatarModals())

const selectedImage = ref('')

const handleUploadImage = (
  event: Event & { target: HTMLInputElement & { files: FileList | null } }
) => {
  if (event.target && event.target.files){
    selectedImage.value = URL.createObjectURL(event.target.files[0]);
    toggleGalleryModal();
  }
}
</script>

<style scoped>
.gallery-uploader {
  background: linear-gradient(
    90deg,
    rgba(85, 193, 208, 1) 0%,
    rgba(179, 242, 251, 1) 100%
  );
}
.avatars-uploader {
  background: linear-gradient(
    90deg,
    rgba(133, 191, 144, 1) 0%,
    rgba(194, 253, 205, 1) 100%
  );
}
</style>
