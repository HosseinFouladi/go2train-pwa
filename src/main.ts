import './styles/index.css'
import 'vue-tel-input/vue-tel-input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelInput from 'vue-tel-input'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueCountdown from '@chenfengyuan/vue-countdown'

import { queryClientConfig, telInputGlobalOptions } from '@/constants'

import App from './App.vue'

import router from '@/router'
import { Layouts } from '@/constants'
import { AuthLayout } from '@/layouts'

const app = createApp(App)

app.component(Layouts.AuthLayout, AuthLayout)
app.component(VueCountdown.name || 'VueCountDown', VueCountdown)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, queryClientConfig)
// @ts-ignore
app.use(VueTelInput, telInputGlobalOptions)

app.mount('#app')
