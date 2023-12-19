<script setup>
import { useRoute } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  addons,
  ordersPushed,
  ordersPushLimit,
  payoutsProcessed,
  payoutsProcessLimit,
  plan,
  productsSynced,
  productsSyncedLimit,
} = toRefs(usePlanStore());

const route = useRoute();
</script>

<template>
  <div class="mt-auto pt-4 px-4" :class="{ 'pb-4': route.name !== 'planAndBillings' }" style="background: #f8f9fa;">
    <CardWrapper>
      <template #content>
        <AddonUsage v-if="plan" title="Products Synced" :limitUsed="productsSynced" :limitAvailable="productsSyncedLimit"></AddonUsage>
        <AddonUsage v-if="addons.isOrderModuleAvailable" title="Orders Pushed" :limitUsed="ordersPushed" :limitAvailable="ordersPushLimit"></AddonUsage>
        <AddonUsage v-if="addons.isPayoutsModuleAvailable" title="Payouts Processed" :limitUsed="payoutsProcessed" :limitAvailable="payoutsProcessLimit"></AddonUsage>
        <router-link :to="routes.PLAN_AND_BILLINGS" v-if="route.name !== 'planAndBillings'">
          <Button label="Manage" class="mt-4 font-bold justify-content-center w-full"></Button>
        </router-link>
      </template>
    </CardWrapper>
  </div>
</template>
