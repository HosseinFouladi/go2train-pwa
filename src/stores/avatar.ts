import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAvatarModals = defineStore('toggleDeleteAvatar', () => {
  const isDeletePopup = ref(false)
  const isEditPopup = ref(false)
  const isOpenAvatarsPopup = ref(false)
  const isOpenGalleryPopup = ref(false)
  const isEditPopupButtonDisplay = ref(false)

  function toggleDeleteAvatarModal() {
    isDeletePopup.value = !isDeletePopup.value
  }

  function toggleEditAvatarModal() {
    isEditPopup.value = !isEditPopup.value
  }

  function toggleAvatarListModal() {
    isOpenAvatarsPopup.value = !isOpenAvatarsPopup.value
  }

  function toggleGalleryModal() {
    isOpenGalleryPopup.value = !isOpenGalleryPopup.value
  }

  function enableEditButtonDisplay() {
    isEditPopupButtonDisplay.value = true
  }

  function disableEditButtonDisplay() {
    isEditPopupButtonDisplay.value = false
  }

  return {
    isDeletePopup,
    toggleDeleteAvatarModal,
    isEditPopup,
    toggleEditAvatarModal,
    isOpenAvatarsPopup,
    isOpenGalleryPopup,
    toggleAvatarListModal,
    toggleGalleryModal,
    enableEditButtonDisplay,
    isEditPopupButtonDisplay,
    disableEditButtonDisplay
  }
})
