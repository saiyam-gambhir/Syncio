<script setup>
/* ----- Data ----- */
const {
  currentStore,
  storeName,
} = toRefs(useConnectionsStore());

const slackChannelBannerGroup = ref([
  '19grams-specialty-coffee-roasters.myshopify.com',
  '2dba1f-4.myshopify.com',
  'gear-as-rx.myshopify.com',
  'hi-desert-daydream.myshopify.com',
  'roaming-travelers.myshopify.com',
  'the-green-box-australia.myshopify.com',
  'wholesaleplug-com-au.myshopify.com',
]);

const inAppChatBannerGroup = ref([
  '7db37a-a9.myshopify.com',
  'buyfsa.myshopify.com',
]);

/* ----- Mounted ----- */
onMounted(() => {
  bootIntercom();
});

/* ----- Methods ----- */
const setIntercomConfigs = (store, createdAt) => {
  const { id, email, store_domain, type } = store;

  window.intercomSettings = {
    app_id: import.meta.env.VITE_INTERCOM_APP_ID,
    created_at: createdAt,
    custom_launcher_selector: '.intercom-custom-launcher',
    email: email,
    name: store_domain,
    type: type,
    user_id: id,
  };

  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget'+import.meta.env.VITE_INTERCOM_APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
};

const bootIntercom = () => {
  if(currentStore.value) {
    const createdAt = (new Date(currentStore.value.created_at).getTime()) / 1000;
    setIntercomConfigs(currentStore.value, createdAt);
  }
};
</script>

<template>
  <main class="main">
    <Toast position="top-right" successIcon="pi pi-check-circle" />

    <Alert v-if="slackChannelBannerGroup.includes(storeName)">
      <div class="flex align-items-center justify-content-center">
        <IconSlack class="mr-4" />
        <p class="my-0 text-lg line-height-3">
          Let us know how you're finding Universal Store! <br>
          Head to the Syncio Customer Community in <a href='https://syncio.slack.com/' target="_blank" class='btn-link dark font-semibold text-lg'>Slack</a> to share your feedback.
        </p>
      </div>
    </Alert>
    <Alert v-if="inAppChatBannerGroup.includes(storeName)">
      <div class="flex align-items-center justify-content-center">
        <IconIntercom class="mr-4" />
        <p class="my-0 text-lg line-height-3">
          Let us know how you're finding Universal Store! <br>
          Click <a href='javascript:void(0);' class='intercom-custom-launcher btn-link dark font-semibold text-lg'>here</a> or the chat button in the bottom right corner to send a message with your feedback.
        </p>
      </div>
    </Alert>

    <div class="min-h-screen flex relative lg:static">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <Header></Header>

        <div class="flex flex-auto flex-column router-view mx-auto">
          <div class="flex-auto surface-section p-5 pt-4">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
