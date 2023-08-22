<script setup>
import { onMounted, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';

/* ----- Components ----- */
import Addon from './Addon.vue';
import CardWrapper from '@/components/shared/CardWrapper.vue';

/* ----- Data ----- */
const { selectedPlan, activeAddons } = toRefs(useAuthStore());

/* ----- Mounted ----- */
onMounted(() => {
  selectedPlan.value.addonsSummary = structuredClone(activeAddons.value);
})
</script>

<template>
  <CardWrapper class="mt-6 pb-2" id="addons-wrapper">
    <template #content>
      <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 2: upgrade add-ons</Tag>
      <h2 class="my-2">Upgrade add-ons to suit your needs</h2>
      <p class="mt-0">Downgrade at any time. All add-ons have a <strong>14 day free trial</strong>.</p>

      <div class="grid mt-4 pb-1">
        <div class="md:col-4 lg:col-4 relative p-3" v-for="(options, key) in selectedPlan.available_addons" :key="key">
          <Addon :options="options" :title="key" :addon="activeAddons[key]" />
        </div>
      </div>
    </template>
  </CardWrapper>
</template>
