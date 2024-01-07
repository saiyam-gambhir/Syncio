<script setup>
import * as ranges from '@/composables/presetRanges';

/* ----- Data ----- */
const {
  activeTabIndex,
  datePickerLabel,
  fetchSourcePayouts,
  openPayoutsStatusOptions,
  sourcePayoutsDateRange,
  sourceQueries,
} = toRefs(usePayoutsStore());

/* ----- Mounted ----- */
onMounted(() => {
  if(!sourcePayoutsDateRange.value) {
    const startDate = new Date(ranges.START_OF_LAST_THIRTY_DAYS);
    const endDate = new Date(ranges.END_OF_TODAY);

    sourcePayoutsDateRange.value = [startDate, endDate];
    sourceQueries.value['filters[date_range]'] = getFormattedDateRange(startDate, endDate);
  }
});

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  sourceQueries.value['filters[origin_store]'] = storeId;
  await fetchSourcePayouts.value(1);
};

/* Todo: Helper method */
const getFormattedDateRange = (startDate, endDate) => {
  const startDay = startDate.getDate();
  const startMonth = startDate.getMonth() + 1;
  const startYear = startDate.getFullYear();

  const endDay = endDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endYear = endDate.getFullYear();

  return `${startYear}-${startMonth}-${startDay} to ${endYear}-${endMonth}-${endDay}`
};

/* Todo: Helper method */
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
  sourceQueries.value['filters[date_range]'] = sourcePayoutsDateRange.value = getFormattedDateRange(startDate, endDate);
  fetchSourcePayouts.value(1)
};
</script>

<template>
  <div class="grid grid-sm">
    <div class="col col-3 pb-0">
      <div class="p-inputgroup">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="sourceQueries['filters[origin_store]']">
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
          :max-date="String(ranges.END_OF_TODAY)"
          :month-change-on-scroll="false"
          :no-today="true"
          :partial-range="false"
          :preset-ranges="ranges.PRESET_RANGES"
          @update:model-value="onSelectDateHandler"
          multi-calendars
          range
          v-model="sourcePayoutsDateRange">
        </VueDatePicker>
      </div>
    </div>

    <div class="col col-2 pb-0" v-if="activeTabIndex === 0">
      <div class="p-inputgroup">
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
