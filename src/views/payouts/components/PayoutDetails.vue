<script setup>
import { useFilters } from '@/composables/filters';
import { usePayoutsStore } from 'payouts';

/* ----- Data ----- */
const {
  formatCurrency,
  formattedUnderscoreText,
  formatDate,
} = useFilters();

const {
  isViewPayoutDetailsRequested,
} = toRefs(usePayoutsStore());

/* ----- Props ----- */
const props = defineProps({
  payout: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <Sidebar v-model:visible="isViewPayoutDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        Payout {{ payout?.id }}
        <!-- <Button
          :disabled="isPreviousOrderButtonDisabled"
          @click="fetchPreviousOrderSummary"
          class="p-button-sm ml-3"
          label="Previous Order"
          outlined>
        </Button>

        <Button
          :disabled="isNextOrderButtonDisabled"
          @click="fetchNextOrderSummary"
          class="p-button-sm ml-3"
          label="Next Order"
          outlined>
        </Button> -->
      </h1>
    </template>

    <!-- <OrderDetailsSkeleton v-if="loadingOrder" /> -->

    <div class="grid mt-4">
    </div>
  </Sidebar>
</template>
