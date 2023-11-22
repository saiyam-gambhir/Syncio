<script setup>
/* ----- Data ----- */
const {
  randomInteger
} = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <ConnectionsViewHeader />
    </template>

    <Column header="" style="width: 3%">
      <template #body>
        <CheckboxWrapper />
      </template>
    </Column>

    <Column header="Platform" style="width: 5%" class="text-center">
      <template #body>
        <div class="flex align-items-center justify-content-center">
          <Skeleton width="31px" height="31px" />
        </div>
      </template>
    </Column>

    <Column header="Store" style="width: 40%">
      <template #body>
        <Skeleton height="26px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Commission type" style="width: 20%">
      <template #body>
        <Skeleton height="39px" width="90%" />
      </template>
    </Column>

    <Column header="Rate" style="width: 12.5%">
      <template #body>
        <Skeleton height="39px" />
      </template>
    </Column>

    <Column header="Actions" style="width: 19.5%" class="text-right">
      <template #body>
        <Skeleton width="130px" height="32.5px" borderRadius="8px" style="float: right" />
      </template>
    </Column>
  </DataTable>
</template>
