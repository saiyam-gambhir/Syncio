<script setup>
import { useConnectionsStore } from '@/stores/connections'

/* ===== DATA ===== */
const connections = useConnectionsStore()
</script>
<template>
  <DataTable :value="[{},{},{},{},{}]" responsiveLayout="scroll" showGridlines>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <InputText v-model="connections.filters.searchString" placeholder="Search by store URL"/>
          <Button icon="pi pi-search" @click="connections.fetchConnections" :loading="connections.loadingConnections" :disabled="!connections.filters.searchString" />
        </div>

        <Dropdown v-model="connections.filters.sortBy" :options="connections.sortOptions" optionLabel="label" placeholder="Sort by Store" :loading="connections.loadingConnections">
          <template #value>
            Sort by Store
					</template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon"></i>
            </div>
          </template>
        </Dropdown>
      </div>
    </template>

    <Column header="Store" style="width: 35%;">
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
    <Column header="Assigned Location" style="width: 27.5%;">
      <template #body>
        <Skeleton height="39px" />
      </template>
    </Column>
    <Column header="Actions" style="width: 17.5%;" class="text-right">
      <template #body>
        <Skeleton size="40px" shape="circle" style="float: right;" class="ml-3" />
        <Skeleton size="40px" shape="circle" style="float: right;" />
      </template>
    </Column>
  </DataTable>
</template>
