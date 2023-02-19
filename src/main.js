/* ===== Vue ===== */
import { createApp } from 'vue'
import App from './App.vue'

/* ===== Pinia ===== */
import { createPinia } from 'pinia'
import { useActivityCenterStore } from '@/stores/activityCenter'
import { useAuthStore } from '@/stores/auth'
import { useConnectionsStore } from '@/stores/connections'
import { useDashboardStore } from '@/stores/dashboard'
import { useOrdersStore } from '@/stores/orders'

/* ===== Prime Vue ===== */
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
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import PrimeVue from 'primevue/config'
import Panel from 'primevue/panel'
import ProgressSpinner from 'primevue/progressspinner'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import SpeedDial from 'primevue/speeddial'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import router from './router'
import axios from 'axios'

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

/* ===== CREATE APP AND USE DEPENDENCIES ===== */
const app = createApp(App)
app
.use(createPinia())
.use(router)
.use(PrimeVue, { ripple: true })
.use(ToastService)
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
.component('Message', Message)
.component('MultiSelect', MultiSelect)
.component('Panel', Panel)
.component('ProgressSpinner', ProgressSpinner)
.component('SelectButton', SelectButton)
.component('Sidebar', Sidebar)
.component('Skeleton', Skeleton)
.component('SpeedDial', SpeedDial)
.component('TabPanel', TabPanel)
.component('TabView', TabView)
.component('Tag', Tag)
.component('Toast', Toast)
.directive('ripple', Ripple)
.directive('tooltip', Tooltip)

/* ==== BINDING TO VUE INSTANCE ===== */
const activityCenter = useActivityCenterStore()
const auth = useAuthStore()
const connections = useConnectionsStore()
const dashboard = useDashboardStore()
const orders = useOrdersStore()
auth.$https = activityCenter.$https = connections.$https = dashboard.$https = orders.$https = $https

/* ===== LOGOUT HANDLER ===== */
const logout = () => {
  auth.$reset()
  activityCenter.$reset()
  connections.$reset()
  dashboard.$reset()
  orders.$reset()
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
