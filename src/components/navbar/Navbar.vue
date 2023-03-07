<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import Logo from '@/icons/Logo.vue'
import NavLink from '@/components/navbar/NavLink.vue'
import SyncIndicator from '@/components/navbar/SyncIndicator.vue'

/* ===== DATA ===== */
const auth = useAuthStore()
const connectionsStore = useConnectionsStore()

/* ===== COMPUTED ===== */
const isDestinationStore = computed(() => {
  return connectionsStore.storeType === 'destination'
})

/* ===== METHODS ===== */
const showUpgradeOrderModuleDialog = () => {
  alert('Orders')
}

const showUpgradePayoutsModuleDialog = () => {
  alert('Payouts')
}
</script>

<template>
  <div class="surface-card h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style="width: 19rem">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center flex-shrink-0 justify-content-center header-height px-4">
        <Logo tabindex="0" class="pt-2" />
      </div>

      <div class="nav-wrapper select-none">
        <ul v-if="isDestinationStore" class="primary-navigation list-none pb-5 pt-4 px-3  m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li class="mt-2">
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" :isLocationPending="connectionsStore.isConnectionStatusPending" />
          </li>
          <li class="mt-2">
            <NavLink href="/products" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-2">
            <NavLink v-if="auth.isOrderModuleAvailable" href="/orders" iconClass="pi-file" linkText="Orders" />
            <NavLink v-else :href="$route.path" iconClass="pi-file" linkText="Orders" disabled @click="showUpgradeOrderModuleDialog" />
          </li>
          <li class="mt-2">
            <NavLink v-if="auth.isOrderModuleAvailable" href="/payouts" iconClass="pi-dollar" linkText="Payouts" />
            <NavLink v-else :href="$route.path" iconClass="pi-dollar" linkText="Payouts" disabled @click="showUpgradePayoutsModuleDialog" />
          </li>
          <li class="mt-2">
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
          <li class="mt-2">
            <NavLink href="/settings" iconClass="pi-cog" linkText="Settings" />
          </li>
        </ul>

        <ul v-else class="primary-navigation list-none pb-5 pt-4 px-3  m-0">
          <li>
            <NavLink linkText="Dashboard" />
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
    </div>
  </div>
</template>
