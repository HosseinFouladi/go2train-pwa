import './styles/index.css'
import 'vue-tel-input/vue-tel-input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelInput from 'vue-tel-input'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueCountdown from '@chenfengyuan/vue-countdown'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import GoogleLogin from 'vue3-google-login'

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import ToastService from 'primevue/toastservice'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import {
  GoogleLoginConfig,
  queryClientConfig,
  telInputGlobalOptions
} from '@/constants'

import App from './App.vue'

import router from '@/router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component(VueCountdown.name || 'VueCountDown', VueCountdown)
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, queryClientConfig)
// @ts-ignore
app.use(VueTelInput, telInputGlobalOptions)
app.use(VueSweetalert2)
app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
})
app.use(ToastService)
app.use(GoogleLogin, GoogleLoginConfig)

app.mount('#app')
