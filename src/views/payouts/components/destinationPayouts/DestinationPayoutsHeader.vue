<script setup>
import * as ranges from '@/composables/presetRanges';

/* ----- Data ----- */
const {
  activeTabIndex,
  datePickerLabel,
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

const onSelectDateHandler = async ([startDate, endDate]) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const differenceMs = Math.abs(date2 - date1);
  const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

  switch(differenceDays) {
    case 0:
      if(String(new Date(ranges.END_OF_TODAY)) == String(endDate)) {
        datePickerLabel.value = 'Today';
      } else {
        datePickerLabel.value = 'Yesterday';
      }
    break;

    case 6:
    datePickerLabel.value = 'Last 7 days';
    break;

    case 14:
    datePickerLabel.value = 'Last 15 days';
    break;

    case 29:
    datePickerLabel.value = 'Last 30 days';
    break;

    case 59:
    datePickerLabel.value = 'Last 60 days';
    break;
  }

  // queries.value['filters[date_range]'] = `${startDate} to ${endDate}`;
  // switch (activeTabIndex.value) {
  //   case 0:
  //     await fetchPayableOrders.value();
  //     break;

  //   case 1:
  //     await fetchUnpaidPayouts.value();
  //     break;

  //   case 2:
  //     await fetchPaidPayouts.value();
  //     break;
  // }
};
</script>

<template>
  <div class="grid grid-sm">
    <div class="col col-3 pb-0">
      <div class="p-inputgroup">
        <StoresFilter
          :loading="isLoading"
          @update:modelValue="storeFilterHandler"
          v-model="queries['filters[target_store]']">
        </StoresFilter>
      </div>
    </div>
    <div class="col col-2 pb-0">
      <div class="p-inputgroup relative">
        <span class="p-input-icon-left w-100">
          <i class="pi pi-calendar" />
          <InputText type="text" class="w-100" v-model="datePickerLabel" style="border-radius: 6px !important; height: 41px;" />
        </span>

        <VueDatePicker
          :clearable="false"
          :enable-time-picker="false"
          :ignore-time-validation="true"
          :max-date="ranges.MAX_DATE"
          :month-change-on-scroll="false"
          :no-today="true"
          :partial-range="false"
          :preset-ranges="ranges.PRESET_RANGES"
          @update:model-value="onSelectDateHandler"
          multi-calendars
          range
          v-model="queries['filters[date_range]']">
        </VueDatePicker>
      </div>
    </div>
    <div class="col col-2 pb-0" v-if="activeTabIndex === 2">
      <div class="p-inputgroup">
        <Dropdown
          :autoOptionFocus="false"
          :loading="isLoading"
          :options="paidPayoutsStatusOptions"
          @change="fetchPaidPayoutsHandler($event)"
          optionLabel="label"
          optionValue="value"
          placeholder="Payment status"
          showClear
          v-model="queries['filters[status]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
