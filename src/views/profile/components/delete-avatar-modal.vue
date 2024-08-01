<template>
  <Dialog
    v-model:visible="isDeletePopup"
    modal
    :style="{ width: '450px' }"
    dismissableMask
  >
    <template #container>
      <div class="flex flex-col items-center gap-6 p-6">
        <div class="flex-col gap-2 d-flex">
          <h6 class="text-center text-h6 font-demi-bold">حذف عکس پروفایل</h6>
          <p class="text-st-two text-text-200">
            آيا مطمئن هستید که میخواهید عکس پروفایل خود را حذف کنید؟
          </p>
        </div>
        <div class="flex justify-center gap-2">
          <Button
            label="انصراف"
            variant="text"
            class="text-secondary-500"
            size="sm"
            @click="() => toggleDeleteAvatarModal()"
          />
          <Button
            label="حذف"
            variant="text"
            class="text-danger-500"
            size="sm"
            mode="danger"
            @click="handleDeleteAvatar"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useQueryClient } from '@tanstack/vue-query'

import { useAvatarModals } from '@/stores'
import { storeToRefs } from 'pinia'
import { Button } from '@/components'
import { useMutation } from '@tanstack/vue-query'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType, type Message } from '@/api'

const { toggleDeleteAvatarModal } = useAvatarModals()
const { isDeletePopup } = storeToRefs(useAvatarModals())

const toast = useToast()
const queryClient = useQueryClient()

const { mutate: removeAvatar, isPending: deletePending } = useMutation({
  mutationFn: () =>
    ApiClient.delete<ApiResponseType<{}, Message>>(ENDPOINTS.Profile.RemoveAvatar),
  onSuccess(data) {
    toggleDeleteAvatarModal()
    toast.add({
      summary: 'حذف موفقیت آمیز آواتار',
      detail: data?.message[0]?.content,
      severity: 'success',
      life: 3000
    })
    queryClient.invalidateQueries({ queryKey: ['user_profile'] })
  },
  onError(error) {
    toast.add({
      summary: 'خطادرحذف آواتار',
      detail: error.message,
      severity: 'info',
      life: 3000
    })
  }
})

const handleDeleteAvatar = () => {
  removeAvatar()
}
</script>

<style scoped></style>
