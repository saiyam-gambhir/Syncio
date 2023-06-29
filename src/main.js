/* ----- Vue ----- */
import { createApp } from 'vue';
import App from './App.vue';

/* ----- Pinia ----- */
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { useActivityCenterStore } from '@/stores/activityCenter';
import { useAuthStore } from '@/stores/auth';
import { useConnectionsStore } from '@/stores/connections';
import { useMarketPlaceStore } from '@/stores/marketPlace';
import { useOrdersStore } from '@/stores/orders';
import { usePayoutsStore } from '@/stores/payouts';
import { useProductSettingsStore } from '@/stores/productSettings';

/* ----- Prime Vue ----- */
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/dataTable';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputText';
import Knob from 'primevue/knob';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import Panel from 'primevue/panel';
import Password from 'primevue/password';
import PrimeVue from 'primevue/config';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import SpeedDial from 'primevue/speeddial';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

/* ----- Router ----- */
import * as routes from '@/routes';
import axios from 'axios';
import router from './router';

/* ----- THIRD PARTY ----- */
import VueDatePicker from '@vuepic/vue-datepicker';

/* ----- Styles ----- */
import './theme/theme-light.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import './assets/scss/main.scss';

/* ----- AXIOS INSTANCES ----- */
const $https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
});

Object.assign($https.defaults.headers.common, {
  'x-syncio-app-id': import.meta.env.VITE_APP_ID,
});

/* ----- CREATE APP AND USE DEPENDENCIES ----- */
const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .mount('#app');

/* ----- PRIME VUE COMPONENTS ----- */
app
  .component('Button', Button)
  .component('Calendar', Calendar)
  .component('Card', Card)
  .component('Checkbox', Checkbox)
  .component('Carousel', Carousel)
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
  .component('Textarea', Textarea)
  .component('Toast', Toast)
  .component('VueDatePicker', VueDatePicker)
  .directive('ripple', Ripple)
  .directive('tooltip', Tooltip);

/* ----- BINDING TO VUE INSTANCE ----- */
const activityCenter = useActivityCenterStore();
const auth = useAuthStore();
const connections = useConnectionsStore();
const marketPlace = useMarketPlaceStore();
const orders = useOrdersStore();
const payouts = usePayoutsStore();
const productSettings = useProductSettingsStore();
activityCenter.$https = auth.$https = connections.$https = marketPlace.$https = orders.$https = payouts.$https = productSettings.$https = $https;

/* ----- LOGOUT HANDLER ----- */
const logout = () => {
  activityCenter.$reset();
  auth.$reset();
  //connections.$reset();
  marketPlace.$reset();
  orders.$reset();
  payouts.$reset();
  productSettings.$reset();
  sessionStorage.removeItem('ID_TOKEN_KEY');
  sessionStorage.removeItem('USER_ID');
  router.push({ name: routes.LOGIN });
};

/* ----- INTERCEPTERS ----- */
$https.interceptors.response.use(
  response => {
    const { message, success } = response?.data
    if(message && success) connections.showToast(message);
    return response;
  },
  error => {
    const { status, data } = error.response || {};
    switch (status) {
      case 422:
      case 400: {
        const message = data.errors?.[0];
        if (message) connections.showToast(message, 'error');
        break;
      }
      case 403:
        logout();
        return Promise.reject(error);
      case 502:
        connections.showToast('Bad Gateway: The server received an invalid response', 'error');
        break;
      case 500:
        connections.showToast('Internal Server Error: An unexpected error occurred on the server', 'error');
        break;
      default:
        break;
    }
  }
);

/* ----- ACTIONS BEFORE EACH ROUTE ----- */
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = auth.isAuthenticated;
  const ID_TOKEN_KEY = sessionStorage.getItem('ID_TOKEN_KEY');

  if (to.meta.requireAuth) {
    if (!isAuthenticated && !ID_TOKEN_KEY) {
      return next({ name: routes.LOGIN });
    }

    auth.isAuthenticated = true;

    if (!auth.user) {
      Object.assign($https.defaults.headers.common, {
        Authorization: `Bearer ${ID_TOKEN_KEY}`,
      });
      const userId = sessionStorage.getItem('USER_ID');
      await auth.fetchUser(userId);
      await auth.fetchCurrentPlan(userId);
      await connections.fetchCurrentStore();
    }
  } else if (to.name === 'login' && ID_TOKEN_KEY) {
    return next({ path: from.fullPath });
  }

  next();
});

/* ----- THEME ----- */
sessionStorage.setItem('theme', 'theme-light');
document.querySelector('html').classList.add(sessionStorage.getItem('theme'));
