<script setup>
/* ----- Data ----- */
const {
  fetchOrders,
  filters,
  loadingOrders,
  sortOptions,
  statusOptions,
} = toRefs(useOrdersStore());

/* ----- Methods ----- */
const searchHandler = async (searchText) => {
  filters.value.searchString = searchText;
  await fetchOrders.value();
};
</script>

<template>
  <div class="grid grid-sm">
    <div class="col-8 pb-0">
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
          :options="statusOptions"
          @change="fetchOrders"
          optionLabel="label"
          optionValue="value"
          placeholder="Push Status"
          showClear
          style="height: 39px;"
          v-model="filters.status">
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
    <div class="col-2 pb-0">
      <div class="p-inputgroup w-100">
        <Dropdown
          :loading="loadingOrders"
          :options="sortOptions"
          @change="fetchOrders"
          optionLabel="label"
          optionValue="sortBy"
          showClear
          placeholder="Sort by"
          style="height: 39px;"
          v-model="filters.sortBy">
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
