<script setup>
import * as routes from '@/routes';
</script>

<template>
  <div class="text-center">
    <h1 class="text-5xl line-height-3 m-0 font-bold">
      Welcome, Let's get started!
    </h1>

    <p class="font-semibold text-2xl line-height-3 mt-2 mb-6">
      Free 14 day trial for WooCommerce Destination accounts!
    </p>
  </div>
  <aside class="auth-wrapper text-center" style="width: 150%; margin-left: -25%;">
    <div class="grid">
      <div class="col-4 py-0">
        <CardWrapper class="platform text-center">
          <template #content>
            <img src="@/assets/images/wo-logo-sm.png" alt="Woocommerce logo" style="height: 150px;" class="mt-3" />
            <h2 class="mt-5 mb-3">Woocommerce</h2>
          </template>
        </CardWrapper>
      </div>
      <div class="col-4 py-0">
        <CardWrapper class="platform text-center">
          <template #content>
            <img src="@/assets/images/shopify-logo-sm.png" alt="Shopify logo" style="height: 150px;" class="mt-3" />
            <h2 class="mt-5 mb-3">Shopify</h2>
          </template>
        </CardWrapper>
      </div>
      <div class="col-4 py-0">
        <CardWrapper class="platform text-center">
          <template #content>
            <img src="@/assets/images/shopline_logo.png" alt="Shopify logo" style="height: 150px;" class="mt-3" />
            <h2 class="mt-5 mb-3">Shopline</h2>
          </template>
        </CardWrapper>
      </div>
    </div>
  </aside>

  <div class="text-center">
    <router-link :to="routes.LOGIN">
      <Button label="Already have an account? Login here" outlined raised class="p-button-lg outlined-button-hover w-75 mt-6"></Button>
    </router-link>
  </div>
</template>

<style scoped>
.platform {
  background: rgba(255, 255, 255, .5) !important;
  cursor: pointer;
  transition: .25s background;

  &:hover {
    background: rgba(255, 255, 255, 1) !important;
  }
}
</style>
