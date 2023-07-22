<script setup>
import { defineAsyncComponent, onMounted, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductSettingsStore } from '@/stores/productSettings';
import { useRouter } from 'vue-router';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
import ProductSkeleton from './components/ProductSkeleton.vue';
const Product = defineAsyncComponent(() => import('./components/Product.vue'));
const Variant = defineAsyncComponent(() => import('./components/Variant.vue'));

/* ----- Data ----- */
const { activeTabIndex, fetchSettings, loading, settingsUpdated } = toRefs(useProductSettingsStore());
const { isProductModuleAvailable } = toRefs(useAuthStore());
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
      <Button label="Save changes" :disabled="!settingsUpdated"></Button>
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
</template>
