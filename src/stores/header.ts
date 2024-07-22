import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToggleSidebar = defineStore('toggleSidebar', () => {
  const isOpen = ref(false)
  function toggleSidebar() {
    isOpen.value = !isOpen.value
  }

  return { isOpen, toggleSidebar }
})
