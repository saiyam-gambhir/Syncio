<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Components ----- */
const MessageDialogs = defineAsyncComponent(() => import('./components/MessageDialogs.vue'));

/* ----- Data ----- */
const {
  fetchProfiles,
  isMessageDialogVisible,
  profiles,
} = toRefs(useMarketPlaceStore());

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
    <MessageDialogs v-if="isMessageDialogVisible" />
  </section>
</template>
