<script setup>
import { useActivities } from '../../composables/activities';

/* ----- Data ----- */
const {
  fetchActivitiesHandler
} = useActivities();

const {
  generalEvents,
  generalQueries
} = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  generalQueries.value.partner_store_id = storeId;
  await fetchActivitiesHandler();
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="p-inputgroup w-50"></div>

    <div class="flex w-50 align-items-center justify-content-end">
      <div class="p-inputgroup w-35">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="generalQueries.partner_store_id">
        </StoresFilter>
      </div>

      <div class="p-inputgroup w-35 ml-4">
        <Dropdown
          :autoOptionFocus="false"
          :options="generalEvents"
          @change="fetchActivitiesHandler"
          optionLabel="label"
          optionValue="value"
          placeholder="All Events"
          showClear
          v-model="generalQueries['filters[event]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
