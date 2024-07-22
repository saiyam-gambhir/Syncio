<script setup>
import { useForm } from 'vee-validate';
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  registerWooStore,
  user,
} = toRefs(useAuthStore());

const isURLValid = ref(false);
const loading = ref(false);
const storeAlreadyUsedError = ref(false);

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    storeURL: yup.string().url(validationMessages.URL_VERIFICATION).required(validationMessages.REQUIRED),
  }),
});

const [storeURL] = defineField('storeURL');

/* ----- Methods ----- */
const verifyStoreURLHandler = () => {
  loading.value = true;
  let config = {
    method: "HEAD",
    mode: "no-cors"
  };
  const pingRequest = new Request(storeURL.value, config);
  fetch(pingRequest)
  .then(response => {
    if(response.status === 0) {
      isURLValid.value = true;
    } else {
      isURLValid.value = false;
    }

    loading.value = false;
  })
  .catch(e => {
    isURLValid.value = false;
    loading.value = false;
  });
};

const clearStoreUrlHandler = () => {
  isURLValid.value = false;
  storeAlreadyUsedError.value = false;
  storeURL.value = null;
};

const registerStore = async () => {
  let withoutHttps, shopType;
  withoutHttps = storeURL.value.replace(/^http(s)*:\/\//, '');
  withoutHttps = withoutHttps.replace(/\/$/, "");
  shopType = window.sessionStorage.getItem('woo-store-type');
  const params = {
    platform_api_version: 'v3',
    platform: 'woocommerce',
    type: shopType,
    url: withoutHttps,
    user_id: user.value.id,
  };

  try {
    const response = await registerWooStore.value(params);

    if(response === undefined) {
      storeAlreadyUsedError.value = true;
      return;
    }

    storeAlreadyUsedError.value = false;
    let redirectUrl = response?.redirect_url;
    redirectUrl += import.meta.env.VITE_WOO_REDIRECT_URL + '?store=' + withoutHttps + '&type=' + shopType;
    window.location.href = redirectUrl;
  } catch (error) {}
};
</script>

<template>
  <section class="mx-auto relative" style="width: 900px; max-width: 100%;">
    <router-link :to="routes.WOO_CONTINUE_LATER" class="fixed z-1 hidden md:inline" style="right: 2.5rem; top: 2.3rem;">
      <Button label="Signout, continue later" class="font-bold justify-content-center"></Button>
    </router-link>
    <ul class="mx-auto list-none p-0 mt-0 mb-6 flex-row hidden md:flex" style="top: 1.5rem;">
      <Step title="Store Type" subTitle="Source or destination?" :isComplete="true" />
      <Step title="Connect Store" subTitle="Verify your store" :isCurrent="true" />
      <Step title="Permissions" subTitle="Review store access" :isLast="true" />
    </ul>

    <PageDetails
      content="Enter your WooCommerce Store's Admin URL to start the verification process"
      title="Connect your WooCommerce store">
    </PageDetails>

    <aside class="auth-wrapper text-900">
      <div class="grid">
        <div class="md:col-9 col-12 pb-0">
          <div class="relative">
            <InputText
              :class="{ 'mb-3 p-invalid' : errors.storeURL }"
              class="w-100"
              placeholder="Store URL"
              size="large"
              type="url"
              v-model="storeURL">
            </InputText>
            <i v-if="storeURL" @click="clearStoreUrlHandler" class="pi pi-times absolute pointer text-700" style="right: 1rem; top: 1.33rem;"></i>
          </div>

          <ValidationMessage :error="errors.storeURL" style="padding-bottom: 0 !important;" />
          <small v-if="!errors.storeURL" class="block mt-2 pl-1 text-700 font-semi text-sm" id="username-help">You'll need to add https:// to the URL</small>
        </div>
        <div class="md:col-3 col-12 pb-0 mt-3 md:mt-0">
          <Button
            :disabled="!meta.valid"
            :loading="loading"
            @click="verifyStoreURLHandler"
            class="w-100"
            label="Link URL"
            style="height: 45px"
            v-if="!isURLValid">
          </Button>
          <Tag severity="success" style="height: 45px; font-size: 1.25rem !important;" v-else class="w-100">URL linked</Tag>
        </div>
      </div>

      <Divider />

      <Accordion v-if="!isURLValid" expandIcon="pi pi-plus" collapseIcon="pi pi-minus" selectOnFocus="true">
        <AccordionTab header="Where can I find my WooCommerce account URL?">
          <div class="text-900">
            <p class="m-0">Syncio requires the URL associated with the WordPress admin tied to your WooCommerce plugin.</p>
            <p class="m-0 mt-2">You can find the URL by logging into your WordPress site via the account tied to the site administrator.</p>
            <p class="m-0 mt-2">Once logged in, copy the URL in the address bar and paste in the Verify URL field above.</p>
            <img src="@/assets/images/woo-url-locator.png" alt="Url locator" class="mt-5 w-75" />
            <p class="m-0 mt-3">*Note the following URLs will not work:</p>
            <ul class="m-0 mt-2 pl-3">
              <li>Redirect URLs for your webstore</li>
              <li class="mt-1">URLs associated with your WordPress blog</li>
            </ul>
          </div>
        </AccordionTab>
      </Accordion>

      <div v-else class="text-center text-lg">
        <h3 class="text-xl mt-3">Next step is to approve permissions in Woo</h3>
        <p class="m-0 mt-4">In order to send and receive stock and updates between the stores you've connected to, <br> Syncio requires Read & Write permissions for an API Key and Webhooks.</p>
        <p class="m-0 mt-4">Syncio will only use these permissions to perform essential product and order updates.</p>
        <p class="m-0 mt-4">On the next step, make sure you login to your admin account with:</p>
        <h3 class="m-0 mt-2 text-xl">Read and Write permissions</h3>
        <Button label="Continue to permission approval" @click="registerStore" class="w-100 p-button-lg mt-6"></Button>
        <p v-if="storeAlreadyUsedError" class="mt-4 text-lg font-semi line-height-3 mb-0" style="color: #D91E18 !important;">
          The store is already installed with another account
          <br>
          Please try again
        </p>
      </div>
    </aside>
  </section>
</template>
