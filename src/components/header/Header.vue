<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ShopifyPermissionsDialog = defineAsyncComponent(() => import('./components/ShopifyPermissionsDialog.vue'));

/* ----- Data ----- */
const {
  fetchMetadata,
  isNewStoreConnectionRequested,
  shopifyPermissions,
  storeKey,
  storeName,
  storeType,
} = toRefs(useConnectionsStore());

const {
  copyToClipBoard,
} = useFilters();

const {
  showToast
} = useToasts();

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
      { label: 'Logout', icon: 'pi pi-logout', command: () => logout() },
    ]
  },
]);
const quickActions = ref([
  {
    label: 'Connect new store',
    icon: 'pi pi-plus',
    command: () => {
      connectNewStoreHandler();
    }
  },
  {
    label: 'Toggle multilocation',
    icon: 'pi pi-map-marker',
    command: () => {}
  },
  {
    label: 'Copy store key',
    icon: 'pi pi-copy',
    command: () => {
      copyStoreKeyHandler();
    }
  },
  {
    label: 'Toggle auto push',
    icon: 'pi pi-fast-forward',
    command: () => {}
  },
  {
    label: 'Set default commission',
    icon: 'pi pi-percentage',
    command: () => {}
  }
]);
const isForwardActionDisabled = ref(false);

/* ----- Mounted ----- */
onMounted(() => {
  fetchMetadata.value();
});

/* ----- Methods ----- */
const goBackHandler = () => {
  const { history } = window;
  if (!history.state.back) return;
  window.history.length > 1 ? router.back() : router.go('/');
};

const goForwardHandler = () => {
  const { history } = window;
  if (!history.state.forward) {
    isForwardActionDisabled.value = true;
    return;
  }
  window.history.length > 1 ? router.forward() : router.go('/');
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

const copyStoreKeyHandler = () => {
  copyToClipBoard(storeKey.value);
  showToast({ message: 'Store key copied successfully' });
};

const connectNewStoreHandler = async () => {
  await router.push({ name: routes.STORES });
  isNewStoreConnectionRequested.value = true;
}
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
      <Button
        icon="pi pi-arrow-left"
        iconPos="left"
        outlined
        @click="goBackHandler"
        v-tooltip.left="'Go Back'">
      </Button>
    </div>

    <SpeedDial
      :model="quickActions"
      :radius="80"
      :style="{ left: 'calc(50% - 2rem)', top: '.65rem' }"
      :tooltipOptions="{ position: 'bottom' }"
      :transitionDelay="50"
      buttonClass="p-button-outlined"
      direction="down"
      type="semi-circle">
    </SpeedDial>

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

    <ShopifyPermissionsDialog v-if="shopifyPermissions.showPermissionsDialog" />
  </header>
</template>
