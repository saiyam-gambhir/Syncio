<script setup>
import { useUrlSearchParams } from '@vueuse/core';

/* ----- Components ----- */
const CreateProfileDialog = defineAsyncComponent(() => import('./components/CreateProfileDialog.vue'));
const MessageDialog = defineAsyncComponent(() => import('./components/MessageDialog.vue'));
const MessageSentDialog = defineAsyncComponent(() => import('./components/MessageSentDialog.vue'));

/* ----- Data ----- */
const {
  fetchProfile,
  fetchProfiles,
  isCreateProfileDialogVisible,
  isMessageDialogVisible,
  isMessageSentDialogVisible,
  loading,
  loadingProfile,
  profile,
  profiles,
} = toRefs(useMarketPlaceStore());

const params = useUrlSearchParams();

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfilesHandler();

  if(Boolean(params['show-invite-dialog']) && profile.value?.updatedAt) {
    isMessageDialogVisible.value = true;
  }
});

/* ----- Methods ----- */
async function fetchProfilesHandler() {
  const profilesPromise = !profiles.value ? fetchProfiles.value() : Promise.resolve();
  const profilePromise = !profile.value?.brandName ? fetchProfile.value() : Promise.resolve();

  await Promise.all([profilesPromise, profilePromise]);
};
</script>

<template>
  <section class="marketplace">
    <div v-if="loadingProfile">
      <MarketplaceViewSkeleton />
    </div>
    <div v-else>
      <div class="sticky-section">
        <Search />
        <Filters />
      </div>
      <Profiles />
    </div>
  </section>

  <!----- Dialogs ----->
  <CreateProfileDialog v-if="isCreateProfileDialogVisible" />
  <MessageDialog v-if="isMessageDialogVisible" />
  <MessageSentDialog v-if="isMessageSentDialogVisible" />
</template>

<style scoped>
.sticky-section {
  background: var(--white);
  margin: 0 -2rem;
  padding: 1.25rem 2rem 0 2rem;
  position: sticky;
  top: 0rem;
  z-index: 10;
}
</style>
