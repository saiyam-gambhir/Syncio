import { DateTime } from 'luxon';

/* ----- Data ----- */
const { timeZone } = useAuthStore();
const today = DateTime.now().setZone(timeZone);
const endOfToday = today.endOf('day');
const yesterday = today.minus({ days: 1 });
const endOfYesterday = yesterday.endOf('day');
const startOfLastWeek = today.minus({ days: 6 }).endOf('day');
const endOfLastFifteenDays = today.minus({ days: 14 }).endOf('day');
const startOfLastThirtyDays = today.minus({ days: 29 }).endOf('day');
const startOfLastSixtyDays = today.minus({ days: 59 }).endOf('day');
const maxDate = endOfToday;

const presetRanges = [
  { label: 'Today', range: [endOfToday, endOfToday] },
  { label: 'Yesterday', range: [endOfYesterday, endOfYesterday] },
  { label: 'Last 7 Days', range: [startOfLastWeek, endOfToday] },
  { label: 'Last 15 Days', range: [endOfLastFifteenDays, endOfToday] },
  { label: 'Last 30 Days', range: [startOfLastThirtyDays, endOfToday] },
  { label: 'Last 60 Days', range: [startOfLastSixtyDays, endOfToday] }
];

export const MAX_DATE = maxDate;
export const PRESET_RANGES = presetRanges;
export const END_OF_TODAY = endOfToday;
