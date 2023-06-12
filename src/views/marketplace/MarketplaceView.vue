<script setup>
import { onMounted, ref } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- Components ----- */
import Profiles from './components/Profiles.vue'
import Search from './components/Search.vue'

/* ----- Data ----- */
const marketPlace = useMarketPlaceStore()
const loading = ref(false)

/* ----- Mounted ----- */
onMounted(async () => {
	await fetchProfilesHandler()
})

/* ----- Methods ----- */
const fetchProfilesHandler = async () => {
	if(marketPlace.profiles) return

	loading.value = true
	await marketPlace.fetchProfiles()
	loading.value = false
}
</script>

<template>
	<section class="marketplace">
		<Search />
		<Profiles :loading="loading" />
	</section>
</template>
