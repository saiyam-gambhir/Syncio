<script setup>
import { useConnectionsStore } from 'connections';
import { usePayouts } from './composables/payouts';
import { usePayoutsStore } from 'payouts';
import { usePlanStore } from 'plan';
import * as routes from '@/routes';

/* ----- Components ----- */
const PayableOrders = defineAsyncComponent(() => import('./components/destinationPayouts/PayableOrders.vue'));

/* ----- Data ----- */
const { activeTabIndex } = toRefs(usePayoutsStore());
const { addons } = toRefs(usePlanStore());
const { fetchPayableOrdersHandler, fetchPaidPayoutsHandler } = toRefs(usePayouts());
const { isDestinationStore, isSourceStore } = toRefs(useConnectionsStore());
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if (!addons.value.isPayoutsModuleAvailable && isDestinationStore.value) {
    router.push({
      path: routes.DASHBOARD,
      query: { showUpgrade: 'true', type: 'payouts' },
    });
    return;
  }

  await fetchPayableOrdersHandler.value();
  await fetchPaidPayoutsHandler.value();
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};
</script>

<template>
  <!-- Page Header -->
  <PageHeader
    content="Manage Payouts for fulfilled orders"
    title="Manage Payouts">
  </PageHeader>

  <!-- Destination Payouts -->
  <TabView v-if="isDestinationStore" @update:activeIndex="handleTabChange" class="mt-4">
    <TabPanel header="Payable Orders">
      <PayableOrders />
    </TabPanel>
    <TabPanel header="Unpaid">
    </TabPanel>
    <TabPanel header="Paid">
    </TabPanel>
  </TabView>

  <!-- Source Payouts -->
  <TabView v-if="isSourceStore" @update:activeIndex="handleTabChange" class="mt-4">
    <TabPanel header="Open">
    </TabPanel>
    <TabPanel header="Complete">
    </TabPanel>
  </TabView>
</template>
