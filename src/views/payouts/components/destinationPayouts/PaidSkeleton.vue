<template>
  <DataTable :value="[{}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <Column header="Date" style="width: 10%">
      <template #body>
        <Skeleton width="50%" height="21px" />
      </template>
    </Column>

    <Column header="Payout Id" style="width: 10%" class="text-center">
      <template #body>
      </template>
    </Column>

    <Column header="Store" style="width: 20%">
      <template #body>
      </template>
    </Column>

    <Column header="Amount" style="width: 14%" class="text-right">
      <template #body>
      </template>
    </Column>

    <Column header="Payment Status" style="width: 14%" class="text-center">
      <template #body>
      </template>
    </Column>

    <Column header="Actions" style="width: 16.5%" class="text-right">
      <template #body>
      </template>
    </Column>
  </DataTable>
</template>
