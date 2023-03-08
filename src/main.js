/* ===== Vue ===== */
import { createApp } from 'vue'
import App from './App.vue'

/* ===== Pinia ===== */
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { useActivityCenterStore } from '@/stores/activityCenter'
import { useAuthStore } from '@/stores/auth'
import { useConnectionsStore } from '@/stores/connections'
import { useDashboardStore } from '@/stores/dashboard'
import { useOrdersStore } from '@/stores/orders'
import { useProductsStore } from '@/stores/products'

/* ===== Prime Vue ===== */
import Button from 'primevue/button'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import DataTable from 'primevue/dataTable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputText'
import Knob from 'primevue/knob'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Panel from 'primevue/panel'
import Password from 'primevue/password'
import PrimeVue from 'primevue/config'
import ProgressBar from 'primevue/progressbar'
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

/* ===== ROUTER ===== */
import router from './router'
import axios from 'axios'

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
  timeout: 20000,
})
$https.defaults.headers.common['x-syncio-app-id'] = import.meta.env.VITE_APP_ID

/* ===== CREATE APP AND USE DEPENDENCIES ===== */
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app
.use(pinia)
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
.component('Divider', Divider)
.component('Dropdown', Dropdown)
.component('InputNumber', InputNumber)
.component('InputSwitch', InputSwitch)
.component('InputText', InputText)
.component('Knob', Knob)
.component('Message', Message)
.component('MultiSelect', MultiSelect)
.component('Panel', Panel)
.component('Password', Password)
.component('ProgressBar', ProgressBar)
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
const products = useProductsStore()
auth.$https = activityCenter.$https = connections.$https = dashboard.$https = orders.$https = products.$https = $https

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
  const ID_TOKEN_KEY = sessionStorage.getItem('ID_TOKEN_KEY')
  const USER_ID = sessionStorage.getItem('USER_ID')

  if(to.meta.requireAuth) {
    if(!isAuthenticated && !sessionStorage.getItem('ID_TOKEN_KEY')) {
      next({
        path: '/login'
      })
    } else {
      auth.isAuthenticated = true
      // TODO: Create methods for session storage or use vueuse library
      if(ID_TOKEN_KEY && USER_ID) {
        $https.defaults.headers.common['Authorization'] = `Bearer ${ID_TOKEN_KEY}`
        if(!auth.user) {
          await auth.fetchUser(USER_ID)
          await auth.fetchCurrentPlan(USER_ID)
          await connections.fetchCurrentStore()
          await auth.fetchPlans()
        }
      }
      next()
    }
  } else if (to.name === 'login' && (isAuthenticated || ID_TOKEN_KEY)) {
    next({ path: from.fullPath })
  } else {
    next()
  }
})

/* ===== THEME ===== */
sessionStorage.setItem('theme', 'theme-light')
document.querySelector('html').classList.add(sessionStorage.getItem('theme'))
