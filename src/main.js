import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputText'
import Tooltip from 'primevue/tooltip'
import router from './router'
import axios from 'axios'
import { DateTime } from 'luxon'

/* ==== STYLES ===== */
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import './assets/scss/main.scss'

/* ===== AXIOS INSTANCES ===== */
const $https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})
$https.defaults.headers.common['x-syncio-app-id'] = import.meta.env.VITE_APP_ID

/* ===== CREATE APP AND USE DEPENDENCIES ===== */
const app = createApp(App)
app
.use(createPinia())
.use(router)
.use(PrimeVue, { ripple: true })
.mount('#app')

/* ===== PRIME VUE COMPONENTS ===== */
app
.component('Button', Button)
.component('InputText', InputText)
.directive('tooltip', Tooltip)

/* ==== BINDING TO VUE INSTANCE ===== */
const auth = useAuthStore()
app.config.globalProperties.DateTime = DateTime
auth.$https = $https

/* ===== ACTIONS BEFORE EACH ROUTE ===== */
router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isAuthenticated
  if(to.meta.requireAuth) {
    if(!isAuthenticated && !sessionStorage.getItem('ID_TOKEN_KEY')) {
      next({
        path: '/login'
      })
    } else {
      auth.isAuthenticated = true
      // TODO: Create methods for session storage or use vueuse library
      if(sessionStorage.getItem('ID_TOKEN_KEY') && sessionStorage.getItem('USER_ID')) {
        $https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`
        $httpsServers.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`
        if(!auth.user) auth.fetchUser(sessionStorage.getItem('USER_ID'))
      }
      next()
    }
  } else if (to.name === 'login' && (isAuthenticated || sessionStorage.getItem('ID_TOKEN_KEY'))) {
    next({ path: from.fullPath })
  } else {
    next()
  }
})
