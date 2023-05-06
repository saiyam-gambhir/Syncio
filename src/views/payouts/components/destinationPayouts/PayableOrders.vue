<script setup>
import { useFilters } from '@/composables/filters'
import { usePayouts } from '../../composables/payouts'

/* ----- COMPONENTS ----- */
import DateRangeFilter from '@/components/shared/DateRangeFilter.vue'

/* ----- DATA ----- */
const { payouts } = usePayouts()
const { formatCommission, formatCurrency } = useFilters()
</script>

<template>
  <section class="filters surface-card p-3 flex justify-content-between">
    <DateRangeFilter style="width: 40%" />
  </section>

  <DataTable :value="payouts.payableOrders?.orders" responsiveLayout="scroll" showGridlines>
    <Column header="Source store" style="width: 32.5%;">
      <template #body="{ data: { store_name } }">
        {{ store_name }}
      </template>
    </Column>

    <Column header="Unpaid orders" style="width: 13.5%;">
      <template #body="{ data: { unpaid_orders } }">
        {{ unpaid_orders }}
      </template>
    </Column>

    <Column header="Total sales (excl. tax)" style="width: 15.5%;">
      <template #body="{ data: { total_sales } }">
        {{ formatCurrency(total_sales) }}
      </template>
    </Column>

    <Column header="Total commissions" style="width: 14.5%;">
      <template #body="{ data: { commission_type, commission_value,  } }">
        {{ formatCommission(commission_type, commission_value) }}
      </template>
    </Column>

    <Column header="Payout amount" style="width: 13.5%;">
      <template #body="{ data: { payout_amount } }">
        <strong>{{ formatCurrency(payout_amount) }}</strong>
      </template>
    </Column>

    <Column header="Actions" style="width: 10%;" class="text-right">
      <template #body="{}">
        <Button icon="pi pi-arrow-right" class="p-button-rounded p-button-outlined p-button-info" v-tooltip.top="'View details'"></Button>
      </template>
    </Column>
  </DataTable>
</template>
