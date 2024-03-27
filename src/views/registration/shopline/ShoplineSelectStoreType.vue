<script setup>
import { useRoute, useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const loading = ref(false);
const loadingStoreType = ref(false);

const {
  isAuthenticated,
  saveShoplineToken,
  updateStoreType,
} = toRefs(useAuthStore());

const route = useRoute();
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  loading.value = true;
  let params = route.query;
  params.store_id = params.handle + '.myshopline.com';
  if(params.store_id) {
    await saveShoplineToken.value(params);
    loading.value = false;
  }
});

/* ----- Methods ----- */
const updateStoreTypeHandler = async (storeType) => {
  loadingStoreType.value = true;
  const response = await updateStoreType.value(storeType);
  if(response?.success) {
    await router.push({ name: routes.SHOPIFY_CONNECT_OR_INVITE_STORE });
    isAuthenticated.value = true;
    loadingStoreType.value = true;
  }
};
</script>

<template>
  <Loading v-if="loading" />
  <section v-else class="mx-auto" style="width: 900px;">
    <PageDetails title="Select store type" content="" />

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
              <Button :loading="loadingStoreType" label="Select store type" class="p-button-lg w-100 mt-2" @click="updateStoreTypeHandler('source')"></Button>
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
              <Button :loading="loadingStoreType" label="Select store type" class="p-button-lg w-100 mt-2" @click="updateStoreTypeHandler('destination')"></Button>
            </template>
          </CardWrapper>
        </div>
      </div>
    </aside>
  </section>
</template>
