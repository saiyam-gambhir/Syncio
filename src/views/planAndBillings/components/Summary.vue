<script setup>
import { toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import CardWrapper from '@/components/shared/CardWrapper.vue';

/* ----- Data ----- */
const { plan, selectedPlan } = toRefs(useAuthStore());
const { formatCurrency } = useFilters();
</script>

<template>
  <CardWrapper style="position: sticky; top: 2rem;">
    <template #content>
      <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 3: Review and approve subscription</Tag>
      <p class="m-0">For paid plans, cancel any time within your <strong>14 day free trial</strong> period and you won't be charged. Free plans are free forever.</p>
      <Divider />
      <h2>Plan Summary</h2>
      <h4 class="uppercase mt-5">Base Plan</h4>
      <div v-if="plan.syncio_plan" class="flex justify-content-between uppercase font-semibold" :class="{ 'strike-through': plan.syncio_plan.id !== selectedPlan?.id }">
        <span>{{ plan.syncio_plan.name }} <span v-if="!plan.syncio_plan.is_active" class="legacy">(legacy)</span></span>
        <span class="tabular-nums">{{ formatCurrency(plan.syncio_plan.price_per_month) }}</span>
      </div>

      <div class="flex justify-content-between uppercase font-semibold mt-2" v-if="(plan.syncio_plan?.id !== selectedPlan?.id)">
        <span>{{ selectedPlan?.name }}</span>
        <span class="tabular-nums">{{ formatCurrency(selectedPlan?.price_per_month) }}</span>
      </div>

      <h4 class="uppercase mt-5">Add-ons</h4>
    </template>
  </CardWrapper>
</template>
