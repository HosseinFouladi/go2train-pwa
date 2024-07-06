import { ref } from 'vue'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

import { COOKIE_KEYS } from '@/constants'
import { ApiClient, getToken, setAuthCredentials } from '@/utils'

export const useAuthStore = defineStore('auth', () => {
  const errors = ref({})
  const isAuthenticated = ref(!!getToken())

  function setAuth(token: string, cb?: Function) {
    isAuthenticated.value = true
    errors.value = {}
    setAuthCredentials(token, cb)
    Cookies.set(COOKIE_KEYS.userToken, token)
    ApiClient.setToken(token)
    cb && typeof cb === 'function' && cb()
  }

  function purgeAuth() {
    console.log('purgeAuth')
    isAuthenticated.value = false
    errors.value = []
    Cookies.remove(COOKIE_KEYS.userToken)
    ApiClient.removeToken()
  }

  function login(token: string) {
    setAuth(token)
  }

  function logout() {
    purgeAuth()
  }

  return {
    errors,
    isAuthenticated,
    login,
    logout,
    purgeAuth
  }
})
