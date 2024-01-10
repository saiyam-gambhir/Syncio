<script setup>
import * as routes from '@/routes';
</script>

<template>
  <div class="w-75 m-auto text-center px-3 py-6 text-900" style="background: rgba(255,183,4,.2); border-radius: 6px;">
    <h3 class="text-5xl">
      Awesome products and long lasting <br> partnerships, all in one place
    </h3>
    <p class="m-0 mt-4 text-2xl line-height-3">
      Connect with like-minded stores to share <br> inventory and boost sales.
    </p>
    <p class="m-0 mt-4 text-2xl line-height-3">
      Syncio Marketplace is now in Alpha testing.<br> Create your profile now to get instant exclusive access.
    </p>
    <router-link :to="routes.MARKETPLACE_SETTINGS">
      <Button class="p-button-lg mt-6" label="Create profile" />
    </router-link>
  </div>

  <div class="w-100 m-auto mt-8 pt-2">
    <h3 class="text-4xl text-center">How it works</h3>

    <div class="grid mt-6 text-lg font-semibold line-height-3">
      <div class="col col-3 text-center">
        <CardWrapper>
          <template #content>
            <div class="mb-3">
              <i class="pi pi-search text-6xl"></i>
            </div>
            <div>Search and browse for <br> partners</div>
          </template>
        </CardWrapper>
      </div>
      <div class="col col-3 text-center">
        <CardWrapper>
          <template #content>
            <div class="mb-3">
              <i class="pi pi-envelope text-6xl"></i>
            </div>
            <div>Message the partner store <br> and agree to the terms</div>
          </template>
        </CardWrapper>
      </div>
      <div class="col col-3 text-center">
        <CardWrapper>
          <template #content>
            <div class="mb-3">
              <i class="pi pi-link text-6xl"></i>
            </div>
            <div>Seamlessly connect using <br> your unique store key</div>
          </template>
        </CardWrapper>
      </div>
      <div class="col col-3 text-center">
        <CardWrapper>
          <template #content>
            <div class="mb-3">
              <i class="pi pi-dollar text-6xl"></i>
            </div>
            <div>Share inventory and grow <br> together</div>
          </template>
        </CardWrapper>
      </div>
    </div>
  </div>
</template>
