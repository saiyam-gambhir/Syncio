<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useFilters } from '../../composables/filters'

/* ===== COMPONENTS ===== */
import DestinationLocationSelector from '@/views/connections/components/multiLocation/DestinationLocationSelector.vue'
import IconShopifyVue from '@/icons/IconShopify.vue'
import IconWoo from '@/icons/IconWoo.vue'

/* ===== DATA ===== */
const connections = useConnectionsStore()
const { formatCurrency } = useFilters()

/* ===== METHODS ===== */
const showSetCommissionDialog = (connection) => {
  connections.selectedConnection = connection
  connections.isSetCommissionRequested = true
}

const getStoreCommission = (commission) => {
  if(!commission) return 'None'
  if(commission.type === 'percentage') return `${commission.value}%`
  if(commission.type === 'flat_rate') return formatCurrency(commission.value)
}

const getStoreStatus = (status) => {
  return status === 'active' ? 'success' : 'danger'
}

const showDisconnectStoreDialog = (connection) => {
  connections.selectedConnection = connection
  connections.isConnectionDisconnectRequested = true
}

const fetchConnectionsHandler = async () => {
  await connections.fetchConnections()
  document.querySelector('#searchInput').focus()
}

const sortConnectionsHandler = async (sortField) => {
  connections.filters.sortByDesc = !connections.filters.sortByDesc
  connections.filters.sortBy = sortField
  await connections.fetchConnections()
}

const getSortIcon = () => {
  const { sortByDesc } = connections.filters
  if(sortByDesc === null) return 'pi-sort-alt'
  else if(sortByDesc === false) return 'pi-sort-amount-up-alt'
  else if(sortByDesc === true) return 'pi-sort-amount-down-alt'
}
</script>

<template>
  <DataTable :value="connections.connections" responsiveLayout="scroll" showGridlines>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <InputText id="searchInput" v-model="connections.filters.searchString" placeholder="Search by store URL" @keyup.enter="fetchConnectionsHandler" autocomplete="off" />
          <Button icon="pi pi-search" @click="fetchConnectionsHandler" />
        </div>
      </div>
    </template>

    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No stores found</h2>
      </div>
    </template>

    <Column style="width: 35%;">
      <template #header>
        <div class="custom-sort" @click="sortConnectionsHandler('store_domain')">
          Store Url <i class="pi ml-2" :class="getSortIcon()"></i>
        </div>
      </template>
      <template #body="{ data: connection }">
        <div class="flex align-items-center">
          <IconShopifyVue v-if="connection.platform === 'shopify'" class="mr-3" />
          <IconWoo v-if="connection.platform === 'woocommerce'" class="mr-3" />
          {{ connection.store_domain }}
        </div>
      </template>
    </Column>

    <Column header="Commission" style="width: 10%;">
      <template #body="{ data: connection }">
        <div class="flex align-items-center justify-content-between">
          {{ getStoreCommission(connection.store_commission) }}
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-outlined ml-2" @click="showSetCommissionDialog(connection)" v-tooltip.left="'Edit'" />
        </div>
      </template>
    </Column>

    <Column header="Status" style="width: 10%;">
      <template #body="{ data: connection }">
        <Tag :severity="getStoreStatus(connection.status)" rounded>{{ connection.status }}</Tag>
      </template>
    </Column>

    <Column header="Assigned Location" style="width: 27.5%;">
      <template #body="{ data: connection }" v-if="connections.isMultilocation">
        <DestinationLocationSelector :connection="connection" />
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%;" class="text-right">
      <template #body="{ data: connection }">
        <Button icon="pi pi-list" class="p-button-rounded p-button-outlined p-button-info" v-tooltip.top="'Products'" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger ml-3" v-tooltip.top="'Disconnect'" @click="showDisconnectStoreDialog(connection)" />
      </template>
    </Column>

  </DataTable>
</template>
