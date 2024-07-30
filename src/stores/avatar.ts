import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToggleDeleteAvatarModal = defineStore('toggleDeleteAvatar', () => {
  const isDeletePopup = ref(false)
  const isEditPopup = ref(false)

  function toggleDeleteAvatarModal() {
    isDeletePopup.value = !isDeletePopup.value
  }

  function toggleEditAvatarModal() {
    isEditPopup.value = !isEditPopup.value
  }

  return { isDeletePopup, toggleDeleteAvatarModal,isEditPopup,toggleEditAvatarModal }
})
