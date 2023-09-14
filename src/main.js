/* ----- Vue ----- */
import { createApp } from 'vue';
import App from './App.vue';
import Vue3Toasity from 'vue3-toastify';

/* ----- Pinia ----- */
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { useActivityCenterStore } from 'activityCenter';
import { useAuthStore } from 'auth';
import { useConnectionsStore } from 'connections';
import { useMarketPlaceStore } from 'marketPlace';
import { useOrdersStore } from 'orders';
import { usePayoutsStore } from 'payouts';
import { usePlanStore } from 'plan';
import { useProductSettingsStore } from 'productSettings';
import { useProductsStore } from 'products';

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
import Menu from 'primevue/menu';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import Panel from 'primevue/panel';
import Password from 'primevue/password';
import PrimeVue from 'primevue/config';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
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

/* ----- Third Party ----- */
import VueDatePicker from '@vuepic/vue-datepicker';

/* ----- Styles ----- */
import './theme/theme-light.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import './assets/scss/main.scss';
import 'vue3-toastify/dist/index.css';

/* ----- Axios Instances ----- */
const $https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
});

Object.assign($https.defaults.headers.common, {
  'x-syncio-app-id': import.meta.env.VITE_APP_ID,
});

/* ----- Create app and use dependencies ----- */
const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .use(Vue3Toasity)
  .mount('#app');

/* ----- Prime Vue Components ----- */
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
  .component('Menu', Menu)
  .component('Message', Message)
  .component('MultiSelect', MultiSelect)
  .component('Panel', Panel)
  .component('Password', Password)
  .component('ProgressBar', ProgressBar)
  .component('ProgressSpinner', ProgressSpinner)
  .component('RadioButton', RadioButton)
  .component('SelectButton', SelectButton)
  .component('SplitButton', SplitButton)
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

/* ----- Binding to the Vue instance ----- */
const activityCenter = useActivityCenterStore();
const auth = useAuthStore();
const connections = useConnectionsStore();
const marketPlace = useMarketPlaceStore();
const orders = useOrdersStore();
const payouts = usePayoutsStore();
const plan = usePlanStore();
const products = useProductsStore();
const productSettings = useProductSettingsStore();
activityCenter.$https = auth.$https = connections.$https = marketPlace.$https = orders.$https = payouts.$https = plan.$https = productSettings.$https = $https;

/* ----- Logout Handler ----- */
const logout = () => {
  //connections.$reset();
  activityCenter.$reset();
  auth.$reset();
  marketPlace.$reset();
  orders.$reset();
  payouts.$reset();
  plan.$reset();
  products.$reset();
  productSettings.$reset();
  sessionStorage.removeItem('ID_TOKEN_KEY');
  sessionStorage.removeItem('USER_ID');
  router.push({ name: routes.LOGIN });
};

/* ----- Interceptors ----- */
$https.interceptors.response.use(
  response => {
    const { message, success, errors } = response?.data
    if(message && success) connections.showToast(message);
    else if(!success && errors[0]) connections.showToast(errors[0], 'error');
    return response;
  },
  error => {
    const { status, data } = error.response || {};
    switch (status) {
      case 422:
      case 400: {
        const message = data.errors?.[0];
        if (message) connections.showToast(message, 'error');
        if(data.redirect_to === 'billing') {
          router.push({ name: routes.PLAN_AND_BILLINGS });
        }
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

/* ----- Actions before each route ----- */
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = auth.isAuthenticated;
  const ID_TOKEN_KEY = sessionStorage.getItem('ID_TOKEN_KEY');

  if (to.meta.requireAuth) {
    if (!isAuthenticated && !ID_TOKEN_KEY) {
      return next({ name: routes.LOGIN });
    }

    auth.isAuthenticated = true;

    Object.assign($https.defaults.headers.common, { Authorization: `Bearer ${ID_TOKEN_KEY}` });

    if (!auth.user) {
      const userId = sessionStorage.getItem('USER_ID');
      await auth.fetchUser(userId);
      await plan.fetchCurrentPlan(userId);
      await connections.fetchCurrentStore();
    }
  } else if (to.name === 'login' && ID_TOKEN_KEY) {
    return next({ path: from.fullPath });
  }

  next();
});

/* ----- Theme ----- */
sessionStorage.setItem('theme', 'theme-light');
document.querySelector('html').classList.add(sessionStorage.getItem('theme'));
