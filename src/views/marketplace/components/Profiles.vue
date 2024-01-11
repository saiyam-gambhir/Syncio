<script setup>
/* ----- Data ----- */
const {
  loading,
  profiles,
} = toRefs(useMarketPlaceStore());
</script>

<template>
  <section class="profiles mx-auto mb-4">
    <div class="container">
      <div class="grid" v-if="loading">
        <ProfileSkeleton />
      </div>
      <div class="grid" v-else-if="profiles?.length > 0">
        <Profile
          :key="profile.id"
          :profile="profile"
          v-for="profile in profiles">
        </Profile>
      </div>
      <div v-else class="text-900 mt-4">
        <h3 class="text-2xl">No results found</h3>
        <p class="text-lg">The marketplace is still in testing, so there may not be as many search results as expected.</p>
        <p class="text-lg">
          If you have a specific request, please submit your request via the
          <AppLink label="feedback survey" link="https://us18.list-manage.com/survey?u=d3876b95496c25d2e8d7568bb&id=38b4962d37" />
        </p>
      </div>
    </div>
  </section>
</template>
