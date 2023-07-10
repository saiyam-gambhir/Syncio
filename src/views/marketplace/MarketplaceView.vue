<script setup>
import { toRefs } from 'vue';
import { onMounted, ref } from 'vue';
import { useMarketPlaceStore } from '@/stores/marketPlace';

/* ----- Components ----- */
import Profiles from './components/Profiles.vue';
import Search from './components/Search.vue';
import MessageDialogs from './components/MessageDialogs.vue';

/* ----- Data ----- */
const { fetchProfiles, profiles } = toRefs(useMarketPlaceStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfilesHandler();
});

/* ----- Methods ----- */
const fetchProfilesHandler = async () => {
  if (profiles.value) return;
  await fetchProfiles.value();
};
</script>

<template>
  <section class="marketplace">
    <Search />
    <Profiles />
    <MessageDialogs />
  </section>
</template>
