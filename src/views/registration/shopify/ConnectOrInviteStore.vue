<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ConnectNewStoreDialog = defineAsyncComponent(() => import('../../connections/components/connect/ConnectNewStoreDialog.vue'));

/* ----- Data ----- */
const isTestStoreConnected = ref(false);
const loading = ref(false);

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
  <section class="mx-auto" style="width: 900px;">
    <PageDetails :title="`Connect to your first ${partnerStoreType}!`" content="" />

    <aside class="auth-wrapper text-900 text-center">
      <h3>Your store's unique key:</h3>
      <h3 class="text-4xl font-semi mb-4" style="color: #fa757b; letter-spacing: 1.5px;">{{ storeKey || '658adff94608e' }}</h3>
      <p class="text-lg line-height-3 m-0">Share your unique key with {{ partnerStoreType }}s to start importing their products to sell on your store.</p>
      <p class="text-lg line-height-3 mt-1">This unique key can also be found on your dashboard after completing this setup process.</p>
      <div class="grid pt-4 pb-3">
        <div class="col-6">
          <Button @click="showInviteViaEmailHandler" icon="pi pi-arrow-right" iconPos="right" label="Share your key via e-mail" class="p-button-lg w-100"></Button>
        </div>
        <div class="col-6">
          <Button @click="showConnectViaKeyHandler" outlined icon="pi pi-arrow-right" iconPos="right" label="I received a source store key" class="p-button-lg w-100"></Button>
        </div>
      </div>

      <template v-if="!isTestStoreConnected && isDestinationStore">
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
      </template>

    </aside>

    <div class="text-center">
      <router-link :to="isDestinationStore ? routes.PLAN_AND_BILLINGS : routes.SHOPIFY_INSTALLATION_COMPLETE">
        <Button @click="loading = true" :loading="loading" label="Skip for now" class="my-6 font-bold justify-content-center p-button-lg"></Button>
      </router-link>
    </div>
  </section>

  <ConnectNewStoreDialog v-if="isNewStoreConnectionRequested" :enableBackBtn="false" />
</template>
