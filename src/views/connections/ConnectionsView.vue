<script setup>
import { onMounted, ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import DestinationLocationSelector from '@/views/connections/components/DestinationLocationSelector.vue'
import IconShopifyVue from '@/icons/IconShopify.vue'
import IconWoo from '@/icons/IconWoo.vue'
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const storeActions = ref([
  {
    label: 'View Products',
    icon: 'pi pi-list',
  },
  {
    label: 'Disconnect',
    icon: 'pi pi-trash',
  }
]);

/* ===== MOUNTED ===== */
onMounted(async () => {
	await connectionsStore.fetchConnections()
})

/* ===== METHODS ===== */
const getStoreStatus = (status) => {
  return status === 'active' ? 'success' : 'danger'
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
      <Column header="Commission" style="width: 15%;">
        <template #body>
          <div class="flex align-items-center">
            None
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-outlined ml-2" />
          </div>
        </template>
      </Column>
      <Column header="Assigned Locations" style="width: 25%;">
        <template #body="{ data }">
          <DestinationLocationSelector :connection="data" />
        </template>
      </Column>
      <Column header="Actions" style="width: 15%;" class="text-right">
        <template #body>
          <SpeedDial class="position-relative" aria-label="Options" :model="storeActions" direction="left" showIcon="pi pi-ellipsis-h" buttonClass="p-button-icon-only p-button-rounded p-button-text" :rotateAnimation="false" style="width: max-content;" />
        </template>
      </Column>
    </DataTable>
	</article>
</template>
