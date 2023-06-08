<script setup>
import { ref, watch } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- DATA ----- */
const marketPlace = useMarketPlaceStore()
const searchString = ref('')

/* ----- WATCHERS ----- */
watch(searchString, async (newValue, oldValue) => {
  if(searchString.value.length > 2 || newValue.length < oldValue.length) {
    marketPlace.queries['search_str'] = newValue
    await marketPlace.fetchProfiles()
  }
})
</script>

<template>
  <section class="search mt-3 mb-5">
    <div class="container">
      <div class="search text-center mt-8 mb-6 pt-1">
        <h2 class="lg">Find your perfect match</h2>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="searchString"
            placeholder="Search for categories or brands">
          </InputText>
        </span>
      </div>
    </div>
  </section>
</template>
