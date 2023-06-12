<script setup>
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- Components ----- */
import Filters from './Filters.vue'
import Profile from './Profile.vue'
import ProfilesSkeleton from './ProfileSkeleton.vue'

/* ----- Data ----- */
const marketPlace = useMarketPlaceStore()

/* ----- Props ----- */
const props = defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <section class="profiles mx-auto mb-4">
    <div class="container">
      <Filters />
      <div class="grid" v-if="loading">
        <ProfilesSkeleton />
      </div>
      <div class="grid" v-else>
        <Profile v-for="profile in marketPlace.profiles" :key="profile.id" :profile="profile" />
      </div>
    </div>
  </section>
</template>
