<script setup>
import { ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import Logo from '@/icons/Logo.vue'
import NavLink from '@/components/navbar/NavLink.vue'
import SyncIndicator from '@/components/navbar/SyncIndicator.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const value = ref(10)
</script>

<template>
  <div class="surface-card h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style="width: 20rem;">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center flex-shrink-0 justify-content-center header-height px-4">
        <Logo tabindex="0" class="pt-2" />
      </div>

      <div class="nav-wrapper select-none">
        <ul class="primary-navigation list-none px-3 py-5 m-0">
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
            <NavLink href="/product-settings" iconClass="pi-cog" linkText="Product Settings" />
          </li>
          <li class="mt-2">
            <NavLink href="/orders" iconClass="pi-file" linkText="Orders" />
          </li>
          <li class="mt-2">
            <NavLink href="/payouts" iconClass="pi-dollar" linkText="Payouts (Beta)" />
          </li>
          <li class="mt-2">
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
          <li class="mt-2">
            <NavLink href="/plan-and-billings" iconClass="pi-shopping-bag" linkText="Plan and Billings" />
          </li>
          <li class="mt-2">
            <NavLink href="/account-settings" iconClass="pi-wrench" linkText="Account Settings" />
          </li>
          <li class="mt-2">
            <a aria-current="page" href="javascript:void(0)" class="flex align-items-center justify-content-between cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-underline">
              <div>
                <i class="pi mr-3 pi-power-off"></i>
                <span>Logout</span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <SyncIndicator />
    </div>
  </div>
</template>
