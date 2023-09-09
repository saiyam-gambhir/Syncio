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

    <Column header="Unpaid orders" style="width: 12%;" class="text-center">
      <template #body="{ data: { unpaid_orders } }">
        <Tag severity="info">{{ unpaid_orders }}</Tag>
      </template>
    </Column>

    <Column header="Total sales" style="width: 14%" class="text-right">
      <template #body="{ data: { total_sales } }">
        <span class="tabular-nums">
          {{ formatCurrency(total_sales) }}
        </span>
      </template>
    </Column>

    <Column header="Total commissions" style="width: 13%" class="text-right">
      <template #body="{ data: { commission_type, total_commissions } }">
        <span class="tabular-nums">
          {{ formatCommission(commission_type, total_commissions) }}
        </span>
      </template>
    </Column>

    <Column header="Payout amount" style="width: 12%" class="text-right">
      <template #body="{ data: { payout_amount } }">
        <strong class="tabular-nums">{{ formatCurrency(payout_amount) }}</strong>
      </template>
    </Column>

    <Column header="Actions" style="width: 16.5%" class="text-right">
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
