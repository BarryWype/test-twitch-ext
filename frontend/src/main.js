import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import twitch from './js/twitch'

const vueapp = createApp(App)

vueapp.config.globalProperties.$twitch = twitch

vueapp.config.globalProperties.$axios = axios

vueapp.mount('#app')