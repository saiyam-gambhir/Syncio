<script setup>
import { useFilters } from '@/composables/filters';
import { usePayoutsStore } from 'payouts';
import { usePayouts } from '../../../composables/payouts';

/* ----- Data ----- */
const {
  formatCommission,
  formatCurrency,
} = useFilters();

const {
  fetchPayoutPreviewHandler
} = usePayouts();

const {
  isCreatePayoutDetailsRequested,
  payoutOrders,
  selectedPayoutOrders,
} = toRefs(usePayoutsStore());

/* ----- Methods ----- */
const isSelected = (row) => {
  if(selectedPayoutOrders.value.includes(row.order_id)) return 'selected';
};

const updateCurrentPageHandler = (page) => {

};
</script>

<template>
  <PayoutOrdersSkeleton v-if="payoutOrders?.loading" />

  <DataTable v-else :value="payoutOrders?.items" responsiveLayout="scroll" showGridlines :rowClass="isSelected">
    <template #header>
      <PayoutOrdersHeader />
    </template>

    <Column style="width: 5%">
      <template #body="{ data }">
        <CheckboxWrapper />
      </template>
    </Column>

    <Column header="Date" style="width: 15%">
      <template #body="{ data: { date } }">
        {{ date }}
      </template>
    </Column>

    <Column header="Age" style="width: 12.5%;">
      <template #body="{ data: { age } }">
        {{ age }}
      </template>
    </Column>

    <Column header="Order #" style="width: 12.5%">
      <template #body="{ data: { order_number } }">
        {{ order_number }}
      </template>
    </Column>

    <Column header="Sales" style="width: 12.5%">
      <template #body="{ data: { sales } }">
        <span class="tabular-nums">
          {{ formatCurrency(sales) }}
        </span>
      </template>
    </Column>

    <Column header="Commission" style="width: 12.5%;">
      <template #body="{ data: { commission, commission_type } }">
        <span class="tabular-nums display-commission">+ {{ formatCommission(commission_type, commission) }}</span>
      </template>
    </Column>

    <Column header="Payout amount" style="width: 12.5%">
      <template #body="{ data: { payout_amount } }">
        <strong class="tabular-nums">{{ formatCurrency(payout_amount) }}</strong>
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%" class="text-right">
      <template #body="{ data: { order_id } }">
        <Button
          @click="fetchPayoutPreviewHandler(order_id)"
          class="p-button-sm p-button-success"
          label="Create payout">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="payoutOrders.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="payoutOrders?.pagination">
  </Pagination>

  <CreatePayout v-if="isCreatePayoutDetailsRequested" />
</template>
