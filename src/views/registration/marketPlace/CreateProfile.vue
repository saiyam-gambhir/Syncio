<script setup>
/* ----- Data ----- */
const {
  fetchProfile,
  profile,
  loading,
  loadingProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfilesHandler();
});

const fetchProfilesHandler = async () => {
  if (profile.value.brandName) return;
  await fetchProfile.value();
};
</script>

<template>

</template>
