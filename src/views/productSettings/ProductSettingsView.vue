<script setup>
import { useAuthStore } from 'auth';
import { useConnectionsStore } from 'connections';
import { usePlanStore } from 'plan';
import { useProductSettingsStore } from 'productSettings';
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
  loading,
  settingsUpdated,
  sourceProductSettings,
  sourceVariantSettings,
  stringifyDestinationProductSettings,
  stringifyDestinationVariantSettings,
  stringifySourceProductSettings,
  stringifysourceVariantSettings,
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
    sourceVariantSettings.value = JSON.parse(stringifysourceVariantSettings.value);
  }
};

const updateSettingsHandler = async () => {
  let payload = [];
  if(isDestinationStore.value) {
    payload = [...destinationProductSettings.value, ...destinationVariantSettings.value];
  } else if (isSourceStore.value) {
    payload = [...sourceProductSettings.value, ...sourceVariantSettings.value];
  }

  const configrations = payload.map(({ key, is_active }) => {
    return { key, is_active };
  });
  await updateSettings.value(configrations);
  resetLeavePageConfigs();
}
</script>

<template>
  <PageHeader
    content="Manage what information syncs from your Source store"
    title="Product Settings"
    withActions>
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
