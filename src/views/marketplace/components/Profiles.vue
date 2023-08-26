<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const { loading, profiles } = toRefs(useMarketPlaceStore());
</script>

<template>
  <section class="profiles mx-auto mb-4">
    <div class="container">
      <Filters />
      <div class="grid" v-if="loading">
        <ProfileSkeleton />
      </div>
      <div class="grid" v-else>
        <Profile
          :key="profile.id"
          :profile="profile"
          v-for="profile in profiles">
        </Profile>
      </div>
    </div>
  </section>
</template>
