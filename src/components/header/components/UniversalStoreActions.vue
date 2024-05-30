<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  currentStore,
  customStoreName,
  isDestinationStore,
  isSourceStore,
  storeName,
  storeType,
  universalStores,
} = toRefs(useConnectionsStore());

const {
  settingsUpdated,
} = toRefs(useProductSettingsStore());

const {
  isSwitchingStore,
  userId,
} = toRefs(useAuthStore());

const {
  fetchCurrentPlan,
} = toRefs(usePlanStore());

const {
  copyToClipBoard,
} = useFilters();

const {
  showToast,
} = useToasts();

const activityCenter = useActivityCenterStore();
const connections = useConnectionsStore();
const marketPlace = useMarketPlaceStore();
const orders = useOrdersStore();
const payouts = usePayoutsStore();
const products = useProductsStore();
const productSettings = useProductSettingsStore();
const router = useRouter();

/* ----- Methods ----- */
const universalStoreSwitchHandler = async (_storeType) => {
  const storeToLoad = universalStores.value.filter(store => store.type === _storeType)[0];
  if(!storeToLoad) return;
  isSwitchingStore.value = true;

  /* Reset some states and direct user to dashboard */
  activityCenter.$reset();
  connections.connectionFilterItems = [];
  connections.connections = [];
  marketPlace.$reset();
  orders.$reset();
  payouts.$reset();
  products.$reset();
  productSettings.$reset();
  currentStore.value = JSON.parse(JSON.stringify(storeToLoad));
  router.replace({ name: routes.DASHBOARD });

  await fetchCurrentPlan.value(userId.value);

  setTimeout(() => {
    isSwitchingStore.value = false;
    settingsUpdated.value = false;
  }, 1000);
};

const copyStoreNameHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store URL copied successfully' });
};
</script>

<template>
  <Tag v-if="customStoreName" severity="info" class="text-900 border-0 tag-transparent" :class="`tag-${storeType}`">
    <div class="flex flex-column pr-6">
      <h4 class="m-0 font-semiBold" style="transform: translateY(2px);">{{ customStoreName }}</h4>
      <p class="flex align-items-center m-0 font-normal" style="font-size: .9rem;">
        {{ storeName }}
        <i class="pi pi-copy pointer ml-1" @click="copyStoreNameHandler(storeName)"></i>
      </p>
    </div>
  </Tag>
  <Tag v-else severity="info" class="pointer border-0 text-900 tag-transparent" :class="`tag-${storeType}`">
    <div class="flex pr-6">
      {{ storeName }}
      <i class="pi pi-copy pointer ml-2" @click="copyStoreNameHandler(storeName)"></i>
    </div>
  </Tag>
  <div class="flex">
    <Button
      :class="{ active : isSourceStore }"
      @click="universalStoreSwitchHandler('source')"
      class="p-button-source"
      label="Source"
      outlined>
    </Button>

    <Divider layout="vertical" class="mx-3" />

    <Button
      :class="{ 'active' : isDestinationStore }"
      @click="universalStoreSwitchHandler('destination')"
      class="p-button-destination"
      label="Destination"
      outlined>
    </Button>
  </div>
</template>

<style scoped>
  .pi-copy:before {
    font-size: 1rem !important;
  }
</style>
