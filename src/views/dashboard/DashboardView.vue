<script setup>
import { useConnectionsStore } from '@/stores/connections'
import PageHeader from '@/components/shared/PageHeader.vue'

const connections = useConnectionsStore()
</script>

<template>
	<PageHeader
		content="Get the most out of Syncio so you can focus on growing your business."
		title="Welcome">
	</PageHeader>

	<div class="flex mt-4">
		{{ connections.currentStoreId }}
	</div>
</template>
