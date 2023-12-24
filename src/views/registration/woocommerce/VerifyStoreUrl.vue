<script setup>
import router from '@/router';
import * as routes from '@/routes';

const storeURL = ref(null);
</script>

<template>
  <ul class="fixed list-none p-0 m-0 flex flex-row" style="top: 1.5rem; left: 50%; transform: translateX(-50%); width: 900px;">
    <Step title="Store Type" subTitle="Source or destination?" :isComplete="true" />
    <Step title="Connect Store" subTitle="Verify your store" :isCurrent="true" />
    <Step title="Permissions" subTitle="Review store access" :isLast="true" />
  </ul>

  <section class="mx-auto" style="width: 900px;">
    <PageDetails title="Connect your WooCommerce store" content="Enter your WooCommerce Store's Admin URL to start the verification process" />

    <aside class="auth-wrapper text-900">
      <div class="grid">
        <div class="col-9 pb-0">
          <InputText
            type="url"
            size="large"
            class="w-100"
            placeholder="Store URL"
            v-model="storeURL">
          </InputText>
          <small class="block mt-2 pl-1 text-700 font-semi text-sm" id="username-help">You'll need to add https:// to the URL</small>
        </div>
        <div class="col-3 pb-0">
          <Button
            :disabled="!storeURL"
            class="w-100"
            label="Link URL"
            style="height: 45px">
          </Button>
        </div>
      </div>

      <Divider />

      <Accordion expandIcon="pi pi-plus" collapseIcon="pi pi-minus" selectOnFocus="true">
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
    </aside>
  </section>
</template>
