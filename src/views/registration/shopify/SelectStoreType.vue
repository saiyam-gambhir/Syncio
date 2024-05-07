<script setup>
import { useRoute, useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const loading = ref(false);
const loadingStoreType = ref(false);
const selectedStoreType = ref('');

const {
  isAuthenticated,
  saveShopifyToken,
  updateStoreType,
} = toRefs(useAuthStore());

const route = useRoute();
const router = useRouter();

const storeTypes = ref([
  {
    storeType: 'source',
    description: [
      'Owns the product information and inventory',
      'Sells through other stores',
      'Fulfils and ships orders from other stores',
    ],
    examples: [
      'Drop shipping suppliers',
      'Brands working with resellers',
      'Store providing inventory for expansion stores'
    ],
    btnLabel: 'Select Source store',
  },
  {
    storeType: 'destination',
    description: [
      'Imports product information and inventory',
      'Sells products from other stores/brands',
      'Forwards orders to suppliers for fulfilment',
    ],
    examples: [
      'Drop shipping retailers',
      'Marketplaces selling other brands',
      'Expansion stores (e.g. region-specific versions)'
    ],
    btnLabel: 'Select Destination store',
  }
])

/* ----- Mounted ----- */
onMounted(async () => {
  try {
    loading.value = true;
    let params = route.query;
    params.store_id = params.shop;
    if(params.store_id) {
      await saveShopifyToken.value(params);
    }
  } catch(error) {}
  finally {
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
    <PageDetails title="Select your store type" content="Choose the description that best fits your store" />

    <aside class="auth-wrapper text-900" style="padding: 2rem !important;">
      <div class="grid">
        <div v-for="{ btnLabel, description, examples, storeType } in storeTypes" class="col-6 pb-0">
          <CardWrapper class="font-semibold" style="padding: 0 !important;">
            <template #content>
              <div class="text-center pb-4">
                <SourceStore v-if="storeType === 'source'" />
                <DestinationStore v-else />
              </div>
              <div class="px-4">
                <h2 class="capitalize	text-2xl font-semi mb-2">{{ storeType }} store</h2>
                <ul class="p-0 list-none font-normal text-lg m-0">
                  <li v-for="(item, index) in description" class="py-3 border-bottom-1 border-300">
                    <i class="pi pi-check-circle text-green-500 text-lg mr-1" style="transform: translateY(1px);"></i>
                    {{ item }}
                  </li>
                </ul>
                <h3 class="text-lg mb-2 pt-3">Examples</h3>
                <ul class="p-0 list-none font-normal text-lg m-0">
                  <li v-for="example in examples" class="py-2">{{ example }}</li>
                </ul>
              </div>
              <div :key="storeType" class="flex align-items-center btn-store-type relative mt-4" :class="storeType">
                <RadioButton v-model="selectedStoreType" :inputId="storeType" name="dynamic" :value="storeType" class="absolute" />
                <label class="flex align-items-center pr-4 pl-7 text-lg" :for="storeType">{{ btnLabel }}</label>
              </div>
            </template>
          </CardWrapper>
        </div>

        <div class="col-12 text-right py-0 mt-5">
          <Button
            style="height: 3.5rem;"
            :disabled="selectedStoreType === ''"
            @click="updateStoreTypeHandler(selectedStoreType)"
            class="p-button-lg"
            label="Next">
          </Button>
        </div>
      </div>
    </aside>
  </section>
</template>
