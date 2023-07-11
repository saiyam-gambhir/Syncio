<script setup>
import { useFilters } from '@/composables/filters';

/* ----- Data ----- */
const { formatDate } = useFilters();

/* ----- Props ----- */
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-column date">
    <span>{{ formatDate(date).date }}</span>
    <span class="text-sm mt-2">{{ formatDate(date).time }}</span>
  </div>
</template>
