import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useConnectionsStore } from '@/stores/connections'
import { useDashboardStore } from '@/stores/dashboard'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import DataTable from 'primevue/dataTable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputText'
import Knob from 'primevue/knob'
import MultiSelect from 'primevue/multiselect'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import Skeleton from 'primevue/skeleton'
import SpeedDial from 'primevue/speeddial'
import Tag from 'primevue/tag'
import Tooltip from 'primevue/tooltip'
import router from './router'
import axios from 'axios'
import { DateTime } from 'luxon'
import { useToast } from 'vue-toastification'
import Toast from 'vue-toastification'

/* ==== STYLES ===== */
import './theme/theme-light.css'
//import './theme/theme-dark.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import 'vue-toastification/dist/index.css'
import './assets/scss/main.scss'

/* ===== AXIOS INSTANCES ===== */
const $https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
})
$https.defaults.headers.common['x-syncio-app-id'] = import.meta.env.VITE_APP_ID

const toastOptions = {
  hideProgressBar: true,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
}

/* ===== CREATE APP AND USE DEPENDENCIES ===== */
const app = createApp(App)
app
.use(createPinia())
.use(router)
.use(PrimeVue, { ripple: true })
.use(Toast, toastOptions)
.mount('#app')

/* ===== PRIME VUE COMPONENTS ===== */
app
.component('Button', Button)
.component('Card', Card)
.component('Checkbox', Checkbox)
.component('Column', Column)
.component('DataTable', DataTable)
.component('Dialog', Dialog)
.component('Dropdown', Dropdown)
.component('InputNumber', InputNumber)
.component('InputSwitch', InputSwitch)
.component('InputText', InputText)
.component('Knob', Knob)
.component('MultiSelect', MultiSelect)
.component('SelectButton', SelectButton)
.component('Skeleton', Skeleton)
.component('SpeedDial', SpeedDial)
.component('Tag', Tag)
.directive('ripple', Ripple)
.directive('tooltip', Tooltip)

/* ==== BINDING TO VUE INSTANCE ===== */
const auth = useAuthStore()
const connections = useConnectionsStore()
const dashboard = useDashboardStore()
const toast = useToast()
app.config.globalProperties.$dateTime = DateTime
auth.$https = connections.$https = dashboard.$https = $https
app.provide('$toast', toast)

/* ===== LOGOUT HANDLER ===== */
const logout = () => {
  auth.$reset()
  connections.$reset()
  dashboard.$reset()
  sessionStorage.removeItem('ID_TOKEN_KEY')
  sessionStorage.removeItem('USER_ID')
  router.push('/login')
}

/* ===== INTERCEPTERS ===== */
$https.interceptors.response.use(
  response => {
    const auth = useAuthStore()
    return response
  },
  error => {
  if(error.response?.status === 403) {
    logout()
    return Promise.reject(error)
  }
})

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
          await auth.fetchCurrentPlan(sessionStorage.getItem('USER_ID'))
          await connections.fetchCurrentStore()
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
