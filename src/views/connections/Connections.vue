<script setup>
import { ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import IconShopifyVue from '@/icons/IconShopify.vue'
import IconWoo from '@/icons/IconWoo.vue'
import DestinationLocationSelector from '@/views/connections/components/multiLocation/DestinationLocationSelector.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const connectionActions = ref([
  { icon: 'pi pi-list', key: 'view_products', label: 'View Products' },
  { icon: 'pi pi-trash', key: 'disconnect', label: 'Disconnect' }
])

/* ===== METHODS ===== */
const showSetCommissionDialog = (connection) => {
  connectionsStore.selectedConnection = connection
  connectionsStore.isSetCommissionRequested = true
}

const getStoreCommission = (commission) => {
  if(!commission) return 'None'
  if(commission.type === 'percentage') return `${commission.value}%`
  if(commission.type === 'flat_rate') return `$${commission.value}`
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
  <DataTable :value="connectionsStore.connections" responsiveLayout="scroll" class="shadow-2" showGridlines>

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

    <Column header="Assigned Locations" style="width: 30%;">
      <template #body="{ data: connection }" v-if="connectionsStore.isMultilocation">
        <DestinationLocationSelector :connection="connection" />
      </template>
    </Column>

    <Column header="Actions" style="width: 15%;" class="text-right">
      <template #body="{ data: connection }">
        <SpeedDial class="position-relative" aria-label="Options" :model="connectionActions" direction="left" showIcon="pi pi-ellipsis-h" buttonClass="p-button-icon-only p-button-rounded p-button-text" :rotateAnimation="false" style="width: max-content;">
          <template #item="{ item }">
            <Button v-if="item.key === 'view_products'" :icon="item.icon" class="p-button-rounded p-button-outlined p-button-info" />
            <Button v-if="item.key === 'disconnect'" :icon="item.icon" class="p-button-rounded p-button-outlined p-button-danger" @click="showDisconnectStoreDialog(connection)" />
          </template>
        </SpeedDial>
      </template>
    </Column>

  </DataTable>
</template>
