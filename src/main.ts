import './styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import router from '@/router'
import { Layouts } from '@/constants'
import AuthLayout from '@/layouts/auth-layout.vue'

const app = createApp(App)

app.component(Layouts.AuthLayout, AuthLayout)
app.use(createPinia())
app.use(router)

app.mount('#app')
