<script setup>
/* ----- Data ----- */
const {
  randomInteger
} = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <SourcePayoutsHeader />
    </template>

    <Column header="Date (AEST)" style="width: 12.5%">
      <template #body>
        <Skeleton :width="`${randomInteger(50, 90)}%`" height="16px" />
      </template>
    </Column>

    <Column header="Payout Id" style="width: 12.5%" class="text-center">
      <template #body>
        <Skeleton width="35px" height="16px" class="mx-auto" />
      </template>
    </Column>

    <Column header="Store" style="width: 30%">
      <template #body>
        <Skeleton :width="`${randomInteger()}%`" height="16px" />
      </template>
    </Column>

    <Column header="Payment Status" style="width: 10%">
      <template #body>
        <Skeleton :width="`${randomInteger(40, 60)}%`" height="29px" borderRadius="20px" />
      </template>
    </Column>

    <Column header="Amount" style="width: 10%">
      <template #body>
        <Skeleton width="50px" height="16px" />
      </template>
    </Column>

    <Column header="Actions" class="flex justify-content-end">
      <template #body>
        <div class="flex justify-content-end">
          <Skeleton width="131px" height="32.5px" />
          <Skeleton width="116px" height="32.5px" class="ml-2" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
