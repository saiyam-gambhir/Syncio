<script setup>
import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useMarketPlaceStore } from '@/stores/marketPlace';

/* ----- Data ----- */
const marketPlace = useMarketPlaceStore();
const searchString = ref('');

/* ----- Methods -----*/
const debouncedSearch = useDebounceFn(async () => {
  await marketPlace.fetchProfiles();
}, 500);

/* ----- Watchers ----- */
watch(searchString, async (newValue, oldValue) => {
  if (searchString.value.length > 2 || newValue.length < oldValue.length) {
    marketPlace.queries['search_str'] = newValue;
    debouncedSearch();
  }
});
</script>

<template>
  <section class="search mb-5">
    <div class="container">
      <div class="search text-center mt-6 mb-6 pt-1">
        <h2 class="text-3xl mb-6">Find your perfect match</h2>
        <div class="p-input-icon-left w-50">
          <i class="pi pi-search" />
          <InputText class="w-full" placeholder="Search for categories or brands" v-model="searchString" />
        </div>
      </div>
    </div>
  </section>
</template>
