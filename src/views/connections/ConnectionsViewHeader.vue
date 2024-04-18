<script setup>
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
  <div class="grid grid-sm">
    <div class="col-10 pb-0">
      <div class="p-inputgroup w-100">
        <SearchFilter
          :loading="loadingConnections"
          @update:modelValue="searchHandler"
          placeholder="Search by store name"
          v-model="filters.searchString">
        </SearchFilter>
      </div>
    </div>
    <div class="col-2 pb-0">
      <div class="p-inputgroup w-100">
        <Dropdown
          :loading="loadingConnections"
          :options="sortOptions"
          @change="fetchConnectionsHandler"
          optionLabel="label"
          placeholder="Sort by store name"
          v-model="filters.sortBy">
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
