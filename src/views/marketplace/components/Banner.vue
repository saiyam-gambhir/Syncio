<script setup>
import * as routes from '@/routes';
import MarketPlaceImageUrl from '@/assets/images/marketplace.svg';

/* ----- Data ----- */
const {
  isShopline,
} = toRefs(useConnectionsStore());
</script>

<template>
  <div class="text-center p-8 pt-6 text-900" style="background: #FFFBF1;">
    <img :src="`${MarketPlaceImageUrl}`" :alt="`${MarketPlaceImageUrl}`" style="height: 11rem;" class="mb-5" />
    <h3 class="text-5xl">
      Awesome products and long lasting <br> partnerships, all in one place
    </h3>
    <template v-if="isShopline">
      <p class="m-0 mt-4 text-2xl line-height-3">
        Syncio Marketplace is coming soon. Connect with like-<br>minded stores to share inventory and boost sales.
      </p>
      <p class="m-0 mt-4 text-2xl line-height-3">
        Register for early access and exclusive updates 🚀
      </p>
      <a href="https://us18.list-manage.com/survey?u=d3876b95496c25d2e8d7568bb&id=fe9717a527&attribution=false" target="_blank">
        <Button class="p-button-lg mt-6 px-6" label="Register" />
      </a>
    </template>
    <template v-else>
      <p class="m-0 mt-4 text-2xl line-height-3">
        Connect with like-minded stores to share <br> inventory and boost sales.
      </p>
      <p class="m-0 mt-4 text-2xl line-height-3">
        Syncio Marketplace is now in Alpha testing.<br> Create your profile now to get instant exclusive access.
      </p>
      <router-link :to="routes.MARKETPLACE_SETTINGS">
        <Button class="p-button-lg mt-6 px-6" label="Create profile" />
      </router-link>
    </template>
  </div>

  <div class="p-8 line-height-2">
    <div class="flex align-items-center justify-content-evenly">
      <h3 class="text-4xl font-semi m-0">Join our fast growing <br> community of like <br> minded stores</h3>
      <div class="flex">
        <h3 class="text-5xl font-semibold m-0 mr-4">800+ <br> stores</h3>
        <h3 class="text-5xl font-semibold m-0 ml-8">200000+ <br> products</h3>
      </div>
    </div>
  </div>

  <div class="p-8" style="background: #F1FBFF;">
    <h3 class="text-4xl text-center">How it works</h3>

    <div class="grid mt-6 text-lg font-semibold line-height-3">
      <div class="col col-3 text-center">
        <CardWrapper class="h-100">
          <template #content>
            <div class="mb-3">
              <i class="pi pi-search text-6xl"></i>
            </div>
            <div class="md:px-4 lg:px-6">Search and browse for partners</div>
          </template>
        </CardWrapper>
      </div>
      <div class="col col-3 text-center">
        <CardWrapper class="h-100">
          <template #content>
            <div class="mb-3">
              <i class="pi pi-envelope text-6xl"></i>
            </div>
            <div class="md:px-4 lg:px-6">Message the partner store and agree to the terms</div>
          </template>
        </CardWrapper>
      </div>
      <div class="col col-3 text-center">
        <CardWrapper class="h-100">
          <template #content>
            <div class="mb-3">
              <i class="pi pi-link text-6xl"></i>
            </div>
            <div class="md:px-4 lg:px-6">Seamlessly connect using your unique store key</div>
          </template>
        </CardWrapper>
      </div>
      <div class="col col-3 text-center">
        <CardWrapper class="h-100">
          <template #content>
            <div class="mb-3">
              <i class="pi pi-dollar text-6xl"></i>
            </div>
            <div class="md:px-4 lg:px-6">Share inventory and grow together</div>
          </template>
        </CardWrapper>
      </div>
    </div>
  </div>

  <div v-if="isShopline" class="p-8 line-height-2 text-center">
    <h3 class="text-4xl font-semi">Register now to get early access to the best <br> products, brands and distribution partners</h3>
    <a href="https://us18.list-manage.com/survey?u=d3876b95496c25d2e8d7568bb&id=fe9717a527&attribution=false" target="_blank">
      <Button class="p-button-lg mt-2 px-6" label="Register" />
    </a>
  </div>
</template>
