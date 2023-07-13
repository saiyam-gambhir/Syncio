<script setup>
import { defineAsyncComponent, onMounted, toRefs } from 'vue';
import { useActivities } from './composables/activities';
import { useActivityCenterStore } from '@/stores/activityCenter';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
const GeneralUpdates = defineAsyncComponent(() => import('@/views/activityCenter/components/GeneralUpdates/GeneralUpdates.vue'));
const OrderIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/OrderIssues/OrderIssues.vue'));
const ProductIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/ProductIssues/ProductIssues.vue'));
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
const { activeTabIndex } = toRefs(useActivityCenterStore());
const { fetchActivitiesHandler } = useActivities();
const { connections, fetchConnections } = toRefs(useConnectionsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  fetchActivitiesHandler();
  if (connections.value.length === 0) await fetchConnections.value();
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

  <TabView @update:activeIndex="handleTabChange" class="mt-4">
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
