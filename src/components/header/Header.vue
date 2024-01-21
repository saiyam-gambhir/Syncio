<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ShopifyPermissionsDialog = defineAsyncComponent(() => import('./components/ShopifyPermissionsDialog.vue'));

/* ----- Data ----- */
const {
  fetchMetadata,
  isShopify,
  shopifyPermissions,
  storeName,
  storeType,
} = toRefs(useConnectionsStore());

const {
  copyToClipBoard,
} = useFilters();

const {
  showToast,
} = useToasts();

const activityCenter = useActivityCenterStore();
const auth = useAuthStore();
const connections = useConnectionsStore();
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
    label: null,
    items: [
      { label: 'Settings', icon: 'pi pi-cog', command: () => router.push({ name: routes.SETTINGS }) },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => logout() },
    ]
  },
]);

/* ----- Mounted ----- */
onMounted(() => {
  if(isShopify.value) {
    fetchMetadata.value();
  }
});

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
  connections.$reset();
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

const copyStoreNameHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store name copied successfully' });
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
        v-tooltip.left="'Go Back'">
      </Button>
    </div>

    <div class="header-right flex align-items-center">
      <Tag severity="info" class="pointer text-900" :class="`tag-${storeType}`" @click="copyStoreNameHandler(storeName)">
        {{ storeName }}
        <span :class="storeType" class="font-bold">{{ storeType }}</span>
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

    <ShopifyPermissionsDialog v-if="shopifyPermissions.showDialog" />
  </header>
</template>
