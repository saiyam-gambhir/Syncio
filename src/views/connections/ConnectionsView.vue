<script setup>
import { onMounted, ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'
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
	await connectionsStore.fetchConnections({
		current_store_id: connectionsStore.storeId,
		search_str: null
	})
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
    <DataTable :value="connectionsStore.connections">
      <Column header="Store" style="width: 30%;">
        <template #body="{ data }">
          {{ data.store_domain }}
        </template>
      </Column>
      <Column header="Status" style="width: 15%;">
        <template #body="{ data }">
          <Tag :severity="getStoreStatus(data.status)" rounded>{{ data.status }}</Tag>
        </template>
      </Column>
      <Column header="Commission" style="width: 15%;">
        <template #body>
          None
        </template>
      </Column>
      <Column header="Assigned Locations" style="width: 30%;">
        <template #body>
          All Locations
        </template>
      </Column>
      <Column header="Actions" style="width: 10%;" class="text-right">
        <template #body>
          <SpeedDial class="position-relative" aria-label="Options" :model="storeActions" direction="left" showIcon="pi pi-ellipsis-h" buttonClass="p-button-icon-only p-button-rounded p-button-text" :rotateAnimation="false" style="width: max-content;" />
        </template>
      </Column>
    </DataTable>
	</article>
</template>
