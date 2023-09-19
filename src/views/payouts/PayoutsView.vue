<script setup>
import { useConnectionsStore } from 'connections';
import { usePayouts } from './composables/payouts';
import { usePayoutsStore } from 'payouts';
import { usePlanStore } from 'plan';
import * as routes from '@/routes';

/* ----- Components ----- */
const Complete = defineAsyncComponent(() => import('./components/sourcePayouts/Complete.vue'));
const Open = defineAsyncComponent(() => import('./components/sourcePayouts/Open.vue'));
const Paid = defineAsyncComponent(() => import('./components/destinationPayouts/Paid.vue'));
const PaidSkeleton = defineAsyncComponent(() => import('./components/destinationPayouts/PaidSkeleton.vue'));
const PayableOrders = defineAsyncComponent(() => import('./components/destinationPayouts/PayableOrders.vue'));
const PayableOrdersSkeleton = defineAsyncComponent(() => import('./components/destinationPayouts/PayableOrdersSkeleton.vue'));
const Unpaid = defineAsyncComponent(() => import('./components/destinationPayouts/Unpaid.vue'));

/* ----- Data ----- */
const {
  isDestinationStore,
  isSourceStore
} = toRefs(useConnectionsStore());

const {
  activeTabIndex,
  payableOrders,
  paidPayouts,
  unpaidPayouts,
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
        <PayableOrdersSkeleton v-if="payableOrders.loading" />
        <PayableOrders v-show="!payableOrders.loading" />
      </template>
    </TabPanel>

    <TabPanel header="Unpaid">
      <template v-if="activeTabIndex === 1">
        <PaidSkeleton v-if="unpaidPayouts.loading" />
        <Unpaid v-show="!unpaidPayouts.loading" />
      </template>
    </TabPanel>

    <TabPanel header="Paid">
      <template v-if="activeTabIndex === 2">
        <PaidSkeleton v-if="paidPayouts.loading" />
        <Paid v-show="!paidPayouts.loading" />
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
</template>
