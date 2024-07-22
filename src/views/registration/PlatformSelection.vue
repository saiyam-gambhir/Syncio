<script setup>
import * as routes from '@/routes';
</script>

<template>
  <section class="mx-auto" style="width: 700px; max-width: 100%;">
    <PageDetails title="Welcome, Let's get started!" content="Free 14 day trial for WooCommerce Destination accounts!" />

    <aside class="auth-wrapper text-center">
      <div class="grid">
        <div class="md:col-6 col-12 pb-0">
          <router-link :to="routes.WOO_CREATE_ACCOUNT" class="text-900">
            <CardWrapper class="platform text-center">
              <template #content>
                <img src="@/assets/images/wo-logo-sm.png" alt="Woocommerce logo" style="height: 150px;" class="mt-3" />
                <h2 class="mt-5 mb-3">Woocommerce</h2>
              </template>
            </CardWrapper>
          </router-link>
        </div>
        <div class="md:col-6 col-12 pb-0 mt-2 sm:mt-0">
          <a href="https://apps.shopify.com/syncio" class="text-900">
            <CardWrapper class="platform text-center">
              <template #content>
                <img src="@/assets/images/shopify-logo-sm.png" alt="Shopify logo" style="height: 150px;" class="mt-3" />
                <h2 class="mt-5 mb-3">Shopify</h2>
              </template>
            </CardWrapper>
          </a>
        </div>
      </div>
    </aside>

    <div class="text-center">
      <router-link :to="routes.LOGIN">
        <Button label="Already have an account? Login here" outlined raised class="p-button-lg outlined-button-hover w-75"></Button>
      </router-link>
    </div>
  </section>
</template>
