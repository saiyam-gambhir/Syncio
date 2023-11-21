<script setup>
import { useActivities } from '../../composables/activities';

/* ----- Data ----- */
const {
  fetchActivitiesHandler
} = useActivities();

const {
  orderEvents,
  orderQueries,
} = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
const searchHandler = async searchText => {
  orderQueries.value.search_str = searchText;
  await fetchActivitiesHandler();
};

const storeFilterHandler = async storeId => {
  orderQueries.value.partner_store_id = storeId;
  await fetchActivitiesHandler();
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="p-inputgroup w-50">
      <SearchFilter
        @update:modelValue="searchHandler"
        placeholder="Search by order number order ID"
        v-model="orderQueries.search_str">
      </SearchFilter>
    </div>

    <div class="flex w-50 align-items-center justify-content-end">
      <div class="p-inputgroup w-35">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="orderQueries.partner_store_id">
        </StoresFilter>
      </div>

      <div class="p-inputgroup w-35 ml-4">
        <Dropdown
          :autoOptionFocus="false"
          :options="orderEvents"
          @change="fetchActivitiesHandler"
          optionLabel="label"
          optionValue="value"
          placeholder="All Events"
          showClear
          v-model="orderQueries['filters[event]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
