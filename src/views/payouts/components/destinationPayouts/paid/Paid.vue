<script setup>
/* ----- Data ----- */
const {
  fetchPaidPayoutsHandler,
  fetchPayoutHandler,
  payouts,
  updatePayoutHandler,
} = usePayouts();

const {
  formatCurrency,
} = useFilters();

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchPaidPayoutsHandler();
});

/* ----- Methods ----- */
const updateCurrentPageHandler = page => {
  fetchPaidPayoutsHandler(page);
};
</script>

<template>
  <PaidSkeleton v-if="payouts.paidPayouts.loading" />

  <DataTable v-else :value="payouts.paidPayouts.items" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="mt-0 mb-4">You have no Paid payouts to show at this time</h2>
        <AppLink link="https://help.syncio.co/en/articles/6398970-payouts-add-on-destination-store-side" label="Learn more about payouts" />
      </div>
    </template>

    <template #header>
      <DestinationPayoutsHeader />
    </template>

    <Column header="Date (AEST)" style="width: 12.5%">
      <template #body="{ data: { date } }">
        {{ date }}
      </template>
    </Column>

    <Column header="Payout Id" style="width: 10%" class="text-center">
      <template #body="{ data: { payout_id } }">
        <strong>{{ payout_id }}</strong>
      </template>
    </Column>

    <Column header="Store" style="width: 30%">
      <template #body="{ data: { store_domain, store_name } }">
        <div v-if="store_name" class="flex flex-column">
          <span class="text-lg">{{ store_name }}</span>
          <span class="text-small">{{ store_domain }}</span>
        </div>
        <div v-else>
          {{ store_domain }}
        </div>
      </template>
    </Column>

    <Column header="Amount" style="width: 12.5%">
      <template #body="{ data: { payout_total } }">
        <span class="tabular-nums">
          {{ formatCurrency(payout_total) }}
        </span>
      </template>
    </Column>

    <Column header="Payment Status" style="width: 15%">
      <template #body="{ data: { status } }">
        <Tag severity="success" rounded>
          <StatusIcon />
          <span v-if="status === 'payment_confirmed'">received</span>
          <span v-else>{{ status }}</span>
        </Tag>
      </template>
    </Column>

    <Column header="Actions" class="flex justify-content-end">
      <template #body="{ data: { payout_id, status, target_store_id } }">
        <Button
          @click="updatePayoutHandler(payout_id, 'unpaid')"
          class="p-button-sm p-button-warning"
          label="Mark as unpaid"
          v-if="status !== 'payment_confirmed'">
        </Button>

        <Button
          @click="fetchPayoutHandler(payout_id, target_store_id)"
          class="p-button-sm ml-2"
          :label="status === 'payment_confirmed' ? 'View payout' : 'Manage payout'"
          outlined
          style="width: 117px;">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="payouts.paidPayouts.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="payouts.paidPayouts?.pagination">
  </Pagination>
</template>
