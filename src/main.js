/* ----- Vue ----- */
import { createApp } from 'vue';
import App from './App.vue';

/* ----- Pinia ----- */
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

/* ----- Prime Vue Components ----- */
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmPopup from 'primevue/confirmpopup';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
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
import Row from 'primevue/row'; // optional
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
import Tooltip from 'primevue/tooltip';

/* ----- Router ----- */
import * as routes from '@/routes';
import router from './router';

/* ----- Third Party ----- */
import Vue3Toasity from 'vue3-toastify';
import VueDatePicker from '@vuepic/vue-datepicker';

/* ----- Styles ----- */
import './theme/theme-light.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import './assets/scss/main.scss';
import 'vue3-toastify/dist/index.css';

/* ----- Create app and use dependencies ----- */
const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ConfirmationService)
  .use(Vue3Toasity)
  .mount('#app');

/* ----- Prime Vue Components ----- */
app
  .component('Accordion', Accordion)
  .component('AccordionTab', AccordionTab)
  .component('AutoComplete', AutoComplete)
  .component('Button', Button)
  .component('Calendar', Calendar)
  .component('Card', Card)
  .component('Carousel', Carousel)
  .component('Checkbox', Checkbox)
  .component('Column', Column)
  .component('ConfirmPopup', ConfirmPopup)
  .component('DataTable', DataTable)
  .component('Dialog', Dialog)
  .component('Divider', Divider)
  .component('Dropdown', Dropdown)
  .component('InputNumber', InputNumber)
  .component('InputSwitch', InputSwitch)
  .component('InputText', InputText)
  .component('Menu', Menu)
  .component('Message', Message)
  .component('MultiSelect', MultiSelect)
  .component('Panel', Panel)
  .component('Password', Password)
  .component('ProgressBar', ProgressBar)
  .component('ProgressSpinner', ProgressSpinner)
  .component('RadioButton', RadioButton)
  .component('Row', Row)
  .component('SelectButton', SelectButton)
  .component('Sidebar', Sidebar)
  .component('Skeleton', Skeleton)
  .component('SpeedDial', SpeedDial)
  .component('SplitButton', SplitButton)
  .component('TabPanel', TabPanel)
  .component('TabView', TabView)
  .component('Tag', Tag)
  .component('Textarea', Textarea)
  .component('Toast', Toast)
  .component('VueDatePicker', VueDatePicker)
  .directive('ripple', Ripple)
  .directive('tooltip', Tooltip);

/* ----- Store Imports ----- */
const auth = useAuthStore();

/* ----- Actions before each route ----- */
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = auth.isAuthenticated;
  const ID_TOKEN_KEY = sessionStorage.getItem('ID_TOKEN_KEY');

  if (to.meta.requireAuth) {
    if (!isAuthenticated && !ID_TOKEN_KEY) {
      return next({ name: routes.LOGIN });
    }

    auth.isAuthenticated = true;

    if(from.fullPath.includes('/shopify/installation-complete')) {
      const userId = sessionStorage.getItem('USER_ID');
      const plan = usePlanStore();
      await plan.fetchCurrentPlan(userId);
    }

    if (!auth.user || from.fullPath === routes.WOO_INSTALLATION_COMPLETED) {
      const userId = sessionStorage.getItem('USER_ID');
      await auth.fetchUser(userId);

      if(!to.path.toLowerCase().includes('/registration/')) {
        const connections = useConnectionsStore();
        const plan = usePlanStore();

        const { stores } = await connections.fetchCurrentStore();

        if(stores.length > 0) {
          await plan.fetchCurrentPlan(userId);
        } else {
          sessionStorage.removeItem('ID_TOKEN_KEY');
          sessionStorage.removeItem('USER_ID');
          return next({ name: routes.LOGIN });
        }
      }
    }
  } else if ((to.path === routes.LOGIN || to.path === routes.ROOT) && ID_TOKEN_KEY) { // check onboarding routes pending
    return next({ path: routes.DASHBOARD });
  } else if (to.path === routes.ROOT && !ID_TOKEN_KEY) {
    return next({ path: routes.LOGIN });
  }

  next();
});

/* ----- Theme ----- */
sessionStorage.setItem('theme', 'theme-light');
document.querySelector('html').classList.add(sessionStorage.getItem('theme'));

/* ----- Intercom ----- */
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/'+import.meta.env.VITE_INTERCOM_APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
window.intercomSettings = {
  app_id: import.meta.env.VITE_INTERCOM_APP_ID,
  custom_launcher_selector: '.intercom-custom-launcher'
};
window.Intercom('update', window.intercomSettings);

/* ----- Hotjar ----- */
(function(h,o,t,j,a,r) {
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:import.meta.env.VITE_HOTJAR_CODE,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
