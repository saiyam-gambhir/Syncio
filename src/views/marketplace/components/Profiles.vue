<script setup>
import { toRefs } from 'vue';
import { useMarketPlaceStore } from '@/stores/marketPlace';

/* ----- Components ----- */
import Filters from './Filters.vue';
import Profile from './Profile.vue';
import ProfilesSkeleton from './ProfileSkeleton.vue';

/* ----- Data ----- */
const { loading, profiles } = toRefs(useMarketPlaceStore());
</script>

<template>
  <section class="profiles mx-auto mb-4">
    <div class="container">
      <Filters />
      <div class="grid" v-if="loading">
        <ProfilesSkeleton />
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
