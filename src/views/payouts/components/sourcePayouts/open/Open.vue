<script setup>
import { usePayouts } from '../../../composables/payouts';

/* ----- Data ----- */
const {
  fetchSourcePayoutsHandler,
  payouts,
  updatePayoutHandler,
} = usePayouts();

const {
  formatCurrency,
} = useFilters();

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchSourcePayoutsHandler('not_confirmed');
});
</script>

<template>
  <DataTable :value="payouts.openPayouts?.items" responsiveLayout="scroll" showGridlines>
    <Column header="Date" style="width: 10%">
      <template #body="{ data: { date } }">
        {{ date }}
      </template>
    </Column>

    <Column header="Payout Id" style="width: 10%" class="text-center">
      <template #body="{ data: { payout_id } }">
        <strong>{{ payout_id }}</strong>
      </template>
    </Column>

    <Column header="Store" style="width: 20%">
      <template #body="{ data: { store_name } }">
        {{ store_name }}
      </template>
    </Column>

    <Column header="Payment Status" style="width: 14%">
      <template #body="{ data: { status } }">
        <Tag v-if="status === 'paid'" severity="success" rounded>
          <StatusIcon />
          {{ status }}
        </Tag>
        <Tag v-else-if="status === 'payout_created'" severity="warning" rounded>
          <StatusIcon />
          Unpaid
        </Tag>
      </template>
    </Column>

    <Column header="Amount" style="width: 8%" class="text-right">
      <template #body="{ data: { payout_total } }">
        <span class="tabular-nums">
          {{ formatCurrency(payout_total) }}
        </span>
      </template>
    </Column>

    <Column header="Actions" style="width: 22.5%" class="text-right">
      <template #body="{ data: { payout_id } }">
        <Button
          @click="updatePayoutHandler(payout_id, 'payment_received')"
          class="p-button-sm p-button-success"
          label="Mark as received">
        </Button>

        <Button
          class="p-button-sm ml-2"
          label="View payout"
          outlined>
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
