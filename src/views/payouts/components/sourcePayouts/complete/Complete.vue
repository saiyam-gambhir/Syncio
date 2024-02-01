<script setup>
/* ----- Data ----- */
const {
  fetchPayoutHandler,
  fetchSourcePayoutsHandler,
  payouts,
} = usePayouts();

const {
  formatCurrency,
} = useFilters();

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchSourcePayoutsHandler('payment_confirmed');
});

/* ----- Methods ----- */
const updateCurrentPageHandler = async page => {
  await fetchSourcePayoutsHandler('payment_confirmed', page);
};
</script>

<template>
  <CompleteSkeleton v-if="payouts.completePayouts?.loading" />

  <DataTable v-else :value="payouts.completePayouts?.items" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="mt-0 mb-4">You have no payouts to review at this time.</h2>
        <p>Payouts will show when you mark a pushed order as fulfilled and <br> when your destination store partner creates a payout.</p>
        <AppLink link="https://help.syncio.co/en/articles/6402438-payouts-add-on-source-store-side" label="Learn more about payouts" />
      </div>
    </template>

    <template #header>
      <SourcePayoutsHeader />
    </template>

    <Column header="Date (AEST)" style="width: 12.5%">
      <template #body="{ data: { date } }">
        {{ date }}
      </template>
    </Column>

    <Column header="Payout Id" style="width: 12.5%" class="text-center">
      <template #body="{ data: { payout_id } }">
        <strong>{{ payout_id }}</strong>
      </template>
    </Column>

    <Column header="Store" style="width: 30%">
      <template #body="{ data: { store_name } }">
        {{ store_name }}
      </template>
    </Column>

    <Column header="Payment Status" style="width: 15%">
      <template #body="{ data: { status } }">
        <Tag v-if="status === 'payment_confirmed'" severity="success" rounded>
          <StatusIcon />
          Received
        </Tag>
      </template>
    </Column>

    <Column header="Amount" style="width: 15%">
      <template #body="{ data: { payout_total } }">
        <span class="tabular-nums">
          {{ formatCurrency(payout_total) }}
        </span>
      </template>
    </Column>

    <Column header="Actions" style="width: 15%" class="text-right">
      <template #body="{ data: { payout_id, target_store_id } }">
        <Button
          @click="fetchPayoutHandler(payout_id, target_store_id)"
          class="p-button-sm ml-2"
          label="View payout"
          outlined>
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="payouts.completePayouts.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="payouts.completePayouts?.pagination">
  </Pagination>
</template>
