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
} = toRefs(useMarketPlaceStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfilesHandler();
});

/* ----- Methods ----- */
const fetchProfilesHandler = async () => {
  if (profiles.value) return;
  await fetchProfiles.value();
  if (profile.value.brandName) return;
  await fetchProfile.value();
};
</script>

<template>
  <section class="marketplace">
    <div class="row flex ml-0 mb-4">
      <div class="col col-6">
        <UserProfile :profile="profile" />
      </div>
      <div class="col col-6">
        <Survey />
      </div>
    </div>
    <Search />
    <Profiles />
    <MessageDialog v-if="isMessageDialogVisible" />
    <MessageSentDialog v-if="isMessageSentDialogVisible" />
  </section>
</template>
