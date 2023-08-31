<script setup>
import { useActivityCenterStore } from 'activityCenter';
import { useAuthStore } from 'auth';
import { useConnectionsStore } from 'connections';
import { useMarketPlaceStore } from 'marketPlace';
import { useOrdersStore } from 'orders';
import { usePayoutsStore } from 'payouts';
import { usePlanStore } from 'plan';
import { useProductSettingsStore } from 'productSettings';
import { useProductsStore } from 'products';
import * as routes from '@/routes';

/* ----- Data ----- */
const { storeName, storeType } = useConnectionsStore();
const activityCenter = useActivityCenterStore();
const auth = useAuthStore();
const marketPlace = useMarketPlaceStore();
const menu = ref();
const orders = useOrdersStore();
const payouts = usePayoutsStore();
const plan = usePlanStore();
const products = useProductsStore();
const productSettings = useProductSettingsStore();
const router = useRouter();

const items = ref([
  {
    label: '',
    items: [
      {
        label: 'Logout',
        icon: 'pi pi-logout',
        command: () => logout()
      },
    ]
  },
]);

/* ----- Methods ----- */
const goBackHandler = () => {
  const { history } = window;
  if (!history.state.back) return;
  window.history.length > 1 ? router.back() : router.go('/');
};

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const logout = () => {
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
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
      <Button
        icon="pi pi-arrow-left"
        iconPos="left"
        outlined
        @click="goBackHandler"
        v-tooltip.right="'Back'">
      </Button>
    </div>
    <div class="header-right flex align-items-center">
      <Tag
        :value="`${storeType} store`"
        :class="storeType"
        v-tooltip.left="storeName">
      </Tag>
      <Button
        @click="toggleMenu"
        class="ml-4"
        icon="pi pi-user"
        outlined
        rounded>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </header>
</template>
