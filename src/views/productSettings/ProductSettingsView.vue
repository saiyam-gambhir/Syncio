<script setup>
import { useProductsStore } from '@/stores/products'

/* ===== COMPONENTS ===== */
import PageHeader from '@/components/shared/PageHeader.vue'
import { onMounted } from 'vue'

/* ===== DATA ===== */
const products = useProductsStore()

/* ===== MOUNTED ===== */
onMounted(async  () => {
	await products.fetchSettings()
})
</script>

<template>
	<PageHeader
		content="Manage how your products sync with your connected store"
		title="Product Settings">
	</PageHeader>

	<section class="mt-4">
		{{ products.configrations }}
	</section>
</template>
