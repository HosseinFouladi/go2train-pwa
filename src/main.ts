import './styles/index.css'
import 'vue-tel-input/vue-tel-input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelInput from 'vue-tel-input'

import App from './App.vue'

import router from '@/router'
import { Layouts } from '@/constants'
import { AuthLayout } from '@/layouts'

const app = createApp(App)

const globalOptions = {
  mode: 'auto',
  dropdownOptions: { showSearchBox: true },
  inputOptions: {
    autofocus: true,
    showDialCode: true,
    placeholder: '',
    required: true
  }
}

app.component(Layouts.AuthLayout, AuthLayout)
app.use(createPinia())
app.use(router)
app.use(VueTelInput, globalOptions)

app.mount('#app')
