<script setup>
import { useAuthStore } from 'auth';
import { useConnectionsStore } from 'connections';
import { usePayouts } from './composables/payouts';
import { usePayoutsStore } from 'payouts';

/* ----- Components ----- */
const PayableOrders = defineAsyncComponent(() => import('./components/destinationPayouts/PayableOrders.vue'));

/* ----- Data ----- */
const { activeTabIndex } = toRefs(usePayoutsStore());
const { fetchPayableOrdersHandler, fetchPaidPayoutsHandler } = usePayouts();
const { isDestinationStore, isSourceStore } = useConnectionsStore();
const auth = useAuthStore();
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if (!auth.addons.isPayoutsModuleAvailable) {
    router.push({
      path: '/',
      query: { showUpgrade: 'true', type: 'payouts' },
    });
    return;
  }

  await fetchPayableOrdersHandler();
  await fetchPaidPayoutsHandler();
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
