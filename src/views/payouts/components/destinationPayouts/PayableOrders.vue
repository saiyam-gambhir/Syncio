<script setup>
import { useFilters } from '@/composables/filters';
import { usePayouts } from '../../composables/payouts';

/* ----- Data ----- */
const { payouts } = usePayouts();
const { formatCommission, formatCurrency } = useFilters();
</script>

<template>
  <DataTable :value="payouts.payableOrders?.items" responsiveLayout="scroll" showGridlines>
    <Column header="Source store" style="width: 32.5%">
      <template #body="{ data: { store_name } }">
        {{ store_name }}
      </template>
    </Column>

    <Column header="Unpaid orders" style="width: 13.5%">
      <template #body="{ data: { unpaid_orders } }">
        {{ unpaid_orders }}
      </template>
    </Column>

    <Column header="Total sales" style="width: 15.5%">
      <template #body="{ data: { total_sales } }">
        {{ formatCurrency(total_sales) }}
      </template>
    </Column>

    <Column header="Total commissions" style="width: 14.5%">
      <template #body="{ data: { commission_type, total_commissions } }">
        {{ formatCommission(commission_type, total_commissions) }}
      </template>
    </Column>

    <Column header="Payout amount" style="width: 13.5%">
      <template #body="{ data: { payout_amount } }">
        <strong>{{ formatCurrency(payout_amount) }}</strong>
      </template>
    </Column>

    <Column header="Actions" style="width: 10%" class="text-right">
      <template #body="{}">
        <Button
          class="p-button-sm"
          label="View details"
          outlined>
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
