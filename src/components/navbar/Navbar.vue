<script setup>
import Logo from '@/icons/Logo.vue'
import NavLink from '@/components/navbar/NavLink.vue'
</script>

<template>
  <div class="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style="width: 260px;">
    <div class="flex flex-column h-full">
      <div class="flex align-items-center px-4 flex-shrink-0" style="height:60px">
        <Logo tabindex="0" class="pt-1" />
      </div>

      <div class="select-none">
        <ul class="primary-navigation list-none p-3 m-0">
          <li>
            <NavLink linkText="Dashboard" />
          </li>
          <li>
            <NavLink href="/stores" iconClass="pi-link" linkText="Stores" />
          </li>
          <li>
            <NavLink href="/products" iconClass="pi-list" linkText="Products" />
          </li>
          <li>
            <NavLink href="/product-settings" iconClass="pi-cog" linkText="Product Settings" />
          </li>
          <li>
            <NavLink href="/orders" iconClass="pi-file" linkText="Orders" />
          </li>
          <li>
            <NavLink href="/payouts" iconClass="pi-dollar" linkText="Payouts (Beta)" />
          </li>
          <li>
            <NavLink href="/activity-center" iconClass="pi-bell" linkText="Activity Center" />
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
        <!-- Sync Incidator -->
      </div>
    </div>
  </div>
</template>
