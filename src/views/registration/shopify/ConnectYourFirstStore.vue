<script setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

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

/* ----- Data ----- */
const connectedEmail = ref('');
const connectedStoreKey = ref('');
const isDestinationStoreConnected = ref(false);
const isEmailInvitationSent = ref(false);
const loading = ref(false);
const router = useRouter();
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
  partnerStoreType,
  storeKey,
} = toRefs(useConnectionsStore());

const {
  connectPartnerStoreHandler,
  invitePartnerStoreHandler,
  isSendingInvitation,
} = useConnections();

/* ----- Computed ----- */
const isNextStepEnabled = computed(() => {
  const isUniqueKeySelected = selectedOption.value === 'uniqueKey' && isDestinationStoreConnected.value;
  const isEmailInvitationSelected = selectedOption.value === 'email' && isEmailInvitationSent.value;
  const isProfileCreationSelected = selectedOption.value === 'profile';
  return (isUniqueKeySelected ||  isEmailInvitationSelected || isProfileCreationSelected);
});

/* ----- Methods ----- */
const goToNextStepHandler = async () => {
  const { value } = selectedOption;
  if(value === 'profile') {
    await router.push({ name: routes.CREATE_PROFILE });
  } else if((value === 'email' && isEmailInvitationSent.value) || (value === 'uniqueKey' && isDestinationStoreConnected.value)) {
    loading.value = true;
    await router.push({ name: routes.SHOPIFY_INSTALLATION_COMPLETE });
    loading.value = false;
  }
};

const onConnectPartnerStoreHandler = async(uniqueKey) => {
  isDestinationStoreConnected.value = false;
  const response = await connectPartnerStoreHandler(uniqueKey);
  if(response) {
    isDestinationStoreConnected.value = true;
    connectedStoreKey.value = uniqueKey;
  }
};

const onInvitePartnerStoreHandler = async (emailAddress) => {
  isEmailInvitationSent.value = false;
  const response = await invitePartnerStoreHandler(emailAddress);
  if(response?.success) {
    isEmailInvitationSent.value = true;
    connectedEmail.value = emailAddress;
  }
};

const skipOnboardingHandler = async () => {
  loading.value = true;
  await router.push({ name: routes.SHOPIFY_INSTALLATION_COMPLETE });
  loading.value = false;
};
</script>

<template>
  <section class="mx-auto" style="width: 850px; max-width: 100%;">
    <PageDetails :title="`Connect to your first ${partnerStoreType}`" content="" />

    <aside class="auth-wrapper text-900">
      <h3 class="text-2xl mb-2 font-semi">How do you want to connect?</h3>
      <p class="text-lg line-height-3">Syncio uses Unique Store Keys to establish connections between stores. <br> Find your Unique Store Key at any time on the in app dashboard.</p>
      <ul class="m-0 pt-3 p-0 radio-list">
        <li v-for="({ btnLabel, description, type }, index) in options" :key="type" class="flex align-items-center relative px-4 border-1 border-400" :class="{ 'selected' : selectedOption === type, 'border-top-none' : index > 0, 'profile' : type === 'profile' }">
          <RadioButton v-model="selectedOption" :inputId="type" name="dynamic" :value="type" class="absolute" />
          <label class="flex flex-column justify-content-center text-lg pointer h-100 w-100 left-0 absolute" :for="type">
            {{ btnLabel }}
            <template v-if="description">
              <span class="mt-2 line-height-3" style="font-size: .9rem; color: #212121;">
                {{ description }}
              </span>
            </template>
          </label>
        </li>
      </ul>

      <!-- Connect via destination key -->
      <template v-if="selectedOption === 'uniqueKey'">
        <h3 class="text-2xl mb-0 font-semi mt-6">Enter Destination store key</h3>
        <p class="text-lg line-height-3 mt-2">You'll be able to sync their products once set up is complete</p>
        <div class="grid">
          <div class="col-12 md:col-10">
            <InputText
              :class="{ 'mb-3 p-invalid': uniqueKeyErrors.uniqueKey || ownStoreKeyError !== '' }"
              v-model="uniqueKey"
              v-bind="uniqueKeyAttrs"
              placeholder="Enter store key"
              class="p-inputtext-lg w-100">
            </InputText>
            <ValidationMessage v-if="uniqueKeyErrors.uniqueKey" :error="uniqueKeyErrors.uniqueKey" style="padding-bottom: 0 !important;" />
            <ValidationMessage v-if="ownStoreKeyError && ownStoreKeyError !== ''" :error="ownStoreKeyError" class="pt-0" style="padding-bottom: 0 !important;" />
          </div>
          <div class="col-12 md:col-2">
            <Button
              :disabled="!uniqueKeyMeta.valid || ownStoreKeyError !== ''"
              :loading="isSendingInvitation"
              @click="onConnectPartnerStoreHandler(uniqueKey)"
              class="mr-0 w-100"
              style="height: 44px;"
              label="Connect">
            </Button>
          </div>
        </div>
        <div v-if="isDestinationStoreConnected && !isSendingInvitation" class="flex align-items-center text-lg mt-3 text-green-600">
          <i class="pi pi-check-circle pr-3 text-2xl"></i> Connection successful ({{ connectedStoreKey }}). Manage your connection via the in app Stores page.
        </div>
      </template>

      <!-- Send email invite -->
      <template v-if="selectedOption === 'email'">
        <h3 class="text-2xl mb-0 font-semi mt-6">Invite Destination store via email</h3>
        <p class="text-lg line-height-3 mt-2">This email will include your Unique Store Key <Strong>({{ storeKey }})</Strong> and installation instructions</p>
        <div class="grid">
          <div class="col-12 md:col-10">
            <InputText
              :class="{ 'mb-3 p-invalid': emailErrors.emailAddress }"
              v-model="emailAddress"
              v-bind="emailAddressAttrs"
              placeholder="Enter email address"
              class="p-inputtext-lg w-100">
            </InputText>
            <ValidationMessage :error="emailErrors.emailAddress" style="padding-bottom: 0 !important;" />
          </div>
          <div class="col-12 md:col-2">
            <Button
              :disabled="!emailMeta.valid"
              :loading="isSendingInvitation"
              @click="onInvitePartnerStoreHandler(emailAddress)"
              class="mr-0 w-100"
              style="height: 44px;"
              label="Send invite">
            </Button>
          </div>
        </div>
        <div v-if="isEmailInvitationSent && !isSendingInvitation" class="flex align-items-center text-lg mt-3 text-green-600">
          <i class="pi pi-check-circle pr-3 text-2xl"></i> Invite sent to {{ connectedEmail }}. You'll be notified when the store accepts your connection invite.
        </div>
      </template>

      <div class="border-top-1 border-300 md:my-6 my-4"></div>

      <div class="text-center">
        <div class="flex align-items-center md:justify-content-end justify-content-center">
          <Button v-if="!isNextStepEnabled || selectedOption === 'profile'" :loading="loading" @click="skipOnboardingHandler" class="mr-4 text-lg text-blue-500" text>Skip</Button>
          <Button
            :disabled="!isNextStepEnabled"
            :loading="loading"
            @click="goToNextStepHandler"
            class="font-bold justify-content-center"
            label="Next">
          </Button>
        </div>
      </div>

    </aside>
  </section>
</template>
