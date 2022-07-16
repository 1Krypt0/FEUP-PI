import { createApp } from 'vue'
import App from './App.vue'
import Markdown from 'vue3-markdown-it'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import './index.css'

library.add(faMagnifyingGlass)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(Markdown).mount('#app')
