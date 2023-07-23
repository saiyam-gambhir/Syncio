<script setup>
import { defineAsyncComponent, onMounted, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductSettingsStore } from '@/stores/productSettings';
import { useRouter, onBeforeRouteLeave } from 'vue-router';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
const LeavingPageDialog = defineAsyncComponent(() => import('@/components/shared/LeavingPageDialog.vue'));
const Product = defineAsyncComponent(() => import('./components/Product.vue'));
const ProductSkeleton = defineAsyncComponent(() => import('./components/ProductSkeleton.vue'));
const Variant = defineAsyncComponent(() => import('./components/Variant.vue'));

/* ----- Data ----- */
const { activeTabIndex, fetchSettings, loading, settingsUpdated } = toRefs(useProductSettingsStore());
const { isProductModuleAvailable, showLeavingPageDialog } = toRefs(useAuthStore());
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if (!isProductModuleAvailable.value) {
    router.push({
      path: '/',
      query: { showUpgrade: 'true', type: 'product-settings' },
    });
    return;
  }
  await fetchSettings.value();
});

onBeforeRouteLeave((to, from, next) => {
  if(settingsUpdated.value) {
    showLeavingPageDialog.value = true;
    next(false);
  } else {
    next();
  }
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};
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
        label="Save changes">
      </Button>
    </template>
  </PageHeader>

  <TabView @update:activeIndex="handleTabChange" class="mt-4 margin-bottom">
    <TabPanel header="Product">
      <ProductSkeleton v-if="loading" />
      <Product v-else />
    </TabPanel>
    <TabPanel header="Variant">
      <Variant />
    </TabPanel>
  </TabView>

  <LeavingPageDialog :isDialogVisible="settingsUpdated" />
</template>
