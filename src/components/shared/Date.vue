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

  horizontal: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <div v-if="horizontal">
    <span>{{ formatDate(date).date }}</span>, <span>{{ formatDate(date).time }}</span>
  </div>
  <div v-else class="flex flex-column date">
    <span>{{ formatDate(date).date }}</span>
    <span class="text-sm mt-2">{{ formatDate(date).time }}</span>
  </div>
</template>
