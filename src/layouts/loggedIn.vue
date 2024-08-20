<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const router = useRouter();

const {
  plan,
} = toRefs(usePlanStore())

const {
  currentStore,
  isDestinationStore,
  isSourceStore,
  isWoocommerce,
  requiresSourceStorePlanApproval,
  storeName,
} = toRefs(useConnectionsStore());

const slackChannelBannerGroup = ref([
  '19grams-specialty-coffee-roasters.myshopify.com',
  '2dba1f-4.myshopify.com',
  'gear-as-rx.myshopify.com',
  'hi-desert-daydream.myshopify.com',
  'kalker-koisa.myshopify.com',
  'roaming-travelers.myshopify.com',
  'the-green-box-australia.myshopify.com',
  'wholesaleplug-com-au.myshopify.com',
]);

const inAppChatBannerGroup = ref([
  '7db37a-a9.myshopify.com',
  'buyfsa.myshopify.com',
]);

const randomBannerGroup = ref([
  '00-thestore.myshopify.com',
  '3poo1.myshopify.com',
  '4cbad3-2.myshopify.com',
  '4fbf4c-2.myshopify.com',
  '5ballgarage-com-2.myshopify.com',
  'a5aa38-2.myshopify.com',
  'acuity-instruments-wholesale.myshopify.com',
  'addition-dev.myshopify.com',
  'adv-muscle-mechanics.myshopify.com',
  'aera-new-york.myshopify.com',
  'agoodcompany.myshopify.com',
  'agrariaome.myshopify.com',
  'ahinsashoes-eu.myshopify.com',
  'alexanders-artisan-rugs-official-website.myshopify.com',
  'all-good-things-the-agency.myshopify.com',
  'anana-store-colombia.myshopify.com',
  'andrea-gomez-3.myshopify.com',
  'andrewchristianws.myshopify.com',
  'aoyamagiftsalon-sm-r.myshopify.com',
  'arrowbeast.myshopify.com',
  'artisans-made.myshopify.com',
  'aventure-extension.myshopify.com',
  'b-a-h-n-s.myshopify.com',
  'b2baldo.myshopify.com',
  'be-activewear.myshopify.com',
  'beach-luxe1.myshopify.com',
  'beautylondonshop.myshopify.com',
  'bestbuysoccer.myshopify.com',
  'bld-backoffice.myshopify.com',
  'blk-grn.myshopify.com',
  'boutiquee-in.myshopify.com',
  'brwn-sports.myshopify.com',
  'budgy-smuggler-uk.myshopify.com',
  'buymeonce-uk.myshopify.com',
  'by-storeyline.myshopify.com',
  'bypias-b2b.myshopify.com',
  'c4865b-2.myshopify.com',
  'canada-c-p.myshopify.com',
  'canada-weather-gear.myshopify.com',
  'canadian-ppe-marketplace.myshopify.com',
  'cara-cara-la.myshopify.com',
  'ccellcarts.myshopify.com',
  'charming-charlie-new.myshopify.com',
  'choice-bio.myshopify.com',
  'christian-brookes.myshopify.com',
  'christy-lynn-studio.myshopify.com',
  'club-earlybird-sample.myshopify.com',
  'creekside-nursery-inc.myshopify.com',
  'crepcircle.myshopify.com',
  'crumbsanddoilies.myshopify.com',
  'cupcake-jemma.myshopify.com',
  'd43da2-15.myshopify.com',
  'da-klinic-online.myshopify.com',
  'dagobert-bio.myshopify.com',
  'deeply-pt.myshopify.com',
  'dime-wholesale.myshopify.com',
  'dommerch.myshopify.com',
  'ecociouslife.myshopify.com',
  'eden-park-paris.myshopify.com',
  'entiii.myshopify.com',
  'epic-gardening.myshopify.com',
  'essential-republik.myshopify.com',
  'every-human.myshopify.com',
  'evolvefitwearshop.myshopify.com',
  'f1e1ac.myshopify.com',
  'fairshoe.myshopify.com',
  'flourysh.myshopify.com',
  'fortuna-media-micropress.myshopify.com',
  'frothies.myshopify.com',
  'fusionmineral-paint.myshopify.com',
  'gear-for-festivals.myshopify.com',
  'gentlemans-journal-shop.myshopify.com',
  'giorgia-shp-live-dest.myshopify.com',
  'grainvine.myshopify.com',
  'green-pebble.myshopify.com',
  'groovygirlgifts.myshopify.com',
  'gtfoverland.myshopify.com',
  'guildla.myshopify.com',
  'guru-muscle.myshopify.com',
  'hamptonshomeau.myshopify.com',
  'hb-development.myshopify.com',
  'heavyswing.myshopify.com',
  'hedoine.myshopify.com',
  'heiq-b2b-ch.myshopify.com',
  'heretic-parfum-wholesale.myshopify.com',
  'hockeydirect.myshopify.com',
  'hosieryplus.myshopify.com',
  'hoverboard-parts.myshopify.com',
  'hukgear.myshopify.com',
  'humble-aussie-vape-co.myshopify.com',
  'icbm-wholesale.myshopify.com',
  'impossible-kicks.myshopify.com',
  'inviz-marketplace.myshopify.com',
  'inviz-tv.myshopify.com',
  'ivy-styles-fashion.myshopify.com',
  'just-perfect-collection.myshopify.com',
  'k7-pro-inc.myshopify.com',
  'kjanee.myshopify.com',
  'koalababyorganicsau.myshopify.com',
  'koh-pos.myshopify.com',
  'lapaz-peru.myshopify.com',
  'lashboxla-nl.myshopify.com',
  'lavi-by-majolavi-int.myshopify.com',
  'laynewilson.myshopify.com',
  'lazy-dog-farm.myshopify.com',
  'lighter-usa.myshopify.com',
  'loosekid-us.myshopify.com',
  'luxurypromiseco.myshopify.com',
  'makani-schweiz.myshopify.com',
  'marolinavip.myshopify.com',
  'maverick-race-apparel.myshopify.com',
  'memes-worms.myshopify.com',
  'miami-michaelaram.myshopify.com',
  'michael-aram.myshopify.com',
  'miima-paris.myshopify.com',
  'mockberg-de.myshopify.com',
  'monogram-coffee-wholesale.myshopify.com',
  'move-active-int.myshopify.com',
  'move-active-us.myshopify.com',
  'muscleforcewholesale.myshopify.com',
  'mysicilianloveaffairs.myshopify.com',
  'mytitlestore.myshopify.com',
  'n2g-e-store.myshopify.com',
  'namesforgood.myshopify.com',
  'nanosmx.myshopify.com',
  'new-aroma360.myshopify.com',
  'nickelfreebelts.myshopify.com',
  'nonickel-com.myshopify.com',
  'northfin-usa.myshopify.com',
  'nursingessentials.myshopify.com',
  'odsjewellery.myshopify.com',
  'orgasmeparfumes.myshopify.com',
  'osea-malibu.myshopify.com',
  'osp-lg.myshopify.com',
  'pccha.myshopify.com',
  'pepperdeco.myshopify.com',
  'plant-in-the-box.myshopify.com',
  'plinth-2.myshopify.com',
  'ppd-performance.myshopify.com',
  'prime-barrel.myshopify.com',
  'rain-chains-in-a-nutshell.myshopify.com',
  'red-rooster-coffee-roaster.myshopify.com',
  'redrickshaw-com.myshopify.com',
  'revased-flowers.myshopify.com',
  'rialheim.myshopify.com',
  'rivviaprojects-aus.myshopify.com',
  'rogue-toys.myshopify.com',
  'rompus-australia.myshopify.com',
  'roseskinco-us.myshopify.com',
  'rvn-official.myshopify.com',
  'saidtheskyofficial.myshopify.com',
  'saiyamgambhir.myshopify.com',
  'schoolbags-ie.myshopify.com',
  'scripturepicturellc.myshopify.com',
  'seal-custom.myshopify.com',
  'shop-task-inline-skate-shop.myshopify.com',
  'shopcopperpenny.myshopify.com',
  'shoptiques2023.myshopify.com',
  'simracingmachines.myshopify.com',
  'smallwoodhome.myshopify.com',
  'sohalia.myshopify.com',
  'soubacq.myshopify.com',
  'south-african-boerewors.myshopify.com',
  'spiral-uk.myshopify.com',
  'stories-flooring-b2b.myshopify.com',
  'stormvaporizers.myshopify.com',
  'streamlinesports.myshopify.com',
  'strike-force-beverage.myshopify.com',
  'tammi-2.myshopify.com',
  'tango-foxtrot-official.myshopify.com',
  'tata-la.myshopify.com',
  'the-boondocks-official.myshopify.com',
  'the-groom-industries.myshopify.com',
  'the-rocks-push-au.myshopify.com',
  'the-shopcast-qa.myshopify.com',
  'the-spray-source.myshopify.com',
  'the-whispering-willow-farm.myshopify.com',
  'the-whole-crew-is-stupid.myshopify.com',
  'the-wild-swim-store.myshopify.com',
  'the007store.myshopify.com',
  'thedesignerbox.myshopify.com',
  'theempireusa.myshopify.com',
  'theuptest.myshopify.com',
  'thirstyleaves.myshopify.com',
  'tintstuff.myshopify.com',
  'toptote.myshopify.com',
  'under-your-skin-int.myshopify.com',
  'upper-notch-club.myshopify.com',
  'urbanescape.myshopify.com',
  'ursaferite-1.myshopify.com',
  'valet-de-pique.myshopify.com',
  'vapor-boss-llc.myshopify.com',
  'vexuswholesale-com.myshopify.com',
  'vipertac.myshopify.com',
  'visiongallerystore.myshopify.com',
  'vista-shops.myshopify.com',
  'walkingpad-no.myshopify.com',
  'waves-wine.myshopify.com',
  'weldmyridecom.myshopify.com',
  'wholesale-moveactive.myshopify.com',
  'www-holyghost-fashion-com-shop.myshopify.com',
  'zebra-vegan-shop.myshopify.com',
  'e77029-4.myshopify.com',
]);

