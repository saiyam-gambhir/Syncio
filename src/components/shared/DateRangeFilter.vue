<script setup>
import { DateTime } from 'luxon'
import { ref, onMounted, } from 'vue'
import { useAuthStore } from '@/stores/auth'

/* ----- Data ----- */
const { timeZone } = useAuthStore()
const date = ref()
const today = DateTime.now().setZone(timeZone)
const endOfToday = today.endOf('day')
const startOfToday = today.startOf('day')
const yesterday = today.minus({ days: 1 })
const endOfYesterday = yesterday.endOf('day')
const startOfYesterday = yesterday.startOf('day')
const startOfLastWeek = today.minus({ days: 7 }).endOf('day')
const endOfLastFifteenDays = today.minus({ days: 15 }).endOf('day')
const startOfLastThirtyDays = today.minus({ days: 30 }).endOf('day')
const startOfLastSixtyDays = today.minus({ days: 60 }).endOf('day')
const maxDate = endOfToday

const presetRanges = ref([
  { label: 'Today', range: [startOfToday, endOfToday] },
  { label: 'Yesterday', range: [startOfYesterday, endOfYesterday] },
  { label: 'Last 7 Days', range: [startOfLastWeek, endOfYesterday] },
  { label: 'Last 15 Days', range: [endOfLastFifteenDays, endOfYesterday] },
  { label: 'Last 30 Days', range: [startOfLastThirtyDays, endOfYesterday] },
  { label: 'Last 60 Days', range: [startOfLastSixtyDays, endOfYesterday] },
])

/* ----- MOUNTED ----- */
onMounted(() => {
  date.value = [startOfLastThirtyDays, endOfToday]
})
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
    v-model="date"
  />
</template>
