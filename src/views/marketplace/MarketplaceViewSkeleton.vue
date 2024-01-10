<script setup>
/* ----- Data ----- */
const {
  profile,
} = toRefs(useMarketPlaceStore());
</script>

<template>
  <section class="marketplace mt-2">
    <!-- <div class="grid">
      <div class="col col-6">
        <UserProfile :profile="profile" />
      </div>
      <div class="col col-6">
        <Survey />
      </div>
    </div> -->

    <!-- <div class="sticky-section">
      <Search />
      <Filters />
    </div> -->

    <Profiles />
  </section>
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
