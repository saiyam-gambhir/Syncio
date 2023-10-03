<script setup>
import { usePayoutsSettingsStore } from 'payoutsSettings';

/* ----- Components ----- */
const DefaultStoreCommission = defineAsyncComponent(() => import('./components/DefaultStoreCommission.vue'));
const ProductCommission = defineAsyncComponent(() => import('./components/ProductCommission.vue'));
const StoreCommission = defineAsyncComponent(() => import('./components/StoreCommission.vue'));

/* ----- Data ----- */
const {
  activeTabIndex,
} = toRefs(usePayoutsSettingsStore());

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};
</script>

<template>
  <PageHeader
    content="Manage your payouts by shop, store and product"
    title="Payouts Settings">
  </PageHeader>

  <article class="mt-4">
    <!-- <h2>Commissions</h2> -->
    <p class="text-lg line-height-4">
      Commissions will be calculated on sales value; the total amount your customers pay for the product. <br>
      If no Product commissions are set, Syncio will use the Store commission in Payouts calculations for that product. <br>
      Commissions can only be set for <strong>Shopify</strong> stores, as Payouts is not available for <strong>Woocommerce</strong> stores yet.
    </p>

    <TabView v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4">
      <TabPanel header="Your Shop Default">
        <DefaultStoreCommission class="mt-4" v-if="activeTabIndex === 0" />
      </TabPanel>
      <TabPanel header="By Store">
        <StoreCommission v-if="activeTabIndex === 1" />
      </TabPanel>
      <TabPanel header="By Product">
        <ProductCommission v-if="activeTabIndex === 2" />
      </TabPanel>
    </TabView>
  </article>
</template>
