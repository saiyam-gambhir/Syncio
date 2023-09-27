<script setup>
import { useConnectionsStore } from 'connections';
import { usePayouts } from './composables/payouts';
import { usePayoutsStore } from 'payouts';
import { usePlanStore } from 'plan';
import * as routes from '@/routes';

/* ----- Components ----- */
const Complete = defineAsyncComponent(() => import('./components/sourcePayouts/complete/Complete.vue'));
const Open = defineAsyncComponent(() => import('./components/sourcePayouts/open/Open.vue'));
const Paid = defineAsyncComponent(() => import('./components/destinationPayouts/paid/Paid.vue'));
const PayableOrders = defineAsyncComponent(() => import('./components/destinationPayouts/payableOrders/PayableOrders.vue'));
const Payout = defineAsyncComponent(() => import('./components/payout/Payout.vue'));
const Unpaid = defineAsyncComponent(() => import('./components/destinationPayouts/unpaid/Unpaid.vue'));

/* ----- Data ----- */
const {
  connections,
  fetchConnections,
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  activeTabIndex,
  isViewPayoutDetailsRequested,
  payout,
} = toRefs(usePayoutsStore());

const {
  addons
} = toRefs(usePlanStore());

const {
  handleTabChange,
} = usePayouts();

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

  if (connections.value.length === 0) await fetchConnections.value();
});
</script>

<template>
  <!-- Page Header -->
  <PageHeader content="Manage Payouts for fulfilled orders" title="Payouts" withActions>
    <template #actions>
      <router-link :to="routes.PAYOUTS_SETTINGS">
        <Button label="Payouts settings" outlined class="ml-4"></Button>
      </router-link>
    </template>
  </PageHeader>

  <!-- Destination Payouts -->
  <TabView v-if="isDestinationStore" v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4">
    <TabPanel header="Payable Orders">
      <template v-if="activeTabIndex === 0">
        <PayableOrders />
      </template>
    </TabPanel>

    <TabPanel header="Unpaid">
      <template v-if="activeTabIndex === 1">
        <Unpaid />
      </template>
    </TabPanel>

    <TabPanel header="Paid">
      <template v-if="activeTabIndex === 2">
        <Paid />
      </template>
    </TabPanel>
  </TabView>

  <!-- Source Payouts -->
  <TabView v-if="isSourceStore" v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4">
    <TabPanel header="Open">
      <Open v-if="activeTabIndex === 0" />
    </TabPanel>
    <TabPanel header="Complete">
      <Complete v-if="activeTabIndex === 1" />
    </TabPanel>
  </TabView>

  <!-- Payout -->
  <Payout v-if="isViewPayoutDetailsRequested" :payout="payout" />
</template>
