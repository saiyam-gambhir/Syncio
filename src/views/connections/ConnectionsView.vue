<script setup>
import { onMounted } from 'vue'
import { useConnectionsStore } from '@/stores/connections'
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const connections = useConnectionsStore()

/* ===== MOUNTED ===== */
onMounted(async () => {
	await connections.fetchConnections({
		current_store_id: connections.currentStoreId,
		search_str: null
	})
})
</script>

<template>
	<PageHeader
		content="Connect and manage your stores."
		title="Stores">
	</PageHeader>
</template>
