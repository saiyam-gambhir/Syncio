<script setup>
import { useFilters } from '@/composables/filters';
import { usePayoutsStore } from 'payouts';

/* ----- Data ----- */
const {
  formatCommission,
  formatCurrency,
} = useFilters();

const {
  payoutOrders,
  selectedPayoutOrdersStoreName,
} = toRefs(usePayoutsStore());
</script>

<template>
  <PayoutOrdersSkeleton v-if="payoutOrders?.loading" />

  <DataTable v-else :value="payoutOrders?.items" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="text-lg p-2">
        <span class="font-light">Payable orders for</span> <span>{{ selectedPayoutOrdersStoreName }}</span>
      </div>
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

    <Column header="Age (Days)" style="width: 12.5%;">
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

    <Column header="Commission" style="width: 12.5%">
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
      <template #body="{}">
        <Button
          class="p-button-sm p-button-success"
          label="Create Payout">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="payoutOrders.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="payoutOrders?.pagination">
  </Pagination>
</template>
