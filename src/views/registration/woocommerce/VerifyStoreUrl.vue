<script setup>
const isURLValid = ref(false);
const loading = ref(false);
const storeURL = ref(null);

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
  storeURL.value = null;
};
</script>

<template>

  <section class="mx-auto relative" style="width: 900px;">
    <ul class="list-none p-0 m-0 mb-8 flex flex-row" style="">
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
        <div class="col-9 pb-0">
          <div class="relative">
            <InputText
              type="url"
              size="large"
              class="w-100"
              clear
              placeholder="Store URL"
              v-model="storeURL">
            </InputText>
            <i v-if="storeURL" @click="clearStoreUrlHandler" class="pi pi-times absolute pointer text-700" style="right: 1rem; top: 1.33rem;"></i>
          </div>
          <small class="block mt-2 pl-1 text-700 font-semi text-sm" id="username-help">You'll need to add https:// to the URL</small>
        </div>
        <div class="col-3 pb-0">
          <Button
            :disabled="!storeURL"
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
        <Button label="Continue to permission approval" class="w-100 p-button-lg mt-5"></Button>
      </div>

    </aside>
  </section>
</template>
