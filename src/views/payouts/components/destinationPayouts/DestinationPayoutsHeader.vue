<script setup>
import { usePayoutsStore } from 'payouts';

const {
  activeTabIndex,
  fetchPaidPayouts,
  fetchPayableOrders,
  fetchUnpaidPayouts,
  queries,
} = toRefs(usePayoutsStore());

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  queries.value['filters[target_store]'] = storeId;

  switch (activeTabIndex.value) {
    case 0:
      await fetchPayableOrders.value();
      break;

    case 1:
      await fetchUnpaidPayouts.value();
      break;

    case 2:
      await fetchPaidPayouts.value();
      break;
  }
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="flex w-50 align-items-center">
      <div class="p-inputgroup w-50">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="queries['filters[target_store]']">
        </StoresFilter>
      </div>

      <div class="p-inputgroup w-35 ml-4">
        <!-- <Dropdown
          :autoOptionFocus="false"
          :options="generalEvents"
          @change="fetchActivitiesHandler"
          optionLabel="label"
          optionValue="value"
          placeholder="All Events"
          showClear
          v-model="generalQueries['filters[event]']">
        </Dropdown> -->
      </div>
    </div>
  </div>
</template>
