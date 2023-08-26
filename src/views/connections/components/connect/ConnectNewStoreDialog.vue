<script setup>
import { useConnections } from '../../composables/connections';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Data ----- */
const {
  connectPartnerStoreHandler,
  invitePartnerStoreHandler,
  isConnectViaStoreKeyRequested,
  isInviteViaEmailRequested,
  isSendingInvitation,
} = useConnections();
const {
  isNewStoreConnectionRequested,
  partnerStoreType
} = toRefs(useConnectionsStore());
const emailAddress = ref('');
const uniqueKey = ref('');

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isNewStoreConnectionRequested.value = false
}
</script>

<template>
  <DialogWrapper
    :isVisible="isNewStoreConnectionRequested"
    @closeDialog="closeDialogHandler"
    :showFooter="isConnectViaStoreKeyRequested || isInviteViaEmailRequested"
    title="How would you like to connect?"
    width="650px">
    <template #body>
      <div v-if="!isConnectViaStoreKeyRequested && !isInviteViaEmailRequested">
        <section class="grid">
          <div class="col-12 md:col-12 lg:col-6">
            <div class="surface-0 shadow-2 border-round text-center px-5 py-8 pointer" @click="isInviteViaEmailRequested = true">
              <i class="pi pi-envelope"></i>
              <h2 class="mb-3 mt-4">Invite via Email</h2>
              <p class="m-0">For new or existing {{ partnerStoreType }}</p>
            </div>
          </div>

          <div class="col-12 md:col-12 lg:col-6">
            <div class="surface-0 shadow-2 border-round text-center px-5 py-8 pointer" @click="isConnectViaStoreKeyRequested = true">
              <i class="pi pi-key"></i>
              <h2 class="mb-3 mt-4">Connect via store key</h2>
              <p class="m-0">For existing {{ partnerStoreType }}</p>
            </div>
          </div>
        </section>
      </div>

      <div class="text-center" v-if="isInviteViaEmailRequested">
        <h2>Invite via Email Address</h2>
        <p class="mb-1">Sending an email invitation to <strong>{{ partnerStoreType }}</strong> that you want to connect to.</p>
        <p class="mt-1">This email will include your <strong>Syncio Key</strong> and <strong>installation instructions</strong>.</p>
        <InputText
          v-model="emailAddress"
          :placeholder="`Enter ${partnerStoreType} email address`"
          class="p-inputtext-lg w-75 my-4">
        </InputText>
      </div>

      <div class="text-center" v-if="isConnectViaStoreKeyRequested">
        <h2>Enter Store Key</h2>
        <p class="mb-1">Enter the Syncio Key for the <strong>{{ partnerStoreType }}</strong> that you want to connect to below.</p>
        <p class="mt-1">Once connected you can immediately start syncing products from that store.</p>
        <InputText
          v-model="uniqueKey"
          :placeholder="`Enter ${partnerStoreType} unique key`"
          class="p-inputtext-lg w-75 my-4">
        </InputText>
      </div>
    </template>

    <template #footer>
      <div v-if="isInviteViaEmailRequested">
        <Button
          @click="isInviteViaEmailRequested = false"
          class="p-button-secondary"
          label="Go back">
        </Button>
        <Button
          :disabled="!emailAddress"
          :loading="isSendingInvitation"
          @click="invitePartnerStoreHandler(emailAddress)"
          label="Send Invite">
        </Button>
      </div>

      <div v-if="isConnectViaStoreKeyRequested">
        <Button
          @click="isConnectViaStoreKeyRequested = false"
          class="p-button-secondary"
          label="Go back">
        </Button>
        <Button
          :disabled="!uniqueKey"
          :loading="isSendingInvitation"
          @click="connectPartnerStoreHandler(uniqueKey)"
          label="Connect">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>

<style scoped>
.pi-envelope,
.pi-key {
  font-size: 32px;
  height: 40px;
}
</style>
