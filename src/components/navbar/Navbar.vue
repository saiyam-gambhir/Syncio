<script setup>
import Logo from '@/icons/Logo.vue'
import NavLink from '@/components/navbar/NavLink.vue'
</script>

<template>
  <div class="surface-card h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style="width: 260px;">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center flex-shrink-0 justify-content-center header-height px-4">
        <Logo tabindex="0" class="pt-2" />
      </div>

      <div class="select-none">
        <ul class="primary-navigation list-none px-3 py-5 m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li class="mt-1">
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" />
          </li>
          <li class="mt-1">
            <NavLink href="/products" iconClass="pi-list" linkText="Products" />
          </li>
          <li class="mt-1">
            <NavLink href="/product-settings" iconClass="pi-cog" linkText="Product Settings" />
          </li>
          <li class="mt-1">
            <NavLink href="/orders" iconClass="pi-file" linkText="Orders" />
          </li>
          <li class="mt-1">
            <NavLink href="/payouts" iconClass="pi-dollar" linkText="Payouts (Beta)" />
          </li>
          <li class="mt-1">
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <!-- Sync Incidator -->
      </div>
    </div>
  </div>
</template>
