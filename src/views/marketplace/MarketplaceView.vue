<script setup>
import { onMounted, ref } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- COMPONENTS ----- */
import PageHeader from '@/components/shared/PageHeader.vue'
import Profiles from './components/Profiles.vue'
import Search from './components/Search.vue'

/* ----- DATA ----- */
const marketPlace = useMarketPlaceStore()
const loading = ref(false)

onMounted(async () => {
	loading.value = true
	await marketPlace.fetchProfiles()
	setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <PageHeader
		content="Awesome products and long lasting partnerships, all in one place"
		title="Marketplace">
	</PageHeader>

	<Search />
	<Profiles :loading="loading" />
</template>
