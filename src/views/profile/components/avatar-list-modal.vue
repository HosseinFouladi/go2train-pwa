<template>
  <Dialog
    v-model:visible="isOpenAvatarsPopup"
    modal
    dismissableMask
  >
    <template #container>
      <div class="flex flex-col items-center justify-between gap-6 p-6 min-h-[380px] w-[350px] md:w-auto">
        <h6 class="text-center text-h6 font-demi-bold">اضافه کردن تصویر پروفایل</h6>
        <div v-if="isFetching || isPending">
          <Loading />
        </div>
        <div v-else class="grid grid-cols-4 gap-4">
          <div
            v-for="avatar in avatars?.data.results"
            :key="avatar.id"
            :class="
              cn({ 'border-2 border-primary-500 ': avatar.id === choosenItem?.id })
            "
            class="w-[72px] h-[72px] rounded-xl overflow-hidden cursor-pointer"
            @click="() => chooseAvatar(avatar)"
          >
            <img
              :src="avatar.avatar"
              alt="wrong source"
              class="object-fill w-full h-full"
            />
          </div>
        </div>
        <div
          v-if="!isFetching && !isPending"
          class="flex justify-center w-full gap-3"
        >
          <Button
            label="انصراف"
            variant="text"
            class="w-2/5"
            @click="toggleAvatarListModal()"
          />
          <Button
            label="تایید"
            :isLoading="storePending"
            class="w-2/5"
            @click="storeAvatar"
          />
        </div>
      </div>
    </template>
  </Dialog>
  <Toast dir="rtl" class="text-right" position="bottom-left" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { useAvatarModals } from '@/stores'
import { BorderAroowLeft, SelectGallery, SelectAvatar } from '@/components/icons'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType, type Message } from '@/api'
import type { Avatar, StoreAvatarParams } from '@/queries/avatars'
import { cn } from '@/utils'
import { Button, Loading } from '@/components'

const { toggleAvatarListModal,toggleEditAvatarModal } = useAvatarModals()
const { isOpenAvatarsPopup } = storeToRefs(useAvatarModals())

const choosenItem = ref<Avatar>()
const toast = useToast()
const queryClient = useQueryClient()

const {
  data: avatars,
  isPending,
  isFetching
} = useQuery({
  queryKey: ['avatars'],
  queryFn: () =>
    ApiClient.get<ApiResponseType<Array<Avatar>, Message>>(
      ENDPOINTS.Avatars.avatar_list
    )
})

const { mutate: pickAvatar, isPending: storePending } = useMutation({
  mutationFn: (params: StoreAvatarParams) =>
    ApiClient.post<ApiResponseType<any, Message>>(ENDPOINTS.Profile.StoreAvatar, {
      ...params
    }),
  onSuccess(data) {
    toggleAvatarListModal()
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

const chooseAvatar = (avatar: Avatar) => {
  choosenItem.value = avatar
}

const storeAvatar = () => {
  if (choosenItem.value && choosenItem.value.id)
    pickAvatar({ avatar_id: choosenItem.value.id })
}
</script>

<style scoped></style>
