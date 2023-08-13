<script setup>
import { defineAsyncComponent, onMounted, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductSettingsStore } from '@/stores/productSettings';
import { useRouter, onBeforeRouteLeave } from 'vue-router';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
const LeavingPageDialog = defineAsyncComponent(() => import('@/components/shared/LeavingPageDialog.vue'));
const Product = defineAsyncComponent(() => import('./components/Product.vue'));
const ProductSkeleton = defineAsyncComponent(() => import('./components/ProductSkeleton.vue'));
const Variant = defineAsyncComponent(() => import('./components/Variant.vue'));
const VariantSkeleton = defineAsyncComponent(() => import('./components/VariantSkeleton.vue'));

/* ----- Data ----- */
const { isProductModuleAvailable, showLeavingPageDialog } = toRefs(useAuthStore());
const {
  activeTabIndex,
  destinationProductSettings,
  destinationVariantSettings,
  fetchSettings,
  loading,
  settingsUpdated,
  stringifyDestinationProductSettings,
  stringifyDestinationVariantSettings,
  updateSettings,
} = toRefs(useProductSettingsStore());
const forceLeavingPage = ref(false);
const router = useRouter();
const routeTo = ref(null);

/* ----- Mounted ----- */
onMounted(async () => {
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
  }
};

const updateSettingsHandler = async () => {
  const payload = [...destinationProductSettings.value, ...destinationVariantSettings.value];
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

  <p class="m-0 pt-1">
    For support with the following, contact our friendly team via the in-app chat: <strong>Tag Mirror </strong>(syncs Source store deletion of tags), <strong>sync of the Barcode field</strong>, <strong>disable Stock Sync</strong>, and <strong>broken SKU recovery</strong>.
  </p>

  <TabView @update:activeIndex="handleTabChange" class="mt-4 margin-bottom">
    <TabPanel header="Product">
      <ProductSkeleton v-if="loading" />
      <Product v-else />
    </TabPanel>
    <TabPanel header="Variant">
      <VariantSkeleton v-if="loading" />
      <Variant v-else />
    </TabPanel>
  </TabView>

  <LeavingPageDialog
    :isDialogVisible="settingsUpdated"
    @leaveCurrentPage="leaveCurrentPageHandler">
  </LeavingPageDialog>
</template>
