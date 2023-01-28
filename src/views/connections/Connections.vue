<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useFilters } from '../../composables/filters'

/* ===== COMPONENTS ===== */
import IconShopifyVue from '@/icons/IconShopify.vue'
import IconWoo from '@/icons/IconWoo.vue'
import DestinationLocationSelector from '@/views/connections/components/multiLocation/DestinationLocationSelector.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const { formatCurrency } = useFilters()

/* ===== METHODS ===== */
const showSetCommissionDialog = (connection) => {
  connectionsStore.selectedConnection = connection
  connectionsStore.isSetCommissionRequested = true
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
  connectionsStore.selectedConnection = connection
  connectionsStore.isConnectionDisconnectRequested = true
}
</script>

<template>
  <DataTable :value="connectionsStore.connections" responsiveLayout="scroll" showGridlines>

    <Column header="Store" style="width: 35%;" :sortable="true">
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

    <Column header="Assigned Location" style="width: 30%;">
      <template #body="{ data: connection }" v-if="connectionsStore.isMultilocation">
        <DestinationLocationSelector :connection="connection" />
      </template>
    </Column>

    <Column header="Actions" style="width: 15%;" class="text-right">
      <template #body="{ data: connection }">
        <Button icon="pi pi-list" class="p-button-rounded p-button-outlined p-button-info" v-tooltip.top="'Products'" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger ml-3" v-tooltip.top="'Disconnect'" @click="showDisconnectStoreDialog(connection)" />
      </template>
    </Column>

  </DataTable>
</template>
