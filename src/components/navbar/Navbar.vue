<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useConnectionsStore } from '@/stores/connections'
import { useRoute } from 'vue-router'
import { useUpgradeDialog } from '@/composables/upgradeDialog'

/* ----- COMPONENTS ----- */
import AppLink from '@/components/shared/AppLink.vue'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'
import Logo from '@/icons/Logo.vue'
import NavLink from '@/components/navbar/NavLink.vue'
import SyncIndicator from '@/components/navbar/SyncIndicator.vue'

/* ----- DATA ----- */
const { closeDialogHandler, goToPlanSelectionPage, showUpgradeDialogHandler } = useUpgradeDialog()
const auth = useAuthStore()
const connectionsStore = useConnectionsStore()
const route = useRoute()

const isPathSettings = computed(() => {
  return route.name === 'product-settings'
})
</script>

<template>
  <div class="surface-0 h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none surface-0" style="width: 19rem">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center flex-shrink-0 justify-content-center header-height px-4">
        <Logo tabindex="0" class="pt-2" />
      </div>

      <div class="nav-wrapper select-none">
        <ul v-if="connectionsStore.isDestinationStore" class="primary-navigation list-none pb-5 pt-4 px-3  m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li class="mt-2">
            <NavLink href="/marketplace" iconClass="pi-shopping-bag" linkText="Syncio Marketplace" />
          </li>
          <li class="mt-2">
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" :isLocationPending="connectionsStore.isConnectionStatusPending" />
          </li>
          <li class="mt-2">
            <NavLink href="/products" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-2">
            <NavLink v-if="auth.isOrderModuleAvailable" href="/orders" iconClass="pi-file" linkText="Orders" />
            <NavLink v-else :href="$route.path" iconClass="pi-file" linkText="Orders" disabled @click="showUpgradeDialogHandler('orders')" />
          </li>
          <li class="mt-2">
            <NavLink v-if="auth.isPayoutsModuleAvailable" href="/payouts" iconClass="pi-dollar" linkText="Payouts" />
            <NavLink v-else :href="$route.path" iconClass="pi-dollar" linkText="Payouts" disabled @click="showUpgradeDialogHandler('payouts')" />
          </li>
          <li class="mt-2">
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
          <li class="mt-2">
            <NavLink href="/settings" iconClass="pi-cog" :class="{ 'router-link-active': isPathSettings }" linkText="Settings" />
          </li>
        </ul>

        <ul v-else class="primary-navigation list-none pb-5 pt-4 px-3  m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li class="mt-2">
            <NavLink href="/marketplace" iconClass="pi-shopping-bag" linkText="Syncio Marketplace" />
          </li>
          <li class="mt-2">
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" :isLocationPending="connectionsStore.isConnectionStatusPending" />
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

      <SyncIndicator />

      <DialogWrapper :isVisible="auth.isUpgradeDialogRequested" title="This is an add-on feature" width="600px" @closeDialog="closeDialogHandler">
        <template #body>
          <div class="text-center">
            <template v-if="auth.showOrdersUpgradeDialog">
              <i class="pi pi-file text-primary text-6xl mb-4"></i>
              <h1 class="text-primary">Sync more than just inventory</h1>
              <p class="text-xl line-height-3">Order module allow you to push your destination order to source store, <br> ongoing sync the order's updates and sync back the source store <br> fulfilment for the push orders.</p>
              <AppLink label="Learn more" link="https://help.syncio.co/en/articles/4163480-orders-add-on" class="text-xl my-2" />
            </template>

            <template v-else-if="auth.showPayoutsUpgradeDialog">
              <i class="pi pi-dollar text-primary text-6xl mb-4"></i>
              <h1 class="text-primary">Easily keep track of sales and commissions <br> from synced orders</h1>
              <p class="text-xl line-height-3">Payouts allows you to create, manage and share payment information with Source stores for simpler earnings settlements (Shopify only).</p>
              <AppLink label="Learn more" link="https://help.syncio.co/en/articles/6398970-payouts-add-on-destination-store-side" class="text-xl my-2" />
            </template>

            <template v-else-if="auth.showProductSettingsUpgradeDialog">
              <i class="pi pi-list text-primary text-6xl mb-4"></i>
              <h1 class="text-primary">Sync more than just inventory</h1>
              <p class="text-xl line-height-3">Our product sync add-on allows you to sync product and variant attributes such as title, description, images, <br> and much more.</p>
              <AppLink label="Learn more" link="https://help.syncio.co/en/articles/3704617-product-settings-add-on" class="text-xl my-2" />
            </template>
          </div>
        </template>

        <template #footer>
          <div class="flex align-items-center justify-content-between">
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
            <Button icon="pi pi-arrow-right" iconPos="right" label="Upgrade Plan" class="p-button-lg mr-0" @click="goToPlanSelectionPage"></Button>
          </div>
        </template>
      </DialogWrapper>
    </div>
  </div>
</template>
