<script setup>
import * as routes from '@/routes';
</script>
<template>
  <div class="w-50 text-center p-8 mt-6 ml-auto mr-auto" style="background: rgba(255,183,4,.12);">
    <h3 class="text-5xl line-height-2">Awesome products and long lasting partnerships, all in one place</h3>
    <p class="mt-6 px-8 text-2xl line-height-3">Connect with like-minded stores to share inventory and boost sales.</p>
    <p class="mt-6 px-8 text-2xl line-height-3">Syncio Marketplace is now in Alpha testing. Create your profile now to get
      instant exclusive access.</p>
    <router-link :to="routes.MARKETPLACE_SETTINGS">
      <Button class="mt-4">Create profile</Button>
    </router-link>
  </div>
  <div class="mt-8">
    <h3 class="text-4xl text-center">How it works</h3>
  </div>
  <div class="mt-6">
    <div class="w-50 flex ml-auto mr-auto">
      <div class="m-4 p-4 w-20 text-center text-lg">
        <div class="mb-4">
        </div>
        <div>
          Search and browse for partners
        </div>
      </div>
      <div class="m-4 p-4 w-20 text-center text-lg">
        <div class="mb-4">
        </div>
        <div>
          Message the partner store and agree to the terms
        </div>
      </div>
      <div class="m-4 p-4 w-20 text-center text-lg">
        <div class="mb-4">
        </div>
        <div>
          Seamlessly connect using your unique store key
        </div>
      </div>
      <div class="m-4 p-4 w-20 text-center text-lg">
        <div class="mb-4">
        </div>
        <div>
          Share inventory and grow together
        </div>
      </div>
    </div>
  </div>Í
</template>