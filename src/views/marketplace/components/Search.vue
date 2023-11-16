<script setup>
import { useDebounceFn } from '@vueuse/core';
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const { fetchProfiles, queries, searchString, } = toRefs(useMarketPlaceStore());

/* ----- Methods -----*/
const debouncedSearch = useDebounceFn(async () => {
  await fetchProfiles.value();
}, 350);

/* ----- Watchers ----- */
watch(searchString, async (newValue, oldValue) => {
  if (searchString?.value.length > 2 || newValue.length < oldValue.length) {
    queries.value['search_str'] = newValue;
    debouncedSearch();
  }
});
</script>

<template>
  <section class="search mb-3">
    <div class="container">
      <div class="search mt-1 pt-1">
        <h2 class="text-3xl">Find your perfect match</h2>
        <div class="p-input-icon-left w-100">
          <i class="pi pi-search" />
          <InputText
            class="p-inputtext-lg w-full"
            placeholder="Search for categories or brands"
            v-model="searchString">
          </InputText>
        </div>
      </div>
    </div>
  </section>
</template>
