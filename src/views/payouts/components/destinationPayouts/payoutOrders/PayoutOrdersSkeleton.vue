<script setup>
import { useFilters } from '@/composables/filters';

/* ----- Data ----- */
const {
  randomInteger
} = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="text-lg p-2 flex align-items-center">
        <span class="pr-3 pointer flex align-items-center">
          <i class="pi pi-arrow-left mr-2"></i> Stores
        </span>
        <span class="font-light text-xl">|</span>
        <span class="font-light pl-3">Payable orders for</span>
        <Skeleton class="ml-2" width="250px" height="18px" />
      </div>
    </template>

    <Column style="width: 5%">
      <template #body>
        <CheckboxWrapper />
      </template>
    </Column>

    <Column header="Date" style="width: 15%">
      <template #body>
        <Skeleton :width="`${randomInteger()}%`" height="16px" />
      </template>
    </Column>

    <Column header="Age" style="width: 12.5%;">
      <template #body>
        <Skeleton width="75px" height="16px" />
      </template>
    </Column>

    <Column header="Order #" style="width: 12.5%">
      <template #body>
        <Skeleton width="90px" height="16px" />
      </template>
    </Column>

    <Column header="Sales" style="width: 12.5%">
      <template #body>
        <Skeleton width="75px" height="16px" />
      </template>
    </Column>

    <Column header="Commission" style="width: 12.5%">
      <template #body>
        <Skeleton width="75px" height="16px" />
      </template>
    </Column>

    <Column header="Payout amount" style="width: 12.5%">
      <template #body>
        <Skeleton width="75px" height="16px" />
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%" class="text-right">
      <template #body>
        <Skeleton width="110px" height="32.5px" borderRadius="8px" class="ml-auto" />
      </template>
    </Column>
  </DataTable>
</template>
