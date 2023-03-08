<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

/* ===== COMPONENTS ===== */
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const auth = useAuthStore()
const router = useRouter()

/* ===== MOUNTED ===== */
onMounted(() => {
	if(!auth.isOrderModuleAvailable) {
    router.push({ path: '/', query: { showUpgrade: 'true', type: 'payouts' }})
    return
  }
})
</script>

<template>
	<PageHeader
		content="Manage Payouts for fulfilled orders"
		title="Payouts">
	</PageHeader>
</template>
