<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const DefaultStoreCommission = defineAsyncComponent(() => import('./components/DefaultStoreCommission.vue'));
const LeavingPageDialog = defineAsyncComponent(() => import('@/components/shared/LeavingPageDialog.vue'));
const ProductCommission = defineAsyncComponent(() => import('./components/product/ProductCommission.vue'));
const StoreCommission = defineAsyncComponent(() => import('./components/store/StoreCommission.vue'));

/* ----- Data ----- */
const forceLeavingPage = ref(false);
const router = useRouter();
const routeTo = ref(null);

const {
  activeTabIndex,
  areProductCommissionsChanged,
  areStoreCommissionsChanged,
  isDefaultCommissionChanged,
  storeConnections,
  storeDefaultCommissionRate,
  storeProducts,
  unMutatedStoreProducts,
} = toRefs(usePayoutsSettingsStore());

const {
  connections,
  storeDefaultCommission,
} = toRefs(useConnectionsStore());

const {
  showLeavingPageDialog
} = toRefs(useAuthStore());

const {
  isSourceStore,
  isWoocommerce,
} = toRefs(useConnectionsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  if (isSourceStore.value || isWoocommerce.value) {
    router.push({
      path: routes.DASHBOARD,
    });
    return;
  }

  await fetchPlansHandler();
  setSelectedPlan();
});

/* ----- Before Route Leave ----- */
onBeforeRouteLeave((to, from, next) => {
  if((isDefaultCommissionChanged.value || areStoreCommissionsChanged.value || areProductCommissionsChanged.value) && !forceLeavingPage.value && to.fullPath !== routes.LOGIN) {
    showLeavingPageDialog.value = true;
    routeTo.value = to;
    next(false);
  } else {
    next();
  }
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};

const leaveCurrentPageHandler = () => {
  if (routeTo.value) {
    forceLeavingPage.value = true;
    router.push(routeTo.value);
    showLeavingPageDialog.value = false;

    storeDefaultCommissionRate.value = structuredClone(toRaw(storeDefaultCommission.value));
    storeConnections.value = structuredClone(toRaw(connections.value));
    storeProducts.value = JSON.parse(unMutatedStoreProducts.value);
  }
};
</script>

<template>
  <PageHeader
    content="Manage your payouts by shop, store and product"
    title="Payouts Settings">
  </PageHeader>

  <article class="mt-2">
    <p class="text-lg line-height-4 mt-0">
      Commissions will be calculated on sales value; the total amount your customers pay for the product. <br>
      If no Product commissions are set, Syncio will use the Store commission in Payouts calculations for that product. <br>
      Commissions can only be set for <strong>Shopify</strong> stores, as Payouts is not available for <strong>Woocommerce</strong> stores yet.
    </p>

    <TabView v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4">
      <TabPanel header="Your Shop Default">
        <DefaultStoreCommission class="mt-4" v-show="activeTabIndex === 0" />
      </TabPanel>
      <TabPanel header="By Store">
        <StoreCommission v-show="activeTabIndex === 1" />
      </TabPanel>
      <TabPanel header="By Product">
        <ProductCommission v-show="activeTabIndex === 2" />
      </TabPanel>
    </TabView>
  </article>

  <LeavingPageDialog
    :isDialogVisible="(isDefaultCommissionChanged || areStoreCommissionsChanged || areProductCommissionsChanged)"
    @leaveCurrentPage="leaveCurrentPageHandler">
  </LeavingPageDialog>
</template>
