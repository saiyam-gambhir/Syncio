<script setup>
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import CardWrapper from '@/components/shared/CardWrapper.vue';

/* ----- Data ----- */
const { formatCurrency } = useFilters();

/* ----- Props ----- */
const props = defineProps({
  plan: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <CardWrapper>
    <template #content>
      <h3 class="m-0 uppercase">{{ plan.name }}</h3>
      <h2 class="mt-4 mb-1 font-normal">{{ plan.sync_product_limit }}</h2>
      <h3 class="m-0">products</h3>
      <h3 class="mt-4 mb-0 font-semibold">{{ formatCurrency(plan.price_per_month) }}/ month</h3>
    </template>
  </CardWrapper>
</template>
