<script setup>
/* ----- Data ----- */
const {
  fetchPayoutHandler,
  fetchSourcePayoutsHandler,
} = usePayouts();

const {
  openPayouts,
  confirmPayout,
} = toRefs(usePayoutsStore());

const {
  formatCurrency,
} = useFilters();

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchSourcePayoutsHandler('not_confirmed');
});

/* ----- Methods ----- */
const updateCurrentPageHandler = async page => {
  await fetchSourcePayoutsHandler('not_confirmed', page);
};
</script>

<template>
  <OpenSkeleton v-if="openPayouts?.loading" />

  <DataTable v-else :value="openPayouts?.items" responsiveLayout="scroll" showGridlines>
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

    <Column header="Payment Status" style="width: 10%">
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

    <Column header="Amount" style="width: 10%">
      <template #body="{ data: { payout_total } }">
        <span class="tabular-nums">
          {{ formatCurrency(payout_total) }}
        </span>
      </template>
    </Column>

    <Column header="Actions" class="flex justify-content-end">
      <template #body="{ data: { payout_id, target_store_id } }">
        <Button
          @click="confirmPayout(payout_id)"
          class="p-button-sm p-button-success"
          label="Payment received">
        </Button>
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
    :pagination="openPayouts.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="openPayouts?.pagination">
  </Pagination>
</template>
