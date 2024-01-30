<script setup>
/* ----- Data ----- */
const {
  fetchOrders,
  filters,
  loadingOrders,
  sortOptions,
} = toRefs(useOrdersStore());

/* ----- Methods ----- */
const searchHandler = async (searchText) => {
  filters.value.searchString = searchText;
  await fetchOrders.value();
};
</script>

<template>
  <div class="grid grid-sm">
    <div class="col-10 pb-0">
      <div class="p-inputgroup w-100">
        <SearchFilter
          :loading="loadingOrders"
          @update:modelValue="searchHandler"
          placeholder="Search by exact order number (eg: #1234)"
          v-model="filters.searchString">
        </SearchFilter>
      </div>
    </div>
    <div class="col-2 pb-0">
      <div class="p-inputgroup w-100">
        <Dropdown
          :loading="loadingOrders"
          :options="sortOptions"
          @change="fetchOrders"
          optionLabel="label"
          placeholder="Sort by"
          optionValue="sortBy"
          v-model="filters.sortBy">
          <template #value>Sort by</template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon" class="ml-2"></i>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
