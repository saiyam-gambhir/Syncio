<script setup>
import { DateTime } from 'luxon';

/* ----- Data ----- */
const { timeZone } = useAuthStore();
const date = ref();
const today = DateTime.now().setZone(timeZone);
const endOfToday = today.endOf('day');
const yesterday = today.minus({ days: 1 });
const endOfYesterday = yesterday.endOf('day');
const startOfLastWeek = today.minus({ days: 6 }).endOf('day');
const endOfLastFifteenDays = today.minus({ days: 14 }).endOf('day');
const startOfLastThirtyDays = today.minus({ days: 29 }).endOf('day');
const startOfLastSixtyDays = today.minus({ days: 59 }).endOf('day');
const startOfLastNintyDays = today.minus({ days: 89 }).endOf('day');
const maxDate = endOfToday;

const presetRanges = ref([
  { label: 'Today', range: [endOfToday, endOfToday] },
  { label: 'Yesterday', range: [endOfYesterday, endOfYesterday] },
  { label: 'Last 7 Days', range: [startOfLastWeek, endOfToday] },
  { label: 'Last 15 Days', range: [endOfLastFifteenDays, endOfToday] },
  { label: 'Last 30 Days', range: [startOfLastThirtyDays, endOfToday] },
  { label: 'Last 60 Days', range: [startOfLastSixtyDays, endOfToday] },
  { label: 'Last 90 Days', range: [startOfLastNintyDays, endOfToday] },
]);

/* ----- Mounted ----- */
onMounted(() => {
  date.value = [startOfLastThirtyDays, endOfToday];
});

/* ----- Emits ----- */
const emits = defineEmits(['onSelectDate']);

/* ----- Methods ----- */
const onSelectDateHandler = (modelValue) => {
  const startDay = modelValue[0].getDate();
  const startMonth = modelValue[0].getMonth() + 1;
  const startYear = modelValue[0].getFullYear();

  const endDay = modelValue[1].getDate();
  const endMonth = modelValue[1].getMonth() + 1;
  const endYear = modelValue[1].getFullYear();

  const startDate = `${startYear}-${startMonth}-${startDay}`;
  const endDate = `${endYear}-${endMonth}-${endDay}`;

  emits('onSelectDate', { startDate, endDate });
};
</script>

<template>
  <VueDatePicker
    :clearable="false"
    :enable-time-picker="false"
    :ignore-time-validation="true"
    :max-date="maxDate"
    :month-change-on-scroll="false"
    :no-today="true"
    :partial-range="false"
    :preset-ranges="presetRanges"
    :timezone="timeZone"
    multi-calendars
    range
    :format="format"
    :model-value="date"
    @update:model-value="onSelectDateHandler">
  </VueDatePicker>
</template>
