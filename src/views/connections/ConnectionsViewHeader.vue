<script setup>
import { useConnections } from './composables/connections';

/* ----- Data ----- */
const {
  filters,
  loadingConnections,
  sortOptions,
} = toRefs(useConnectionsStore());

const {
  fetchConnectionsHandler,
} = useConnections();

/* ----- Methods ----- */
const searchHandler = async (searchText) => {
  filters.value.searchString = searchText;
  await fetchConnectionsHandler();
};
</script>

<template>
  <div class="grid">
    <div class="col-9">
      <div class="p-inputgroup w-100">
        <SearchFilter
          :loading="loadingConnections"
          @update:modelValue="searchHandler"
          placeholder="Search by store URL"
          v-model="filters.searchString">
        </SearchFilter>
      </div>
    </div>
    <div class="col-3">
      <div class="p-inputgroup w-100">
        <Dropdown
          :loading="loadingConnections"
          :options="sortOptions"
          @change="fetchConnectionsHandler"
          optionLabel="label"
          placeholder="Sort by Store"
          v-model="filters.sortBy">
          <template #value>Sort by Store</template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
