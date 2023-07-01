<script setup>
import { useConnectionsStore } from '@/stores/connections';

/* ----- Data ----- */
const {
  filters,
  loadingConnections,
  sortOptions
} = useConnectionsStore();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <InputText v-model="filters.searchString" placeholder="Search by store URL" />
          <Button icon="pi pi-search" :loading="loadingConnections"
            :disabled="!filters.searchString"></Button>
        </div>

        <Dropdown v-model="filters.sortBy" :options="sortOptions" optionLabel="label"
          placeholder="Sort by Store" :loading="loadingConnections">
          <template #value> Sort by Store </template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon"></i>
            </div>
          </template>
        </Dropdown>
      </div>
    </template>

    <Column header="Platform" style="width: 5%" class="text-center">
      <template #body>
        <Skeleton size="40px" shape="circle" />
      </template>
    </Column>

    <Column header="Store" style="width: 37.5%">
      <template #body>
        <Skeleton height="26px" />
      </template>
    </Column>

    <Column header="Status" style="width: 10%">
      <template #body>
        <Skeleton width="62px" height="26px" borderRadius="20px" />
      </template>
    </Column>

    <Column header="Assigned Location" style="width: 30%">
      <template #body>
        <Skeleton height="39px" />
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%" class="text-right">
      <template #body>
        <Skeleton size="40px" shape="circle" style="float: right" class="ml-3" />
        <Skeleton size="40px" shape="circle" style="float: right" />
      </template>
    </Column>
  </DataTable>
</template>
