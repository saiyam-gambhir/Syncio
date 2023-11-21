<script setup>
import { useActivities } from '../../composables/activities';

/* ----- Data ----- */
const {
  fetchActivitiesHandler
} = useActivities();

const {
  productEvents,
  productQueries,
} = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
const searchHandler = searchText => {
  productQueries.value.search_str = searchText;
  fetchActivitiesHandler();
};

const storeFilterHandler = storeId => {
  productQueries.value.partner_store_id = storeId;
  fetchActivitiesHandler();
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="p-inputgroup w-50">
      <SearchFilter
        @update:modelValue="searchHandler"
        placeholder="Search by product name or SKU"
        v-model="productQueries.search_str">
      </SearchFilter>
    </div>

    <div class="flex w-50 align-items-center justify-content-end">
      <div class="p-inputgroup w-35">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="productQueries.partner_store_id">
        </StoresFilter>
      </div>

      <div class="p-inputgroup w-35 ml-4">
        <Dropdown
          :autoOptionFocus="false"
          :options="productEvents"
          @change="fetchActivitiesHandler"
          optionLabel="label"
          optionValue="value"
          placeholder="All Events"
          showClear
          v-model="productQueries['filters[event]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
