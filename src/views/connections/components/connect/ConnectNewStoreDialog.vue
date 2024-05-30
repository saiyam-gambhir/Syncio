<script setup>
import { useForm } from 'vee-validate';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  connectPartnerStoreHandler,
  invitePartnerStoreHandler,
  isSendingInvitation,
} = useConnections();

const {
  isConnectViaStoreKeyRequested,
  isInviteViaEmailRequested,
  isNewStoreConnectionRequested,
  partnerStoreType,
  universalStores,
} = toRefs(useConnectionsStore());

/* ----- Validations ----- */
const { errors: emailErrors, meta: emailMeta, defineField: emailDefinedField } = useForm({
  validationSchema: yup.object({
    emailAddress: yup.string().email(validationMessages.EMAIL).required(validationMessages.REQUIRED),
  }),
});

const { errors: uniqueKeyErrors, meta: uniqueKeyMeta, defineField: uniqueKeyDefinedField } = useForm({
  validationSchema: yup.object({
    uniqueKey: yup.string().required(validationMessages.REQUIRED),
  }),
});

const [emailAddress, emailAddressAttrs] = emailDefinedField('emailAddress');
const [uniqueKey, uniqueKeyAttrs] = uniqueKeyDefinedField('uniqueKey');
const ownStoreKeyError = ref('');

/* ----- Props ----- */
const props = defineProps({
  enableBackBtn: {
    type: Boolean,
    default: true
  }
});

watch(uniqueKey, (newVal, oldVal) => {
  ownStoreKeyError.value = universalStores.value.some(store => store.identifier === newVal) ? "The key you've entered belongs to your own store.<br>Enter the key of a store that doesn't belong to this account." : '';
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isNewStoreConnectionRequested.value = false;
};
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
          :class="{ 'mb-3 p-invalid': emailErrors.emailAddress }"
          v-model="emailAddress"
          v-bind="emailAddressAttrs"
          :placeholder="`Enter ${partnerStoreType} email address`"
          class="p-inputtext-lg w-75 mt-4">
        </InputText>
        <ValidationMessage :error="emailErrors.emailAddress" style="padding-bottom: 0 !important;" />
      </div>

      <div class="text-center" v-if="isConnectViaStoreKeyRequested">
        <h2>Enter Store Key</h2>
        <p class="mb-1">Enter the Syncio Key for the <strong>{{ partnerStoreType }}</strong> that you want to connect to below.</p>
        <p class="mt-1">Once connected you can immediately start syncing products from that store.</p>
        <InputText
          :class="{ 'mb-3 p-invalid': uniqueKeyErrors.uniqueKey || ownStoreKeyError !== '' }"
          v-model="uniqueKey"
          v-bind="uniqueKeyAttrs"
          :placeholder="`Enter ${partnerStoreType} unique key`"
          class="p-inputtext-lg w-75 mt-4">
        </InputText>
        <ValidationMessage v-if="uniqueKeyErrors.uniqueKey" :error="uniqueKeyErrors.uniqueKey" style="padding-bottom: 0 !important;" />
        <ValidationMessage v-if="ownStoreKeyError && ownStoreKeyError !== ''" :error="ownStoreKeyError" class="pt-0" style="padding-bottom: 0 !important;" />
      </div>
    </template>

    <template #footer>
      <div v-if="isInviteViaEmailRequested" class="flex align-items-center" :class="{ 'justify-content-end' : !enableBackBtn, 'justify-content-between' : enableBackBtn }">
        <Button
          @click="isInviteViaEmailRequested = false"
          class="p-button-secondary"
          label="Back"
          v-if="enableBackBtn">
        </Button>
        <Button
          :disabled="!emailMeta.valid"
          :loading="isSendingInvitation"
          @click="invitePartnerStoreHandler(emailAddress)"
          class="mr-0"
          label="Send Invite">
        </Button>
      </div>

      <div v-if="isConnectViaStoreKeyRequested" class="flex align-items-center" :class="{ 'justify-content-end' : !enableBackBtn, 'justify-content-between' : enableBackBtn }">
        <Button
          @click="isConnectViaStoreKeyRequested = false"
          class="p-button-secondary"
          label="Back"
          v-if="enableBackBtn">
        </Button>
        <Button
          :disabled="!uniqueKeyMeta.valid || ownStoreKeyError !== ''"
          :loading="isSendingInvitation"
          @click="connectPartnerStoreHandler(uniqueKey)"
          class="mr-0"
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
