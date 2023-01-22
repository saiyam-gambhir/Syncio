<template>
  <DataTable :value="[{},{},{},{},{},{},{},{},{}]" responsiveLayout="scroll" class="shadow-2" showGridlines>
    <Column header="Store" :sortable="true" style="width: 35%;">
      <template #body>
        <Skeleton height="26px" />
      </template>
    </Column>
    <Column  header="Commission" style="width: 10%;">
      <template #body>
        <Skeleton height="26px" />
      </template>
    </Column>
    <Column  header="Status" style="width: 10%;">
      <template #body>
        <Skeleton width="62px" height="26px" borderRadius="20px" />
      </template>
    </Column>
    <Column header="Assigned Locations" style="width: 30%;">
      <template #body>
        <Skeleton height="39px" />
      </template>
    </Column>
    <Column header="Actions" style="width: 15%;" class="text-right">
      <template #body>
        <Skeleton width="40px" height="26px" style="float: right;" />
      </template>
    </Column>
  </DataTable>
</template>
