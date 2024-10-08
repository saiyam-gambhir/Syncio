<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ShopifyPermissionsDialog = defineAsyncComponent(() => import('./components/ShopifyPermissionsDialog.vue'));
const EnableUniversalStore = defineAsyncComponent(() => import('./components/EnableUniversalStoreDialog.vue'));

/* ----- Data ----- */
const {
  customStoreName,
  fetchMetadata,
  isEnableUniversalStoreRequested,
  isShopify,
  isUniversalStore,
  shopifyPermissions,
  showUniversalStoreControls,
  storeName,
  storeType,
} = toRefs(useConnectionsStore());

const {
  copyToClipBoard,
} = useFilters();

const {
  showToast,
} = useToasts();

const menu = ref();
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

const logout = async () => {
  sessionStorage.clear();
  await router.push({ name: routes.LOGIN });
};

const copyStoreNameHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store URL copied successfully' });
};
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
      <Button
        @click="goBackHandler"
        icon="pi pi-arrow-left"
        iconPos="left"
        outlined
        v-tooltip.left="'Go Back'">
      </Button>
    </div>

    <div class="header-right flex align-items-center">
      <div v-if="showUniversalStoreControls" class="flex">
        <UniversalStoreActions v-if="isUniversalStore" />
        <NonuniversalStoreActions v-else />
      </div>
      <div v-else>
        <Tag v-if="customStoreName" severity="info" class="text-900" :class="`tag-${storeType}`">
          <div class="flex flex-column pr-4">
            <h4 class="m-0 font-semiBold" style="transform: translateY(2px);">{{ customStoreName }}</h4>
            <p class="flex align-items-center m-0 font-normal" style="font-size: .9rem;">
              {{ storeName }}
              <i class="pi pi-copy pointer ml-1" @click="copyStoreNameHandler(storeName)"></i>
            </p>
          </div>
          <span :class="storeType" class="font-bold">{{ storeType }}</span>
        </Tag>
        <Tag v-else severity="info" class="pointer text-900" :class="`tag-${storeType}`" @click="copyStoreNameHandler(storeName)">
          {{ storeName }}
          <span :class="storeType" class="font-bold">{{ storeType }}</span>
        </Tag>
      </div>

      <Button
        @click="toggleMenu"
        class="ml-4"
        icon="pi pi-user"
        outlined
        rounded>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>

    <!-- Shopify permissions dialog -->
    <ShopifyPermissionsDialog v-if="shopifyPermissions.showDialog" />

    <!-- Enable universal store dialog -->
    <EnableUniversalStore v-if="isEnableUniversalStoreRequested" />
  </header>
</template>
