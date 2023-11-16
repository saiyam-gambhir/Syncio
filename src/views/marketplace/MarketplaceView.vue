<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Components ----- */
const MessageDialog = defineAsyncComponent(() => import('./components/MessageDialog.vue'));
const MessageSentDialog = defineAsyncComponent(() => import('./components/MessageSentDialog.vue'));

/* ----- Data ----- */
const {
  fetchProfiles,
  isMessageDialogVisible,
  isMessageSentDialogVisible,
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
    <MessageDialog v-if="isMessageDialogVisible" />
    <MessageSentDialog v-if="isMessageSentDialogVisible" />
  </section>
</template>
