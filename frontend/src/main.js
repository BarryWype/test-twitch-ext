import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import ConfigVue from './components/Config.vue'
import twitch from './js/twitch'

const vueapp = createApp(App)
const vueconfig = createApp(ConfigVue)

vueapp.config.globalProperties.$twitch = twitch
vueapp.config.globalProperties.$axios = axios

vueconfig.config.globalProperties.$twitch = twitch
vueconfig.config.globalProperties.$axios = axios

vueapp.mount('#app')
vueconfig.mount('#config')
