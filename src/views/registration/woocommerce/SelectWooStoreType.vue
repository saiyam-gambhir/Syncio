<script setup>
import * as routes from '@/routes';
import router from '@/router';

const setWooStoreType = (storeType) => {
  window.sessionStorage.setItem('woo-store-type', storeType);
  router.push({ name: routes.WOO_VERIFY_STORE_URL });
};
</script>

<template>
  <section class="mx-auto relative" style="width: 900px;">
    <router-link :to="routes.WOO_CONTINUE_LATER" class="fixed z-1" style="right: 2.5rem; top: 2.3rem;">
      <Button label="Signout, continue later" class="font-bold justify-content-center"></Button>
    </router-link>
    <ul class="mx-auto list-none p-0 py-6 flex flex-row" style="top: 1.5rem;">
      <Step title="Store Type" subTitle="Source or destination?" :isCurrent="true" />
      <Step title="Connect Store" subTitle="Verify your store" />
      <Step title="Permissions" subTitle="Review store access" :isLast="true" />
    </ul>
    <PageDetails title="Select store type" />

    <aside class="auth-wrapper text-900">
      <div class="grid">
        <div class="col-6 pb-0">
          <CardWrapper class="font-semibold">
            <template #content>
              <div class="flex align-items-end justify-content-center" style="height: 80px;">
                <img src="@/assets/images/source-store.png" alt="Source store" style="width: 160px;" />
              </div>
              <h2 class="text-3xl text-center m-0 pt-4">Source Store</h2>
              <Divider />
              <p class="m-0 mt-2">This store is source of truth for all original inventory and product information.</p>
              <p class="m-0 mt-3">This account fulfills and ships orders from connected stores.</p>
              <p class="m-0 mt-3">Examples:</p>
              <ul class="m-0 mt-2 pl-3">
                <li>The primary online store</li>
                <li class="mt-1">Store connected to the source warehouses</li>
                <li class="mt-1">Supplies stock to other retailers</li>
                <li class="mt-1">A brand store</li>
              </ul>
              <Divider />
              <Button label="Select store type" class="p-button-lg w-100 mt-2" @click="setWooStoreType('source')"></Button>
            </template>
          </CardWrapper>
        </div>
        <div class="col-6 pb-0">
          <CardWrapper class="font-semibold">
            <template #content>
              <div class="store-image flex align-items-end justify-content-center" style="height: 80px;">
                <img src="@/assets/images/destination-store.png" alt="Destination store" style="width: 160px;" />
              </div>
              <h2 class="text-3xl text-center m-0 pt-4">Destination Store</h2>
              <Divider />
              <p class="m-0 mt-2">This store syncs inventory and product information from a source store.</p>
              <p class="m-0 mt-3">This store creates orders containing synced products for other stores to fulfill.</p>
              <p class="m-0 mt-3">Examples:</p>
              <ul class="m-0 mt-2 pl-3">
                <li>Expansion store (different region)</li>
                <li class="mt-1">Third party retailer</li>
                <li class="mt-1">Dropshipping store</li>
                <li class="mt-1">Extra sales channel to the source</li>
              </ul>
              <Divider />
              <Button label="Select store type" class="p-button-lg w-100 mt-2" @click="setWooStoreType('destination')"></Button>
            </template>
          </CardWrapper>
        </div>
      </div>
    </aside>
  </section>
</template>
