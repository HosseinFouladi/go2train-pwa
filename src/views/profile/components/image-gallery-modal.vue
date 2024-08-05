<template>
  <Dialog v-model:visible="isOpenGalleryPopup" modal dismissableMask>
    <template #container>
      <div class="flex flex-col gap-6 p-6">
        <div class="">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="1"
            :src="src"
            class="h-[310px] w-[310px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden"
          />
        </div>
        <Button label="تایید" :fluid="true" @click="cropImage" :isLoading="storePending"/>
      </div>
    </template>
  </Dialog>
  <Toast dir="rtl" class="text-right" position="bottom-left" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

import { useAvatarModals } from '@/stores'
import { useQueryClient } from '@tanstack/vue-query'
import { Button } from '@/components'
import { useMutation } from '@tanstack/vue-query'
import { type ApiResponseType, type Message, ENDPOINTS } from '@/api'
import type { StoreAvatarParams } from '@/queries/avatars'
import { ApiClient } from '@/utils'

const props = defineProps({
  src: { type: String, required: true }
})

const cropper = ref()
const { toggleGalleryModal,toggleEditAvatarModal } = useAvatarModals()
const { isOpenGalleryPopup } = storeToRefs(useAvatarModals())
const croppedImage = ref('')
const queryClient = useQueryClient();
const toast=useToast();

const { mutate: pickAvatar, isPending: storePending } = useMutation({
  mutationFn: (params: StoreAvatarParams) =>
    ApiClient.postForm<ApiResponseType<any, Message>>(ENDPOINTS.Profile.StoreAvatar, {
      ...params
    }),
  onSuccess(data) {
    toggleGalleryModal()
    toggleEditAvatarModal()
    toast.add({
      summary: 'تغییر موفقیت آمیز آواتار',
      detail: data?.message[0]?.content,
      severity: 'success',
      life: 3000
    })
    queryClient.invalidateQueries({ queryKey: ['user_profile'] })
  },
  onError(error) {
    toast.add({
      summary: 'خطادرتغییرآواتار',
      detail: error.message,
      severity: 'info',
      life: 3000
    })
  }
})

const cropImage = () => {
  croppedImage.value = cropper.value.getCroppedCanvas().toDataURL()
  imagetoFile(croppedImage.value, props.src).then((file) => pickAvatar({avatar:file}))
}

//maybe not need to write function to convert but i cant find better way fornow
const imagetoFile = (src: string, fileName: string) => {
  return fetch(src)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new File([buffer], fileName))
}
</script>

<style scoped></style>
