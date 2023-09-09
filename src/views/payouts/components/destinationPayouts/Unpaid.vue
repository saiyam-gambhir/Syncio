<script setup>
import { useFilters } from '@/composables/filters';
import { usePayouts } from '../../composables/payouts';

/* ----- Data ----- */
const {
  fetchUnpaidPayoutsHandler,
  payouts,
  updatePayoutHandler,
} = usePayouts();

const {
  formatCurrency,
} = useFilters();

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchUnpaidPayoutsHandler();
});
</script>

<template>
  <DataTable :value="payouts.unpaidPayouts?.items" responsiveLayout="scroll" showGridlines>
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

    <Column header="Amount" style="width: 14%" class="text-right">
      <template #body="{ data: { payout_total } }">
        <span class="tabular-nums">
          {{ formatCurrency(payout_total) }}
        </span>
      </template>
    </Column>

    <Column header="Payment Status" style="width: 14%" class="text-center">
      <template #body="{ data: { status } }">
        <Tag severity="warning" rounded>{{ status === 'payout_created' ? 'Unpaid' : '' }}</Tag>
      </template>
    </Column>

    <Column header="Actions" style="width: 16.5%" class="text-right">
      <template #body="{ data: { payout_id } }">
        <Button
          @click="updatePayoutHandler(payout_id, 'paid')"
          class="p-button-sm p-button-success"
          label="Mark as paid">
        </Button>

        <Button
          class="p-button-sm ml-2"
          label="Manage payout"
          outlined>
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
