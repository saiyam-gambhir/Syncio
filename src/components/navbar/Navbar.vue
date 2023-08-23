<script setup>
import { computed } from 'vue';
import { useConnectionsStore } from '@/stores/connections';
import { useRoute } from 'vue-router';
import * as routes from '@/routes';

/* ----- Components ----- */
import AddonsUsageIndicator from './AddonsUsageIndicator.vue';
import Logo from '@/icons/Logo.vue';
import NavLink from '@/components/navbar/NavLink.vue';

/* ----- Data ----- */
const { isConnectionStatusPending, isDestinationStore } = useConnectionsStore();
const route = useRoute();

/* ----- Computed ----- */
const isSettingsPath = computed(() => {
  const { ACCOUNT_SETTINGS, MARKETPLACE_SETTINGS, NOTIFICATION_SETTINGS, PAYOUTS_SETTINGS, PLAN_AND_BILLINGS } = routes;
  const settingsPaths = [ACCOUNT_SETTINGS, MARKETPLACE_SETTINGS, NOTIFICATION_SETTINGS, PAYOUTS_SETTINGS, PLAN_AND_BILLINGS];
  return settingsPaths.includes(route.name);
});

</script>

<template>
  <div class="surface-0 h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none surface-0" style="width: 19rem">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center flex-shrink-0 justify-content-center header-height px-4">
        <Logo tabindex="0" class="pt-2" />
      </div>

      <!-- Destination Store Navigation -->
      <div class="nav-wrapper select-none">
        <ul v-if="isDestinationStore" class="primary-navigation list-none p-4 pb-2 m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li class="mt-2">
            <NavLink href="/marketplace" iconClass="pi-shopping-bag" linkText="Syncio Marketplace" />
          </li>
          <li class="mt-2">
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" :isLocationPending="isConnectionStatusPending" />
          </li>
          <li class="mt-2">
            <NavLink href="/products" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-2">
            <NavLink href="/settings/product-settings" iconClass="pi-cog" linkText="Product Settings" />
          </li>
          <li class="mt-2">
            <NavLink href="/orders" iconClass="pi-file" linkText="Orders" />
          </li>
          <li class="mt-2">
            <NavLink href="/payouts" iconClass="pi-dollar" linkText="Payouts" />
          </li>
          <li class="mt-2">
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
          <li class="mt-2">
            <NavLink href="/settings" iconClass="pi-cog" :class="{ 'router-link-active': isSettingsPath }" linkText="Settings" />
          </li>
        </ul>

        <!-- Source Store Navigation -->
        <ul v-else class="primary-navigation list-none pb-5 pt-4 px-3 m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li class="mt-2">
            <NavLink href="/marketplace" iconClass="pi-shopping-bag" linkText="Syncio Marketplace" />
          </li>
          <li class="mt-2">
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" :isLocationPending="isConnectionStatusPending" />
          </li>
          <li class="mt-2">
            <NavLink href="/products" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-2">
            <NavLink href="/payouts" iconClass="pi-dollar" linkText="Payouts" />
          </li>
          <li class="mt-2">
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
          <li class="mt-2">
            <NavLink href="/settings" iconClass="pi-cog" linkText="Settings" />
          </li>
        </ul>
      </div>

      <!-- Addons Usage Indicator -->
      <AddonsUsageIndicator />
    </div>
  </div>
</template>
