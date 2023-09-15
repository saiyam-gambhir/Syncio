<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <Column header="Source store" style="width: 32.5%">
      <template #body>
        <Skeleton width="50%" height="21px" />
      </template>
    </Column>

    <Column header="Unpaid orders" style="width: 12%;" class="text-center">
      <template #body>
        <Skeleton width="32.75px" height="29px" class="mx-auto" />
      </template>
    </Column>

    <Column header="Total sales" style="width: 14%" class="text-right">
      <template #body>
        <Skeleton width="60px" height="16px" class="ml-auto" />
      </template>
    </Column>

    <Column header="Total commissions" style="width: 13%" class="text-right">
      <template #body>
        <Skeleton width="60px" height="16px" class="ml-auto" />
      </template>
    </Column>

    <Column header="Payout amount" style="width: 12%" class="text-right">
      <template #body>
        <Skeleton width="60px" height="16px" class="ml-auto" />
      </template>
    </Column>

    <Column header="Actions" style="width: 16.5%" class="text-right">
      <template #body>
        <Skeleton width="98.3px" height="32.5px" borderRadius="8px" class="ml-auto" />
      </template>
    </Column>
  </DataTable>
</template>
