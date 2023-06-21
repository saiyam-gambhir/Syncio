<script setup>
import { useFilters } from '@/composables/filters';

/* ----- Data ----- */
const { randomInteger } = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}, {}]" responsiveLayout="scroll" showGridlines class="mt-4">
    <Column selectionMode="multiple"></Column>

    <Column header="Order #" style="width: 10%">
      <template #body>
        <Skeleton height="26px" width="75px" />
      </template>
    </Column>

    <Column header="Date" style="width: 20%">
      <template #body>
        <Skeleton height="26px" />
      </template>
    </Column>

    <Column header="Customer" style="width: 35%">
      <template #body>
        <Skeleton height="26px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Push Status" style="width: 15%">
      <template #body>
        <Skeleton width="75px" height="26px" borderRadius="20px" />
      </template>
    </Column>

    <Column header="Synced Items" style="width: 10%">
      <template #body>
        <Skeleton height="26px" />
      </template>
    </Column>

    <Column header="Actions" style="width: 10%" class="text-right">
      <template #body>
        <Skeleton size="40px" shape="circle" style="float: right" />
      </template>
    </Column>
  </DataTable>
</template>
