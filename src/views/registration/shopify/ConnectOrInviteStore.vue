<script setup>
import { useRoute, useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  storeKey,
  partnerStoreType,
  isDestinationStore,
  connectTestStore,
} = toRefs(useConnectionsStore());

const route = useRoute();
const router = useRouter();

/* ----- Methods ----- */
</script>

<template>
  <section class="mx-auto" style="width: 900px;">
    <PageDetails :title="`Connect to your first ${partnerStoreType}!`" content="" />

    <aside class="auth-wrapper text-900 text-center">
      <h3>Your store's unique key:</h3>
      <h3 class="text-4xl font-semi" style="color: #fa757b; letter-spacing: 1.5px;">{{ storeKey || '658adff94608e' }}</h3>
      <p class="text-lg line-height-3 m-0">Share your unique key with source stores to start importing their products to sell on your store.</p>
      <p class="text-lg line-height-3 mt-1">This unique key can also be found on your dashboard after completing this setup process.</p>
      <Divider />

    </aside>

    <div class="text-center">
      <router-link :to="routes.PLAN_AND_BILLINGS">
        <Button label="Skip for now" class="my-6 font-bold justify-content-center" @click="connectTestStore"></Button>
      </router-link>
    </div>
  </section>
</template>
