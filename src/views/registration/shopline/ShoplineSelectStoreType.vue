<script setup>
import { useRoute, useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const loading = ref(false);
const loadingStoreType = ref(false);
const selectedStoreType = ref('');

const {
  installationComplete,
  isAuthenticated,
  saveShoplineToken,
  storeTypes,
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
  const installationResponse = await installationComplete.value();

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

    <aside class="auth-wrapper text-900" style="padding: 1.5rem !important;">
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
                  <li v-for="item in description" class="py-3 border-bottom-1 border-300">
                    <i class="pi pi-check-circle text-green-500 text-lg mr-1" style="transform: translateY(1px);"></i>
                    {{ item }}
                  </li>
                </ul>
                <h3 class="text-lg mb-2 pt-4">Examples</h3>
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

        <div class="col-12 text-center mt-5">
          <!-- <h3 class="text-lg font-semibold">Need to be both Source and Destination?</h3>
          <p>Select one store type to complete installation, then you can add the other <br> store type after installation is complete</p> -->
          <p>If you're unsure, <AppLink label="read is my store a Source or Destination store" link="https://help.syncio.co/en/articles/3284157-is-my-store-a-source-or-destination-store" /></p>
        </div>

        <div class="col-12 text-right py-0 mt-3">
          <Button
            :disabled="selectedStoreType === ''"
            :loading="loadingStoreType"
            @click="updateStoreTypeHandler(selectedStoreType)"
            class="p-button-lg"
            label="Next"
            style="height: 3.5rem;">
          </Button>
        </div>
      </div>
    </aside>
  </section>
</template>
