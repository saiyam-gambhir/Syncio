<script setup>
import { useFilters } from '@/composables/filters';
import { usePayouts } from '../../../composables/payouts';
import { usePayoutsStore } from 'payouts';
import * as routes from '@/routes';
import DestinationPayoutsHeader from '../DestinationPayoutsHeader.vue';

/* ----- Components ----- */
const PayoutOrders = defineAsyncComponent(() => import('../payoutOrders/PayoutOrders.vue'));

/* ----- Data ----- */
const {
  formatCommission,
  formatCurrency,
} = useFilters();

const {
  fetchPayableOrdersHandler,
  fetchPayoutOrdersHandler,
} = usePayouts();

const {
  arePayableOrdersVisible,
  payableOrders,
} = toRefs(usePayoutsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchPayableOrdersHandler();
});
</script>

<template>
  <section class="payable-orders" v-if="arePayableOrdersVisible">
    <PayableOrdersSkeleton v-if="payableOrders.loading" />

    <DataTable v-else :value="payableOrders?.items" responsiveLayout="scroll" showGridlines>
      <template #empty>
        <div class="px-4 py-8 text-center">
          <h2 class="mt-0 mb-4">You have no payouts to review at this time.</h2>
          <p>Payable orders will show when a pushed order has been fulfilled by the source store.</p>
          <p>
            To create a payout, you will need to set up commission for your store. Go to
            <router-link :to="routes.PAYOUTS_SETTINGS" class="btn-link">Commission settings</router-link>
            to get started.
          </p>
          <AppLink link="https://help.syncio.co/en/articles/6398970-payouts-add-on-destination-store-side" label="Learn more about payouts" />
        </div>
      </template>

      <template #header>
        <DestinationPayoutsHeader />
      </template>

      <Column header="Source store" style="width: 32.5%">
        <template #body="{ data: { store_name } }">
          {{ store_name }}
        </template>
      </Column>

      <Column header="Unpaid orders" style="width: 12%;" class="text-center">
        <template #body="{ data: { unpaid_orders } }">
          <Tag severity="info">{{ unpaid_orders }}</Tag>
        </template>
      </Column>

      <Column header="Total sales" style="width: 14%">
        <template #body="{ data: { total_sales } }">
          <span class="tabular-nums">
            {{ formatCurrency(total_sales) }}
          </span>
        </template>
      </Column>

      <Column header="Total commissions" style="width: 13%">
        <template #body="{ data: { commission_type, total_commissions } }">
          <span class="tabular-nums">
            {{ formatCommission(commission_type, total_commissions) }}
          </span>
        </template>
      </Column>

      <Column header="Payout amount" style="width: 12%">
        <template #body="{ data: { payout_amount } }">
          <strong class="tabular-nums">{{ formatCurrency(payout_amount) }}</strong>
        </template>
      </Column>

      <Column header="Actions" style="width: 16.5%" class="text-right">
        <template #body="{ data: { id } }">
          <Button
            @click="fetchPayoutOrdersHandler(id)"
            class="p-button-sm"
            label="View details"
            outlined>
          </Button>
        </template>
      </Column>
    </DataTable>
  </section>

  <section v-else>
    <PayoutOrders />
  </section>
</template>
