import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useToggleSidebar = defineStore('toggleSidebar', () => {
  const isOpen = ref(false)
  function toggleSidebar() {
    isOpen.value = !isOpen.value
  }

  watchEffect(() => {
    if (isOpen.value) {
      window.document.body.setAttribute(
        'style',
        'position: fixed; width: 100%; max-height: 100vh;'
      )
    } else {
      window.document.body.removeAttribute('style')
    }
  })

  return { isOpen, toggleSidebar }
})
