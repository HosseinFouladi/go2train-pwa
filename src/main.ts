import './styles/index.css'
import 'vue-tel-input/vue-tel-input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelInput from 'vue-tel-input'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueCountdown from '@chenfengyuan/vue-countdown'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueGoogleLogin from 'vue3-google-login'
// @ts-ignore
import VueAppleLogin from 'vue-apple-login'
import PrimeVue from 'primevue/config'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { queryClientConfig, telInputGlobalOptions } from '@/constants'

import App from './App.vue'

import router from '@/router'
import { Layouts } from '@/constants'
import { AuthLayout } from '@/layouts'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.component(Layouts.AuthLayout, AuthLayout)
app.component(VueCountdown.name || 'VueCountDown', VueCountdown)
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, queryClientConfig)
// @ts-ignore
app.use(VueTelInput, telInputGlobalOptions)
app.use(VueSweetalert2)
app.use(VueGoogleLogin, {
  clientId: '91885605070-kb6849b1e825rgiugogr4he0s9e9uohq.apps.googleusercontent.com'
})
app.use(PrimeVue)

app.use(VueAppleLogin, {
  clientId: 'com.example.signin',
  scope: 'name email',
  redirectURI: 'https://example.com',
  state: 'this is state',
  usePopup: true
})

app.mount('#app')
