<script setup>
import { toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

/* ----- Components ----- */
import AddonUsage from './AddonUsage.vue';
import CardWrapper from '@/components/shared/CardWrapper.vue';

/* ----- Data ----- */
const { plan, productsSynced, productsSyncedLimit, ordersPushed, ordersPushLimit, payoutsProcessed, payoutsProcessLimit } = toRefs(useAuthStore());
const route = useRoute();
</script>

<template>
  <div class="mt-auto pt-4 px-4" :class="{ 'pb-4': route.name !== 'planAndBillings' }" style="background: #f8f9fa;">
    <CardWrapper>
      <template #content>
        <AddonUsage v-if="plan" title="Products Synced" :limitUsed="productsSynced" :limitAvailable="productsSyncedLimit"></AddonUsage>
        <AddonUsage v-if="plan" title="Orders Pushed" :limitUsed="ordersPushed" :limitAvailable="ordersPushLimit"></AddonUsage>
        <AddonUsage v-if="plan" title="Payouts Processed" :limitUsed="payoutsProcessed" :limitAvailable="payoutsProcessLimit"></AddonUsage>
        <router-link to="/settings/plan-and-billings" v-if="route.name !== 'planAndBillings'">
          <Button label="Manage" class="mt-4 font-bold justify-content-center w-full"></Button>
        </router-link>
      </template>
    </CardWrapper>
  </div>
</template>
