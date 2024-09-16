<script setup>
import { useDebounceFn } from '@vueuse/core';

/* ----- Data ----- */
const {
  fetchProfiles,
  loading,
  queries,
  searchString,
  sortOptions,
} = toRefs(useMarketPlaceStore());

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
  <section class="search mb-2">
    <h2 class="text-3xl mb-2">Find your perfect match</h2>
    <div class="grid mt-0">
      <div class="col-9">
        <div class="search mt-1 pt-1">
          <div class="p-input-icon-left w-100">
            <i class="pi pi-search" />
            <InputText
              :loading="loading"
              class="p-inputtext-lg w-full"
              placeholder="Search for categories or brands"
              v-model="searchString">
            </InputText>
          </div>
        </div>
      </div>
      <div class="col-3">
        <Dropdown
          :loading="loading"
          :options="sortOptions"
          @change="fetchProfiles"
          optionLabel="label"
          optionValue="sortBy"
          showClear
          placeholder="Sort by"
          style="height: 44px;"
          class="w-full mt-2"
          v-model="queries.sortBy">
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon" class="ml-2"></i>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </section>
</template>
