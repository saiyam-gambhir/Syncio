<script setup>
import { useConnections } from './composables/connections';
import { useConnectionsStore } from 'connections';

/* ----- Data ----- */
const {
  filters,
  loadingConnections,
  sortOptions,
} = toRefs(useConnectionsStore());

const {
  fetchConnectionsHandler
} = useConnections();

/* ----- Methods ----- */
const searchHandler = async (searchText) => {
  filters.value.searchString = searchText;
  await fetchConnectionsHandler();
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="p-inputgroup w-35">
      <SearchFilter
        :loading="loadingConnections"
        @update:modelValue="searchHandler"
        placeholder="Search by store URL"
        v-model="filters.searchString">
      </SearchFilter>
    </div>

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
          <i :class="option.icon"></i>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
