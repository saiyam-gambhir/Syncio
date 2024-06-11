<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  currentStore,
  ENABLE_STORE,
  fetchConnections,
  isDestinationStore,
  isEnableUniversalStoreRequested,
  isSourceStore,
  loadingEnableStore,
  partnerStoreType,
  storeType,
  universalStores,
} = toRefs(useConnectionsStore());

const router = useRouter();
const progress = ref(50);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isEnableUniversalStoreRequested.value = false;
};

const enableStore = async () => {
  await ENABLE_STORE.value();
  currentStore.value = universalStores.value.find(store => !store.default);
};

const enableStoreHandler = async () => {
  await enableStore();
  router.push({
    path: routes.DASHBOARD,
    query: { storeEnabled: storeType.value },
  });
  await fetchConnections.value(true);
};

const selectPlanHandler = async () => {
  await enableStore();
  router.push({ path: routes.SHOPIFY_SELECT_PLAN });
};
</script>

<template>
  <DialogWrapper :isVisible="isEnableUniversalStoreRequested" width="550px" @closeDialog="closeDialogHandler" withoutTitle>
    <template #body>
      <div class="text-center">
        <div class="px-8 mx-8" v-if="progress < 101">
          <ProgressBar
            :value="progress"
            :showValue="false">
          </ProgressBar>
        </div>
        <div class="mt-6" v-if="progress === 50">
          <UniversalStoreStepOne />
          <h2 class="text-900 font-semi mt-4">Source and Destination all in one login</h2>
          <p class="text-lg line-height-3">Adding a second store type for this account will allow your Shopify store to become both Source and Destination in Syncio.</p>
          <p class="text-lg line-height-3">Easily stock other store's products and find distribution for your own products to achieve true two way collaboration.</p>
        </div>
        <div class="mt-6" v-else-if="progress === 100">
          <UniversalStoreStepTwo />
          <h2 class="text-900 font-semi mt-4">No need to learn new workflows <br> or create new accounts</h2>
          <p class="text-lg line-height-3">Simply switch between Source and Destination view to manage supplier and retailer connections, products, orders and payouts, all in one place.</p>
          <p class="text-lg line-height-3">Syncio will update your Shopify store with accurate inventory and order data.</p>
        </div>
        <div v-else>
          <UniversalStoreStepThree />
          <template v-if="isSourceStore">
            <h2 class="text-900 font-semi mt-4">Select your plan to complete set up</h2>
            <ul class="text-900 pl-0 list-none m-0 text-left mx-6 text-lg line-height-3">
              <li class="flex mt-4">
                <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
                True two way collaboration without the extra effort
              </li>
              <li class="flex mt-4">
                <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
                The same reliable real time sync and oversell protections
              </li>
              <li class="flex mt-4">
                <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
                <div>
                  Free 14 day trial <br>
                  <span class="text-small">If it doesn't meet your needs, simply remove the {{ partnerStoreType }} type from your account settings.</span>
                </div>
              </li>
            </ul>
          </template>
          <template v-else>
            <h2 class="text-900 font-semi mt-4">Your Source store is ready</h2>
            <ul class="text-900 pl-0 list-none m-0 text-left mx-6 text-lg line-height-3">
              <li class="flex mt-4">
                <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
                True two way collaboration without the extra effort
              </li>
              <li class="flex mt-4">
                <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
                The same reliable real time sync and oversell protections
              </li>
              <li class="flex mt-4">
                <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
                <div>
                  Enabling your Source store is free! <br>
                  <span class="text-small">If it doesn't meet your needs, simply remove the {{ partnerStoreType }} type from your account settings.</span>
                </div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button
          @click="closeDialogHandler"
          class="p-button-secondary"
          label="Cancel">
        </Button>

        <Button
          @click="progress += 50"
          class="mr-0"
          label="Next"
          v-if="progress <= 100">
        </Button>

        <Button
          :loading="loadingEnableStore"
          @click="enableStoreHandler"
          label="Done"
          v-if="isDestinationStore && progress > 100">
        </Button>

        <Button
          @click="selectPlanHandler"
          class="mr-0"
          label="Select plan"
          v-else-if="progress > 100">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
