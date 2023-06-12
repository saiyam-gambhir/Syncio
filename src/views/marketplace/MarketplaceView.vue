<script setup>
import { onMounted, ref } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- Components ----- */
import Profiles from './components/Profiles.vue'
import Search from './components/Search.vue'
import MessageDialogs from './components/MessageDialogs.vue'

/* ----- Data ----- */
const marketPlace = useMarketPlaceStore()

/* ----- Mounted ----- */
onMounted(async () => {
	await fetchProfilesHandler()
})

/* ----- Methods ----- */
const fetchProfilesHandler = async () => {
	if(marketPlace.profiles) return

	marketPlace.loading = true
	await marketPlace.fetchProfiles()
	marketPlace.loading = false
}
</script>

<template>
	<section class="marketplace">
		<Search />
		<Profiles />
		<MessageDialogs />
	</section>
</template>
