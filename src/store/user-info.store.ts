import type { User } from '@/queries'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  persist: true,
  state: () => ({ user: {} as User }),
  getters: {
    getUserInfo: (state) => state.user
  },
  actions: {
    setUserInfo(user: User) {
      this.user = user
    }
  }
})
