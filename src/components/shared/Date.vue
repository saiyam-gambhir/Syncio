<script setup>
import { useFilters } from '@/composables/filters'

/* ===== DATA ===== */
const { formatDate } = useFilters()

/* ===== PROPS ===== */
const props = defineProps({
  date: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-column date">
    <span class="text-sm font-semibold">{{ formatDate(date).date }}</span>
    <span class="text-xs mt-2">{{ formatDate(date).time }}</span>
  </div>
</template>
