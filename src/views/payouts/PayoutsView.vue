<script setup>
import { useConnectionsStore } from 'connections';
import { usePayouts } from './composables/payouts';
import { usePayoutsStore } from 'payouts';
import { usePlanStore } from 'plan';
import * as routes from '@/routes';
import { watch } from 'vue';

/* ----- Components ----- */
const Complete = defineAsyncComponent(() => import('./components/sourcePayouts/Complete.vue'));
const Open = defineAsyncComponent(() => import('./components/sourcePayouts/Open.vue'));
const Paid = defineAsyncComponent(() => import('./components/destinationPayouts/Paid.vue'));
const PayableOrders = defineAsyncComponent(() => import('./components/destinationPayouts/PayableOrders.vue'));
const Unpaid = defineAsyncComponent(() => import('./components/destinationPayouts/Unpaid.vue'));

/* ----- Data ----- */
const {
  isDestinationStore,
  isSourceStore
} = toRefs(useConnectionsStore());

const {
  activeTabIndex
} = toRefs(usePayoutsStore());

const {
  addons
} = toRefs(usePlanStore());

const {
  fetchPayableOrdersHandler,
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

  if(isDestinationStore.value) await fetchPayableOrdersHandler();
});
</script>

<template>
  <!-- Page Header -->
  <PageHeader content="Manage Payouts for fulfilled orders" title="Payouts" withActions>
    <template #actions>
      <router-link to="/settings/payouts-settings">
        <Button label="Payouts settings" outlined class="ml-4"></Button>
      </router-link>
    </template>
  </PageHeader>

  <!-- Destination Payouts -->
  <TabView v-if="isDestinationStore" v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4">
    <TabPanel header="Payable Orders">
      <PayableOrders v-if="activeTabIndex === 0" />
    </TabPanel>
    <TabPanel header="Unpaid">
      <Unpaid v-if="activeTabIndex === 1" />
    </TabPanel>
    <TabPanel header="Paid">
      <Paid v-if="activeTabIndex === 2" />
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
