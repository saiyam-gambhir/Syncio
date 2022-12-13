<script setup>
import Logo from '@/icons/Logo.vue'
import NavLink from '@/components/navbar/NavLink.vue'
</script>

<template>
  <div class="h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 select-none surface-ground border-right-1 lg:border-right-none surface-border" style="width:250px">
    <div class="flex flex-column h-full">
      <div class="overflow-y-auto">

        <div class="flex align-items-center justify-content-start flex-shrink-0 px-3" style="height: 60px;">
          <Logo tabindex="0" />
        </div>

        <div class="select-none">
          <ul class="list-none m-0 p-0">
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
      </div>
    </div>
  </div>
</template>
