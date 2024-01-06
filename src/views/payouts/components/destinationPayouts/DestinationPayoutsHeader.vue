<script setup>
import * as ranges from '@/composables/presetRanges';

/* ----- Data ----- */
const {
  activeTabIndex,
  arePayableOrdersVisible,
  datePickerLabel,
  destinationPayoutsDateRange,
  fetchPaidPayouts,
  fetchPayableOrders,
  fetchUnpaidPayouts,
  paidPayouts,
  paidPayoutsStatusOptions,
  payableOrders,
  payoutOrders,
  payoutOrdersSearchString,
  queries,
  selectedPayoutOrdersStore,
  unpaidPayouts,
} = toRefs(usePayoutsStore());

const {
  fetchPayoutOrdersHandler,
} = usePayouts();

onMounted(() => {
  if(!destinationPayoutsDateRange.value) {
    const startDate = new Date(ranges.START_OF_LAST_THIRTY_DAYS);
    const endDate = new Date(ranges.END_OF_TODAY);

    destinationPayoutsDateRange.value = [startDate, endDate];
    queries.value['filters[date_range]'] = getFormattedDateRange(startDate, endDate);
  }
});

/* ----- Computed ----- */
const isLoading = computed(() => {
  return paidPayouts.value.loading || payableOrders.value.loading || unpaidPayouts.value.loading;
});

/* ----- Methods ----- */
const fetchActiveTabPayouts = async () => {
  switch (activeTabIndex.value) {
    case 0:
      arePayableOrdersVisible.value ? await fetchPayableOrders.value() : await fetchPayoutOrdersHandler(selectedPayoutOrdersStore.value);
      break;

    case 1:
      await fetchUnpaidPayouts.value();
      break;

    case 2:
      await fetchPaidPayouts.value();
      break;
  }
};

const storeFilterHandler = async storeId => {
  queries.value['filters[target_store]'] = storeId;
  fetchActiveTabPayouts();
};

const fetchPaidPayoutsHandler = async (event) => {
  if(!event.value) {
    queries.value['filters[status]'] = 'paid_received';
  }
  await fetchPaidPayouts.value(1);
};

const getFormattedDateRange = (startDate, endDate) => {
  const startDay = startDate.getDate();
  const startMonth = startDate.getMonth() + 1;
  const startYear = startDate.getFullYear();

  const endDay = endDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endYear = endDate.getFullYear();

  return `${startYear}-${startMonth}-${startDay} to ${endYear}-${endMonth}-${endDay}`
};

const getDateRangeLabel = (startDate, endDate) => {
  const _endDate = new Date(endDate);
  const _startDate = new Date(startDate);
  const differenceDays = Math.abs(_endDate - _startDate) / (1000 * 60 * 60 * 24);
  let label = '';

  switch(differenceDays) {
    case 0:
    label = String(new Date(ranges.END_OF_TODAY)) == String(endDate) ? 'Today' : 'Yesterday';
    break;

    case 6:
    label = 'Last 7 days';
    break;

    case 14:
    label = 'Last 15 days';
    break;

    case 29:
    label = 'Last 30 days';
    break;

    case 59:
    label = 'Last 60 days';
    break;

    default:
    label = 'Custom dates';
    break;
  }

  return label;
};

const onSelectDateHandler = async ([startDate, endDate]) => {
  datePickerLabel.value = getDateRangeLabel(startDate, endDate);
  queries.value['filters[date_range]'] = destinationPayoutsDateRange.value = getFormattedDateRange(startDate, endDate);
  fetchActiveTabPayouts();

};

const searchHandler = async (searchText) => {
  payoutOrdersSearchString.value = searchText;
  await fetchPayoutOrdersHandler(selectedPayoutOrdersStore.value);
};
</script>

<template>
  <div class="grid grid-sm">
    <div class="col col-3 pb-0" v-if="arePayableOrdersVisible">
      <div class="p-inputgroup">
        <StoresFilter
          :loading="isLoading"
          @update:modelValue="storeFilterHandler"
          v-model="queries['filters[target_store]']">
        </StoresFilter>
      </div>
    </div>

    <div class="col-4 pb-0" v-if="!arePayableOrdersVisible">
      <div class="p-inputgroup w-100">
        <SearchFilter
          :loading="payoutOrders.loading"
          @update:modelValue="searchHandler"
          placeholder="Order Number (Press Enter to Search)"
          v-model="payoutOrdersSearchString">
        </SearchFilter>
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
          :max-date="String(ranges.END_OF_TODAY)"
          :month-change-on-scroll="false"
          :no-today="true"
          :partial-range="false"
          :preset-ranges="ranges.PRESET_RANGES"
          @update:model-value="onSelectDateHandler"
          multi-calendars
          range
          v-model="destinationPayoutsDateRange">
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
          optionLabel="key"
          optionValue="value"
          placeholder="Payment status"
          showClear
          v-model="queries['filters[status]']">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
