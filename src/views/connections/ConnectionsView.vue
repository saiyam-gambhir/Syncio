<script setup>
import { onMounted, ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import DestinationLocationSelector from '@/views/connections/components/DestinationLocationSelector.vue'
import DisconnectDialog from '@/views/connections/components/DisconnectDialog.vue'
import IconShopifyVue from '@/icons/IconShopify.vue'
import IconWoo from '@/icons/IconWoo.vue'
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const connectionActions = ref([
  {
    icon: 'pi pi-list',
    key: 'view_products',
    label: 'View Products',
  },
  {
    label: 'Disconnect',
    key: 'disconnect',
    icon: 'pi pi-trash',
  }
])

/* ===== MOUNTED ===== */
onMounted(async () => {
	await connectionsStore.fetchConnections()
})

/* ===== METHODS ===== */
const getStoreStatus = (status) => {
  return status === 'active' ? 'success' : 'danger'
}

const getStoreCommission = (commission) => {
  if(!commission) return 'None'
  if(commission.type === 'percentage') return `${commission.value}%`
  if(commission.type === 'flat_rate') return `$${commission.value}`
}

const showDisconnectStoreDialog = (connection) => {
  connectionsStore.selectedConnection = connection
  connectionsStore.isConnectionDisconnectRequested = true
}
</script>

<template>
	<PageHeader
		content="Connect and manage your stores."
		title="Stores">
	</PageHeader>

	<article class="mt-4">
    <DataTable :value="connectionsStore.connections" responsiveLayout="scroll" class="shadow-2">

      <Column header="Store" style="width: 30%;" :sortable="true">
        <template #body="{ data }">
          <div class="flex align-items-center">
            <IconShopifyVue v-if="data.platform === 'shopify'" class="mr-3" />
            <IconWoo v-if="data.platform === 'woocommerce'" class="mr-3" />
            {{ data.store_domain }}
          </div>
        </template>
      </Column>

      <Column header="Status" style="width: 15%;">
        <template #body="{ data }">
          <Tag :severity="getStoreStatus(data.status)" rounded>{{ data.status }}</Tag>
        </template>
      </Column>

      <Column header="Commission" style="width: 10%;">
        <template #body="{ data }">
          <div class="flex align-items-center justify-content-between">
            {{ getStoreCommission(data.store_commission) }}
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-outlined ml-2" />
          </div>
        </template>
      </Column>

      <Column header="Assigned Locations" style="width: 30%; padding-left: 3rem !important;">
        <template #body="{ data }">
          <DestinationLocationSelector :connection="data" />
        </template>
      </Column>

      <Column header="Actions" style="width: 15%;" class="text-right">
        <template #body="{ data }">
          <SpeedDial class="position-relative" aria-label="Options" :model="connectionActions" direction="left" showIcon="pi pi-ellipsis-h" buttonClass="p-button-icon-only p-button-rounded p-button-text" :rotateAnimation="false" style="width: max-content;">
            <template #item="{ item }">
              <Button v-if="item.key === 'view_products'" :icon="item.icon" class="p-button-rounded p-button-outlined p-button-info" />
              <Button v-if="item.key === 'disconnect'" :icon="item.icon" class="p-button-rounded p-button-outlined p-button-danger" @click="showDisconnectStoreDialog(data)" />
            </template>
          </SpeedDial>
        </template>
      </Column>

    </DataTable>

    <DisconnectDialog />
	</article>
</template>
