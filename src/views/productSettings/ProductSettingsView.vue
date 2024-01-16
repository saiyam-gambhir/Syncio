<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const LeavingPageDialog = defineAsyncComponent(() => import('@/components/shared/LeavingPageDialog.vue'));
const Product = defineAsyncComponent(() => import('./components/Product.vue'));
const ProductSkeleton = defineAsyncComponent(() => import('./components/ProductSkeleton.vue'));
const Variant = defineAsyncComponent(() => import('./components/Variant.vue'));
const VariantSkeleton = defineAsyncComponent(() => import('./components/VariantSkeleton.vue'));

/* ----- Data ----- */
const {
  showLeavingPageDialog
} = toRefs(useAuthStore());

const {
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  addons,
} = toRefs(usePlanStore());

const {
  activeTabIndex,
  destinationProductSettings,
  destinationVariantSettings,
  fetchSettings,
  isSafetyNetModified,
  loading,
  safetyNetQuantity,
  settingsUpdated,
  sourceProductSettings,
  sourceVariantSettings,
  stringifyDestinationProductSettings,
  stringifyDestinationVariantSettings,
  stringifySourceProductSettings,
  stringifySourceVariantSettings,
  updateSafetyNet,
  updateSettings,
} = toRefs(useProductSettingsStore());

const forceLeavingPage = ref(false);
const router = useRouter();
const routeTo = ref(null);

/* ----- Mounted ----- */
onMounted(async () => {
  if (!addons.value.isSettingsModuleAvailable && isDestinationStore.value) {
    router.push({
      path: routes.DASHBOARD,
      query: { showUpgrade: 'true', type: 'product-settings' },
    });
    return;
  }
  await fetchSettings.value();
});

/* ----- Before Route Leave ----- */
onBeforeRouteLeave((to, from, next) => {
  if(settingsUpdated.value && !forceLeavingPage.value) {
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

const resetLeavePageConfigs = () => {
  forceLeavingPage.value = showLeavingPageDialog.value = settingsUpdated.value = false;
};

const leaveCurrentPageHandler = () => {
  if (routeTo.value) {
    forceLeavingPage.value = true;
    router.push(routeTo.value);
    showLeavingPageDialog.value = false;
    destinationProductSettings.value = JSON.parse(stringifyDestinationProductSettings.value);
    destinationVariantSettings.value = JSON.parse(stringifyDestinationVariantSettings.value);
    sourceProductSettings.value = JSON.parse(stringifySourceProductSettings.value);
    sourceVariantSettings.value = JSON.parse(stringifySourceVariantSettings.value);
  }
};

const updateSourceStoreSettings = async (isSafetyNetActive, configurations) => {
  // Update all other settings as is
  if (!isSafetyNetModified.value) {
    await updateSettings.value(configurations);
  } else {
    if (isSafetyNetActive) {
      await updateSettings.value(configurations);
      await updateSafetyNet.value(safetyNetQuantity.value ?? 0);
    } else {
      safetyNetQuantity.value = null;
      await updateSafetyNet.value(0);
      await updateSettings.value(configurations);
    }
  }
  // Reset to false
  isSafetyNetModified.value = false;
};

const updateSettingsHandler = async () => {
  let payload = [];
  if(isDestinationStore.value) {
    payload = [...destinationProductSettings.value, ...destinationVariantSettings.value];
  } else if (isSourceStore.value) {
    payload = [...sourceProductSettings.value, ...sourceVariantSettings.value];
  }

  let isSafetyNetActive = false;

  const configurations = payload.map(({ key, is_active }) => {
    if (key === 'inventory_safety_net_sync') {
      isSafetyNetActive = is_active;
    }
    return { key, is_active };
  });

  if (isDestinationStore.value) {
    await updateSettings.value(configurations);
  } else { // Source store
    await updateSourceStoreSettings(isSafetyNetActive, configurations);
  }

  await fetchSettings.value();
  resetLeavePageConfigs();
};
</script>

<template>
  <PageHeader title="Product Settings" withActions withLink>
    <template #header>
      Manage what information syncs from your Source store <br>
      <AppLink link="https://help.syncio.co/en/articles/3704617-product-settings-add-on" label="Learn about Product Settings" />
    </template>
    <template #actions>
      <Button
        :class="{ 'p-button-lg': settingsUpdated }"
        :disabled="!settingsUpdated"
        :loading="loading"
        @click="updateSettingsHandler"
        label="Save changes">
      </Button>
    </template>
  </PageHeader>

  <p v-if="isDestinationStore" class="m-0 pt-1">
    For support with the following, contact our friendly team via the in-app chat: <strong>Tag Mirror </strong>(syncs Source store deletion of tags), <strong>sync of the Barcode field</strong> and <strong>disable Stock Sync</strong>.
  </p>

  <TabView v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4 margin-bottom">
    <TabPanel header="Product">
      <template v-if="activeTabIndex === 0">
        <ProductSkeleton v-if="loading" />
        <Product v-else />
      </template>
    </TabPanel>
    <TabPanel header="Variant">
      <template v-if="activeTabIndex === 1">
        <VariantSkeleton v-if="loading" />
        <Variant v-else />
      </template>
    </TabPanel>
  </TabView>

  <LeavingPageDialog
    :isDialogVisible="settingsUpdated"
    @leaveCurrentPage="leaveCurrentPageHandler">
  </LeavingPageDialog>
</template>
