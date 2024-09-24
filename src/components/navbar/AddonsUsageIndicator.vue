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
} = toRefs(usePlanStore());

const {
  isShopify,
  isShopline,
  isWoocommerce,
} = toRefs(useConnectionsStore());

const stripeLoginUrl = computed(() => {
  return import.meta.env.VITE_NODE_ENV === 'development' ? 'https://billing.stripe.com/p/login/test_8wM01M04Y5y9blK4gg' : 'https://billing.stripe.com/p/login/00gg0xgf5eaecyk7ss';
});
</script>

<template>
  <div class="mt-auto p-3" style="background: #f8f9fa;">
    <CardWrapper>
      <template #content>
        <AddonUsage v-if="plan" title="Products Synced" :limitUsed="productsSynced" :limitAvailable="productsSyncedLimit"></AddonUsage>
        <AddonUsage v-if="addons.isOrderModuleAvailable" title="Orders Pushed" :limitUsed="ordersPushed" :limitAvailable="ordersPushLimit"></AddonUsage>
        <AddonUsage v-if="addons.isPayoutsModuleAvailable" title="Payouts Processed" :limitUsed="payoutsProcessed" :limitAvailable="payoutsProcessLimit"></AddonUsage>
        <router-link v-if="isShopify || isShopline" :to="routes.PLAN_AND_BILLINGS">
          <Button label="Manage" class="mt-4 font-bold justify-content-center w-full"></Button>
        </router-link>
        <a v-if="isWoocommerce && plan" :href="stripeLoginUrl" class="p-button mt-4 font-bold justify-content-center w-full">Manage</a>
        <router-link v-else-if="isWoocommerce && !plan" :to="routes.WOO_PLAN_SELECTION">
          <Button label="Select plan" class="mt-4 font-bold justify-content-center w-full"></Button>
        </router-link>
      </template>
    </CardWrapper>
  </div>
</template>
