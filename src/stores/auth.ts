import { ref } from 'vue'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

import { COOKIE_KEYS } from '@/constants'
import { ApiClient, setAuthCredentials } from '@/utils'
import type { User } from '@/queries/auth/login/type'

export const useAuthStore = defineStore('auth', () => {
  const errors = ref({})
  const isAuthenticated = ref(!!Cookies.get(COOKIE_KEYS.userToken))
  const user=ref<User>()

  function setAuth(token: string, cb?: () => void,userInfo?:User) {
    if(userInfo)
      user.value={...userInfo}
    
			isAuthenticated.value = true;
			errors.value = {};
			setAuthCredentials(token, cb);
			Cookies.set(COOKIE_KEYS.userToken, token);
			ApiClient.setToken(token);
			cb && typeof cb === "function" && cb();
		}

  function purgeAuth(cb?: () => void) {
			isAuthenticated.value = false;
			errors.value = [];
			Cookies.remove(COOKIE_KEYS.userToken);
			ApiClient.removeToken();
			cb && typeof cb === "function" && cb();
		}

  function logout() {
    purgeAuth()
  }

  return {
    errors,
    isAuthenticated,
    logout,
    setAuth,
    purgeAuth,
    user
  }
},{
  persist: true
})
