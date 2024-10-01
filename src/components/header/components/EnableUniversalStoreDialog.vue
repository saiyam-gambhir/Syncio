<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  currentStore,
  enableStore,
  isDestinationStore,
  isEnableUniversalStoreRequested,
  isSourceStore,
  loadingEnableStore,
  storeType,
  universalStores,
} = toRefs(useConnectionsStore());

const router = useRouter();
const progress = ref(50);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isEnableUniversalStoreRequested.value = false;
};

const enableStoreHandler = async () => {
  await enableStore.value();
  currentStore.value = universalStores.value.find(store => !store.default);
};

const selectPlanHandler = async () => {
  loadingEnableStore.value = true;
  await enableStoreHandler();
  loadingEnableStore.value = false;
  router.push({ path: routes.SHOPIFY_SELECT_PLAN });
};

const enableSourceStorePlanHandler = async () => {
  loadingEnableStore.value = true;
  await enableStoreHandler();
  loadingEnableStore.value = false;
  router.push({ path: routes.SHOPIFY_PLAN_APPROVAL });
};
</script>

<template>
  <DialogWrapper :isVisible="isEnableUniversalStoreRequested" width="575px" style="max-width: 100%;" @closeDialog="closeDialogHandler" withoutTitle>
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
          <h2 class="text-900 font-semi mt-4" v-if="isSourceStore">Select your plan to complete set up*</h2>
          <h2 class="text-900 font-semi mt-4" v-if="isDestinationStore">Approve your plan usage to complete set up*</h2>
          <ul class="text-900 pl-0 list-none m-0 text-left mx-6 text-lg line-height-3">
            <li class="flex mt-4">
              <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
              True two way collaboration without the extra effort
            </li>
            <li class="flex mt-4">
              <i class="pi pi-check-circle text-2xl text-green-500 mr-3" style="transform: translateY(1.5px);"></i>
              The same reliable real time sync and oversell protections
            </li>
            <div class="px-3 py-4 surface-highlight mt-4">
              <p class="m-0 mb-1">This will be additional to your current {{ storeType }} store plan</p>
              <template v-if="isSourceStore">
                <p class="text-sm m-0" >
                  You'll move to a new billing cycle starting today and any usage from your previous cycle will be billed separately.
                </p>
                <AppLink label="Learn about Destination store pricing" link="" class="mt-2" />
              </template>
              <template v-if="isDestinationStore">
                <p class="text-sm m-0">
                  You'll move to a new billing cycle starting today and any charges from your previous cycle will be prorated and billed separately.
                </p>
                <AppLink label="Learn about Source store pricing" link="" class="mt-2" />
              </template>
            </div>
          </ul>
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
          @click="enableSourceStorePlanHandler"
          label="Approve plan usage"
          v-if="isDestinationStore && progress > 100">
        </Button>

        <Button
          :loading="loadingEnableStore"
          @click="selectPlanHandler"
          class="mr-0"
          label="Select plan"
          v-else-if="progress > 100">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
