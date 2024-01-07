<script setup>
const {
  activeTabIndex,
  fetchSourcePayouts,
  openPayoutsStatusOptions,
  sourceQueries
} = toRefs(usePayoutsStore());

const storeFilterHandler = async storeId => {
  sourceQueries.value['filters[origin_store]'] = storeId;
  await fetchSourcePayouts.value(1);
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="flex w-50 align-items-center">
      <div class="p-inputgroup w-50">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="sourceQueries['filters[origin_store]']">
        </StoresFilter>
      </div>

      <div class="p-inputgroup w-35 ml-4">
        <Dropdown
          :autoOptionFocus="false"
          :loading="isLoading"
          :options="openPayoutsStatusOptions"
          @change="fetchSourcePayouts(1)"
          optionLabel="label"
          optionValue="value"
          placeholder="Payment status"
          showClear
          v-if="activeTabIndex === 0"
          v-model="sourceQueries['filters[status]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
