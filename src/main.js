import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useConnectionsStore } from '@/stores/connections'
import { useDashboardStore } from '@/stores/dashboard'

import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import DataTable from 'primevue/dataTable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputText'
import PrimeVue from 'primevue/config'
import SpeedDial from 'primevue/speeddial'
import Tag from 'primevue/tag'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'

import router from './router'
import axios from 'axios'
import { DateTime } from 'luxon'

/* ==== STYLES ===== */
import './theme/theme-light.css'
//import './theme/theme-dark.css'
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
.component('Card', Card)
.component('Column', Column)
.component('DataTable', DataTable)
.component('Dialog', Dialog)
.component('Dropdown', Dropdown)
.component('InputText', InputText)
.component('SpeedDial', SpeedDial)
.component('Tag', Tag)
.directive('ripple', Ripple)
.directive('tooltip', Tooltip)

/* ==== BINDING TO VUE INSTANCE ===== */
const auth = useAuthStore()
const connections = useConnectionsStore()
const dashboard = useDashboardStore()
app.config.globalProperties.DateTime = DateTime
auth.$https = connections.$https = dashboard.$https = $https

/* ===== ACTIONS BEFORE EACH ROUTE ===== */
router.beforeEach(async (to, from, next) => {
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
        if(!auth.user) {
          await auth.fetchUser(sessionStorage.getItem('USER_ID'))
          await connections.fetchCurrentStore()
          await auth.fetchCurrentPlan(sessionStorage.getItem('USER_ID'))
        }
      }
      next()
    }
  } else if (to.name === 'login' && (isAuthenticated || sessionStorage.getItem('ID_TOKEN_KEY'))) {
    next({ path: from.fullPath })
  } else {
    next()
  }
})

/* ===== THEME ===== */
sessionStorage.setItem('theme', 'theme-light')
document.querySelector('html').classList.add(sessionStorage.getItem('theme'))
