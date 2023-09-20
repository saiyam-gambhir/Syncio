<script setup>
import { usePayoutsStore } from 'payouts';

const {
  activeTabIndex,
  fetchPaidPayouts,
  fetchPayableOrders,
  fetchUnpaidPayouts,
  paidPayouts,
  paidPayoutsStatusOptions,
  payableOrders,
  queries,
  unpaidPayouts,
} = toRefs(usePayoutsStore());

/* ----- Computed ----- */
const isLoading = computed(() => {
  return paidPayouts.value.loading || payableOrders.value.loading || unpaidPayouts.value.loading;
});

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

const fetchPaidPayoutsHandler = async (event) => {
  if(!event.value) {
    queries.value['filters[status]'] = 'paid_received';
  }

  await fetchPaidPayouts.value(1);
}
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="flex w-50 align-items-center">
      <div class="p-inputgroup w-50">
        <StoresFilter
          :loading="isLoading"
          @update:modelValue="storeFilterHandler"
          v-model="queries['filters[target_store]']">
        </StoresFilter>
      </div>

      <div class="p-inputgroup w-35 ml-4">
        <Dropdown
          :autoOptionFocus="false"
          :loading="isLoading"
          :options="paidPayoutsStatusOptions"
          @change="fetchPaidPayoutsHandler($event)"
          optionLabel="label"
          optionValue="value"
          placeholder="Payment status"
          showClear
          v-if="activeTabIndex === 2"
          v-model="queries['filters[status]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
