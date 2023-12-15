<script setup>
/* ----- Components ----- */
const GeneralUpdates = defineAsyncComponent(() => import('@/views/activityCenter/components/GeneralUpdates/GeneralUpdates.vue'));
const OrderIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/OrderIssues/OrderIssues.vue'));
const ProductIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/ProductIssues/ProductIssues.vue'));

/* ----- Data ----- */
const { activeTabIndex } = toRefs(useActivityCenterStore());
const { connections, fetchConnections, isDestinationStore } = toRefs(useConnectionsStore());
const { fetchActivitiesHandler } = useActivities();
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if(!isDestinationStore.value) {
    router.push({ path: '/' });
    return;
  }

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

  <TabView v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange">
    <TabPanel header="Product Issues">
      <ProductIssues v-if="activeTabIndex === 0" />
    </TabPanel>
    <TabPanel header="Order Issues">
      <OrderIssues v-if="activeTabIndex === 1" />
    </TabPanel>
    <TabPanel header="General Updates">
      <GeneralUpdates v-if="activeTabIndex === 2" />
    </TabPanel>
  </TabView>
</template>
