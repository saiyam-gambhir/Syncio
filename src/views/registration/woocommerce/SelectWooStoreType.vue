<script setup>
import * as routes from '@/routes';
import router from '@/router';

/* ----- Data ----- */
const {
  storeTypes,
} = toRefs(useAuthStore());

const selectedStoreType = ref('');

/* ----- Methods ----- */
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
            @click="setWooStoreType(selectedStoreType)"
            class="p-button-lg"
            label="Next"
            style="height: 3.5rem;">
          </Button>
        </div>
      </div>
    </aside>
  </section>
</template>
