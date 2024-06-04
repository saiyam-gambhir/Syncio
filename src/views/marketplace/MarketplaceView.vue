<script setup>
/* ----- Components ----- */
const MessageDialog = defineAsyncComponent(() => import('./components/MessageDialog.vue'));
const MessageSentDialog = defineAsyncComponent(() => import('./components/MessageSentDialog.vue'));

/* ----- Data ----- */
const {
  fetchProfile,
  fetchProfiles,
  isMessageDialogVisible,
  isMessageSentDialogVisible,
  profile,
  profiles,
  loading,
  loadingProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfilesHandler();
});

/* ----- Methods ----- */
async function fetchProfilesHandler() {
  const profilesPromise = !profiles.value ? fetchProfiles.value() : Promise.resolve();
  const profilePromise = !profile.value?.brandName ? fetchProfile.value() : Promise.resolve();

  await Promise.all([profilesPromise, profilePromise]);
};
</script>

<template>
  <section class="marketplace mt-2">
    <div v-if="loading || loadingProfile">
      <MarketplaceViewSkeleton />
    </div>
    <div v-else-if="!profile.updatedAt && !loading && !loadingProfile">
      <Banner />
    </div>
    <div v-else>
      <div class="grid">
        <div class="col col-6">
          <UserProfile :profile="profile" />
        </div>
        <div class="col col-6">
          <Survey />
        </div>
      </div>

      <div class="sticky-section">
        <Search />
        <Filters />
      </div>

      <Profiles />
    </div>
  </section>

  <!----- Dialogs ----->
  <MessageDialog v-if="isMessageDialogVisible" />
  <MessageSentDialog v-if="isMessageSentDialogVisible" />
</template>

<style scoped>
.sticky-section {
  background: var(--white);
  margin: 0 -2rem;
  padding: 1.5rem 2rem .5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
