import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  persist: true,
  state: () => ({ user: {} }),
  getters: {
    getUserInfo: (state) => state.user
  },
  actions: {
    setUserInfo(user: Record<string, string>) {
      this.user = user
    }
  }
})
