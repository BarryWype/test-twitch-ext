import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import ConfigVue from './components/Config.vue'
import twitch from './js/twitch'
import steam from './js/steam'

const vueapp = createApp(App)
const vueconfig = createApp(ConfigVue)

vueapp.config.globalProperties.$twitch = twitch
vueapp.config.globalProperties.$steam = steam
vueapp.config.globalProperties.$axios = axios

vueconfig.config.globalProperties.$twitch = twitch
vueconfig.config.globalProperties.$steam = steam
vueconfig.config.globalProperties.$axios = axios

vueapp.mount('#app')
vueconfig.mount('#config')