/* ----- Mounted ----- */
onMounted(() => {
  bootIntercom();

  // Check if source store plan approval is pending?
  if(isSourceStore.value && requiresSourceStorePlanApproval.value && !plan.value) {
    router.push({ name: routes.SHOPIFY_PLAN_APPROVAL });
    return;
  }

  // Check if woo destination plan selection is pending?
  if(isWoocommerce.value && isDestinationStore.value && !plan.value && router?.currentRoute?.value?.fullPath !== routes.WOO_INSTALLATION_COMPLETED) {
    router.push({ name: routes.WOO_PLAN_SELECTION });
    return;
  }
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
    <Alert v-else-if="inAppChatBannerGroup.includes(storeName)">
      <div class="flex align-items-center justify-content-center">
        <IconIntercom class="mr-4" />
        <p class="my-0 text-lg line-height-3">
          Let us know how you're finding Universal Store! <br>
          Click <a href='javascript:void(0);' class='intercom-custom-launcher btn-link dark font-semibold text-lg'>here</a> or the chat button in the bottom right corner to send a message with your feedback.
        </p>
      </div>
    </Alert>
    <Alert v-else-if="randomBannerGroup.includes(storeName)">
      <div class="flex align-items-center justify-content-center">
        <p class="my-0 text-lg line-height-3">
          You can now be both a Source and Destination Store (Universal Store)! 🚀 <br>
          See more details about <a href="https://www.notion.so/syncio/Universal-Store-Beta-Guide-af11311f382447c2bf0ea5c4a9051d6d" target="_blank" class='btn-link dark font-semibold text-lg'>Universal Store beta here</a>, and send any questions or feedback using the <a href='javascript:void(0);' class='intercom-custom-launcher btn-link dark text-lg'>chat button</a>
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
