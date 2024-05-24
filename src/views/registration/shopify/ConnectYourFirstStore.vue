<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ConnectNewStoreDialog = defineAsyncComponent(() => import('../../connections/components/connect/ConnectNewStoreDialog.vue'));

/* ----- Data ----- */
const isTestStoreConnected = ref(false);
const loading = ref(false);
const selectedOption = ref('');
const options = ref([
  {
    btnLabel: 'I received a Destination store key',
    description: null,
    type: 'uniqueKey',
  },
  {
    btnLabel: 'Share your key via email ',
    description: null,
    type: 'email',
  },
  {
    btnLabel: 'Create a Marketplace profile',
    description: 'Allows you to browse and connect with quality partner stores. Select this option if you don’t yet have a store to connect with.',
    type: 'profile',
  },
]);
const {
  connectPartnerStore,
  isConnectViaStoreKeyRequested,
  isDestinationStore,
  isInviteViaEmailRequested,
  isNewStoreConnectionRequested,
  loadingTestStoreConnection,
  partnerStoreType,
  storeKey,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const connectPartnerStoreHandler = async () => {
  loadingTestStoreConnection.value = true;
  const success = await connectPartnerStore.value('5d49553267519');
  if(success) {
    isTestStoreConnected.value = true;
    loadingTestStoreConnection.value = false;
  }
};

const showInviteViaEmailHandler = () => {
  isConnectViaStoreKeyRequested.value = false;
  isNewStoreConnectionRequested.value = true;
  isInviteViaEmailRequested.value = true;
};

const showConnectViaKeyHandler = () => {
  isInviteViaEmailRequested.value = false;
  isNewStoreConnectionRequested.value = true;
  isConnectViaStoreKeyRequested.value = true;
};
</script>

<template>
  <section class="mx-auto" style="width: 850px;">
    <PageDetails :title="`Connect to your first ${partnerStoreType}`" content="" />

    <aside class="auth-wrapper text-900">
      <!-- <div class="grid pt-4 pb-3">
        <div class="col-6">
          <Button
            @click="showInviteViaEmailHandler"
            class="p-button-lg w-100"
            icon="pi pi-arrow-right"
            iconPos="right"
            label="Share your key via e-mail">
          </Button>
        </div>
        <div class="col-6">
          <Button
            @click="showConnectViaKeyHandler"
            class="p-button-lg w-100"
            icon="pi pi-arrow-right"
            iconPos="right"
            label="I received a source store key"
            outlined>
          </Button>
        </div>
      </div> -->

      <!-- <template v-if="!isTestStoreConnected && isDestinationStore">
        <Divider />
        <p class="text-lg line-height-3 mt-3 mb-0">Haven't received a unique key?</p>
        <p class="text-lg line-height-3 mt-1">Why not try out our awesome features with our test store instead?</p>
        <Button
          :loading="loadingTestStoreConnection"
          @click="connectPartnerStoreHandler"
          class="p-button-lg w-50"
          icon="pi pi-plus"
          iconPos="right"
          label="Connect to test store"
          outlined>
        </Button>
      </template> -->

      <h3 class="text-2xl mb-2">How do you want to connect?</h3>
      <p class="text-lg line-height-3">Syncio uses Unique Store Keys to establish connections between stores. <br> Find your Unique Store Key at any time on the in app dashboard.</p>
      <ul class="m-0 pt-3 p-0 radio-list">
        <li v-for="({ btnLabel, description, type }, index) in options" :key="type" class="flex align-items-center relative p-4 border-1 border-400" :class="{ 'selected' : selectedOption === type, 'border-top-none' : index > 0 }">
          <RadioButton v-model="selectedOption" :inputId="type" name="dynamic" :value="type" class="absolute" />
          <label class="flex flex-column pr-4 pl-6 text-lg pointer" :for="type">
            {{ btnLabel }}
            <template v-if="description">
              <span class="mt-2 line-height-3 text-sm">
                {{ description }}
              </span>
            </template>
          </label>
        </li>
      </ul>

      <div class="border-top-1 border-400 my-6"></div>

      <div class="text-center">
        <div class="flex align-items-center justify-content-end">
          <router-link :to="isDestinationStore ? routes.SHOPIFY_SELECT_PLAN : routes.SHOPIFY_INSTALLATION_COMPLETE">
            <a href="javascript:void(0);" class="btn-link mr-5 text-lg">Skip</a>
          </router-link>
          <Button label="Next" class="font-bold justify-content-center"></Button>
        </div>
      </div>

    </aside>
  </section>

  <ConnectNewStoreDialog v-if="isNewStoreConnectionRequested" :enableBackBtn="false" />
</template>
