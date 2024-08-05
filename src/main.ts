import './styles/index.css'
import 'vue-final-modal/style.css'
import 'vue-tel-input/vue-tel-input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelInput from 'vue-tel-input'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueCountdown from '@chenfengyuan/vue-countdown'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import GoogleLogin from 'vue3-google-login'
import { createVfm } from 'vue-final-modal'

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import ToastService from 'primevue/toastservice'

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";


import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

import {
  GoogleLoginConfig,
  queryClientConfig,
  telInputGlobalOptions
} from '@/constants'

import App from './App.vue'

import router from '@/router'

const app = createApp(App)
const vueFinalModal = createVfm()

app.use(FloatingVue);

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
    preset: Lara,
    options: {
      // this is the easiest way of disabling automatic dark_mode of `primevue`
      darkModeSelector: '.something_else'
    }
  }
})
app.use(ToastService)
app.use(GoogleLogin, GoogleLoginConfig)
app.use(vueFinalModal)

//vue cropper component
app.use(VueCropper)

app.mount('#app')

declare global {
  interface String {
    toPersianDigits(): string
  }
}

String.prototype.toPersianDigits = function (): string {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return this.replace(/[0-9]/g, (w) => id[+w])
}
