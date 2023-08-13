<script setup>
import { onMounted, ref } from 'vue';
import { useOrders } from '../composables/orders';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
const { fetchPushSettings } = useOrders();
const activeTabIndex = ref(0);

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchPushSettings();
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};
</script>

<template>
  <PageHeader content="Manage order push settings" title="Order Push Settings" />

  <section class="mt-4">
    <TabView @update:activeIndex="handleTabChange" class="mt-4 margin-bottom">
      <TabPanel header="E-mail contact method">
      </TabPanel>
      <TabPanel header="Shipping rules rates">
      </TabPanel>
      <TabPanel header="Shipping type tags">
      </TabPanel>
    </TabView>
  </section>
</template>
