<script setup>
/* ----- Data ----- */
const { randomInteger } = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines class="mt-2">
    <template #header>
      <OrdersViewHeader />
    </template>

    <Column header="" style="width: 3rem; min-width: 42.5px">
      <template #body>
        <CheckboxWrapper :isChecked="false" />
      </template>
    </Column>

    <Column header="Order #" style="width: 12.5%">
      <template #body>
        <Skeleton height="14px" width="75px" />
      </template>
    </Column>

    <Column header="Date (AEST)" style="width: 15%">
      <template #body>
        <Skeleton height="14px" width="75px" />
        <Skeleton height="14px" width="50px" class="mt-2" />
      </template>
    </Column>

    <Column header="Customer" style="width: 25%">
      <template #body>
        <Skeleton height="14px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Push Status" style="width: 22.5%">
      <template #body>
        <Skeleton width="68px" height="27px" borderRadius="20px" />
      </template>
    </Column>

    <Column header="Synced Items" style="width: 10%" class="text-center">
      <template #body>
        <Skeleton height="27px" width="31.75px" class="mx-auto" />
      </template>
    </Column>

    <Column header="Actions" style="width: 15%" class="text-right">
      <template #body>
        <Skeleton height="30.5px" width="96px" class="ml-auto" />
      </template>
    </Column>
  </DataTable>
</template>
