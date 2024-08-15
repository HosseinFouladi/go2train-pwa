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

import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'


import {
  GoogleLoginConfig,
  queryClientConfig,
  telInputGlobalOptions
} from '@/constants'
import { createGtm } from "@gtm-support/vue-gtm";


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

//custom video player 
app.use(VueVideoPlayer)


//vue cropper component
app.use(VueCropper)

app.use(
	createGtm({
		id: import.meta.env.VITE_GTAG_ID, // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
		defer: true, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
		compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
		enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
		debug: true, // Whether or not display console logs debugs (optional)
		loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
		vueRouter: router, // Pass the router instance to automatically sync with router (optional)
		trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
	}),
);

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
