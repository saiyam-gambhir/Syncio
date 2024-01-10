<script setup>
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
  wooPlanSelectionLink,
} = toRefs(usePlanStore());

const {
  isShopify,
  isWoocommerce,
} = toRefs(useConnectionsStore());
</script>

<template>
  <div class="mt-auto p-3" style="background: #f8f9fa;">
    <CardWrapper>
      <template #content>
        <AddonUsage v-if="plan" title="Products Synced" :limitUsed="productsSynced" :limitAvailable="productsSyncedLimit"></AddonUsage>
        <AddonUsage v-if="addons.isOrderModuleAvailable" title="Orders Pushed" :limitUsed="ordersPushed" :limitAvailable="ordersPushLimit"></AddonUsage>
        <AddonUsage v-if="addons.isPayoutsModuleAvailable" title="Payouts Processed" :limitUsed="payoutsProcessed" :limitAvailable="payoutsProcessLimit"></AddonUsage>
        <router-link v-if="isShopify" :to="routes.PLAN_AND_BILLINGS">
          <Button label="Manage" class="mt-4 font-bold justify-content-center w-full"></Button>
        </router-link>
        <a v-if="isWoocommerce" :href="wooPlanSelectionLink" class="p-button mt-4 font-bold justify-content-center w-full">Manage</a>
      </template>
    </CardWrapper>
  </div>
</template>
