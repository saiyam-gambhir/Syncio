<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { toRefs } from 'vue';
import { useActivities } from './composables/activities';
import { useActivityCenterStore } from '@/stores/activityCenter';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
const GeneralUpdates = defineAsyncComponent(() => import('@/views/activityCenter/components/GeneralUpdates/GeneralUpdates.vue'));
const OrderIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/OrderIssues/OrderIssues.vue'));
const ProductIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/ProductIssues/ProductIssues.vue'));

/* ----- Data ----- */
const { fetchActivitiesHandler } = useActivities();
const connections = useConnectionsStore();
const { activeTabIndex } = toRefs(useActivityCenterStore());

/* ----- Mounted ----- */
onMounted(async () => {
  fetchActivitiesHandler();
  if (connections.connections.length === 0) await connections.fetchConnections();
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
  await fetchActivitiesHandler();
};
</script>

<template>
  <PageHeader
    content="See what's happening with your syncs, find and fix issues"
    title="Activity Center">
  </PageHeader>

  <TabView @update:activeIndex="handleTabChange">
    <TabPanel header="Product issues">
      <ProductIssues />
    </TabPanel>
    <TabPanel header="Order Issues">
      <OrderIssues />
    </TabPanel>
    <TabPanel header="General updates">
      <GeneralUpdates />
    </TabPanel>
  </TabView>
</template>
