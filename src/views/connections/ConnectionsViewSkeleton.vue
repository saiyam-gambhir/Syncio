<script setup>
import { useConnectionsStore } from '@/stores/connections'

const getSortIcon = () => {
  const { sortByDesc } = connections.filters
  if(sortByDesc === null) return 'pi-sort-alt'
  else if(sortByDesc === false) return 'pi-sort-amount-up-alt'
  else if(sortByDesc === true) return 'pi-sort-amount-down-alt'
}

/* ===== DATA ===== */
const connections = useConnectionsStore()
</script>
<template>
  <DataTable :value="[{},{},{},{},{}]" responsiveLayout="scroll" class="shadow-2" showGridlines>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <InputText v-model="connections.filters.searchString" placeholder="Search by store URL"/>
          <Button icon="pi pi-search" @click="connections.fetchConnections" />
        </div>
      </div>
    </template>

    <Column style="width: 35%;">
      <template #header>
        <div class="custom-sort">
          Store Url <i class="pi ml-2" :class="getSortIcon()"></i>
        </div>
      </template>
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
