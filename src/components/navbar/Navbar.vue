<script setup>
import { useAuthStore } from 'auth';
import { useConnectionsStore } from 'connections';
import { useUpgradeDialog } from '@/composables/upgradeDialog';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  isUpgradeDialogRequested,
  showOrdersUpgradeDialog,
  showPayoutsUpgradeDialog,
  showProductSettingsUpgradeDialog,
} = toRefs(useAuthStore());

const {
  closeDialogHandler,
  goToPlanSelectionPage,
} = useUpgradeDialog();

const {
  isConnectionStatusPending,
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const route = useRoute();

/* ----- Computed ----- */
const isSettingsPath = computed(() => {
  const { ACCOUNT_SETTINGS, MARKETPLACE_SETTINGS, NOTIFICATION_SETTINGS, PAYOUTS_SETTINGS, PLAN_AND_BILLINGS, ORDER_PUSH_SETTINGS } = routes;
  const settingsPaths = [ACCOUNT_SETTINGS, MARKETPLACE_SETTINGS, NOTIFICATION_SETTINGS, PAYOUTS_SETTINGS, PLAN_AND_BILLINGS, ORDER_PUSH_SETTINGS];
  return settingsPaths.includes(route.name);
});

</script>

<template>
  <div class="surface-0 h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none surface-0" style="width: 18.5rem">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center flex-shrink-0 header-height px-4">
        <Logo tabindex="0" class="pt-2" />
      </div>

      <!-- Destination Store Navigation -->
      <div class="nav-wrapper select-none">
        <ul v-if="isDestinationStore" class="primary-navigation list-none p-4 px-3 pb-2 m-0">
          <li>
            <NavLink :href="routes.DASHBOARD" iconClass="pi-th-large" linkText="Dashboard" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.MARKETPLACE" iconClass="pi-shopping-bag" linkText="Marketplace" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.STORES" iconClass="pi-link" linkText="Stores" :isLocationPending="isConnectionStatusPending" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.PRODUCTS" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.PRODUCT_SETTINGS" iconClass="pi-wrench" linkText="Product Settings" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.ORDERS" iconClass="pi-file" linkText="Orders" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.PAYOUTS" iconClass="pi-dollar" linkText="Payouts" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.ACTIVITY_CENTER" iconClass="pi-bell" linkText="Activity Center" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.SETTINGS" iconClass="pi-cog" linkText="Settings" :class="{ 'router-link-active': isSettingsPath }" />
          </li>
        </ul>

        <!-- Source Store Navigation -->
        <ul v-else-if="isSourceStore" class="primary-navigation list-none pb-5 pt-4 px-3 m-0">
          <li>
            <NavLink :href="routes.DASHBOARD" iconClass="pi-th-large" linkText="Dashboard" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.MARKETPLACE" iconClass="pi-shopping-bag" linkText="Marketplace" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.STORES" iconClass="pi-link" linkText="Stores" :isLocationPending="isConnectionStatusPending" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.PRODUCTS" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.PRODUCT_SETTINGS" iconClass="pi-wrench" linkText="Product Settings" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.PAYOUTS" iconClass="pi-dollar" linkText="Payouts" />
          </li>
          <li class="mt-1">
            <NavLink :href="routes.SETTINGS" iconClass="pi-cog" linkText="Settings" :class="{ 'router-link-active': isSettingsPath }" />
          </li>
        </ul>
      </div>

      <!-- Addons Usage Indicator -->
      <AddonsUsageIndicator v-if="isDestinationStore" />

      <!-- Addons not available dialog -->
      <DialogWrapper :isVisible="isUpgradeDialogRequested" title="This is an add-on feature" width="600px" @closeDialog="closeDialogHandler">
        <template #body>
          <div class="text-center">
            <template v-if="showOrdersUpgradeDialog">
              <i class="pi pi-file text-primary text-6xl mb-4"></i>
              <h1 class="text-primary">Sync more than just inventory</h1>
              <p class="text-xl line-height-3">
                Order module allow you to push your destination order to source store, <br /> ongoing sync the order's updates and sync back the source store fulfilment for the push orders. Free plans available.
              </p>
              <AppLink label="Learn more" link="https://help.syncio.co/en/articles/4163480-orders-add-on" class="text-xl my-2" />
            </template>

            <template v-else-if="showPayoutsUpgradeDialog">
              <i class="pi pi-dollar text-primary text-6xl mb-4"></i>
              <h1 class="text-primary">Easily keep track of sales and commissions <br />from synced orders</h1>
              <p class="text-xl line-height-3">
                Payouts allows you to create, manage and share payment information with Source stores for simpler earnings settlements (Shopify only). <br> Free plans available.
              </p>
              <AppLink label="Learn more" link="https://help.syncio.co/en/articles/6398970-payouts-add-on-destination-store-side" class="text-xl my-2" />
            </template>

            <template v-else-if="showProductSettingsUpgradeDialog">
              <i class="pi pi-list text-primary text-6xl mb-4"></i>
              <h1 class="text-primary">Sync more than just inventory</h1>
              <p class="text-xl line-height-3">
                Our product sync add-on allows you to sync product and variant attributes such as title, description, images, and much more. <br> Free plans available.
              </p>
              <AppLink label="Learn more" link="https://help.syncio.co/en/articles/3704617-product-settings-add-on" class="text-xl my-2" />
            </template>
          </div>
        </template>

        <template #footer>
          <div class="flex align-items-center justify-content-between">
            <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
            <Button label="Manage Plan" outlined class="mr-0" @click="goToPlanSelectionPage"></Button>
          </div>
        </template>
      </DialogWrapper>
    </div>
  </div>
</template>
