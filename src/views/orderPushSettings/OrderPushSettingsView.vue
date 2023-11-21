<script setup>
/* ----- Components ----- */
const EmailContact = defineAsyncComponent(() => import('./components/EmailContact.vue'));
const ShippingRulesRates = defineAsyncComponent(() => import('./components/ShippingRulesRates.vue'));
const ShippingTypeTags = defineAsyncComponent(() => import('./components/ShippingTypeTags.vue'));

/* ----- Data ----- */
const {
  activeTabIndex,
  fetchPushSettings,
} = toRefs(useOrdersStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchPushSettings.value();
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};
</script>

<template>
  <PageHeader content="Manage order push settings" title="Order Push Settings" />

  <section class="mt-4">
    <TabView v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4 margin-bottom">
      <TabPanel header="E-mail contact method">
        <EmailContact v-if="activeTabIndex === 0" />
      </TabPanel>
      <TabPanel header="Shipping rules rates">
        <ShippingRulesRates v-if="activeTabIndex === 1" />
      </TabPanel>
      <TabPanel header="Shipping type tags">
        <ShippingTypeTags v-if="activeTabIndex === 2" />
      </TabPanel>
    </TabView>
  </section>
</template>
