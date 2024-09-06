<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ShopifyPermissionsDialog = defineAsyncComponent(() => import('./components/ShopifyPermissionsDialog.vue'));
const EnableUniversalStore = defineAsyncComponent(() => import('./components/EnableUniversalStoreDialog.vue'));

/* ----- Data ----- */
const {
  customStoreName,
  fetchMetadata,
  isEnableUniversalStoreRequested,
  isShopify,
  isUniversalStore,
  shopifyPermissions,
  storeName,
  storeType,
} = toRefs(useConnectionsStore());

const {
  copyToClipBoard,
} = useFilters();

const {
  showToast,
} = useToasts();

const activityCenter = useActivityCenterStore();
const auth = useAuthStore();
const connections = useConnectionsStore();
const dashboard = useDashboardStore();
const marketPlace = useMarketPlaceStore();
const menu = ref();
const orders = useOrdersStore();
const payouts = usePayoutsStore();
const plan = usePlanStore();
const products = useProductsStore();
const productSettings = useProductSettingsStore();
const router = useRouter();
const items = ref([
  {
    label: null,
    items: [
      { label: 'Settings', icon: 'pi pi-cog', command: () => router.push({ name: routes.SETTINGS }) },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => logout() },
    ]
  },
]);

const allowedUniversalStores = ref([
  '00-thestore.myshopify.com',
  '19grams-specialty-coffee-roasters.myshopify.com',
  '2dba1f-4.myshopify.com',
  '3poo1.myshopify.com',
  '4cbad3-2.myshopify.com',
  '4fbf4c-2.myshopify.com',
  '5ballgarage-com-2.myshopify.com',
  '7db37a-a9.myshopify.com',
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
  'buyfsa.myshopify.com',
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
  'gear-as-rx.myshopify.com',
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
  'hi-desert-daydream.myshopify.com',
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
  'kalker-koisa.myshopify.com',
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
  'qa-shp-live-uni-dest1.myshopify.com',
  'qa-shp-live-uni-source1.myshopify.com',
  'qa-shp-stag-uni-dest1.myshopify.com',
  'qa-shp-stag-uni-source1.myshopify.com',
  'rain-chains-in-a-nutshell.myshopify.com',
  'red-rooster-coffee-roaster.myshopify.com',
  'redrickshaw-com.myshopify.com',
  'revased-flowers.myshopify.com',
  'rialheim.myshopify.com',
  'rivviaprojects-aus.myshopify.com',
  'roaming-travelers.myshopify.com',
  'rogue-toys.myshopify.com',
  'rompus-australia.myshopify.com',
  'roseskinco-us.myshopify.com',
  'rvn-official.myshopify.com',
  'saidtheskyofficial.myshopify.com',
  'schoolbags-ie.myshopify.com',
  'scripturepicturellc.myshopify.com',
  'seal-custom.myshopify.com',
  'shared-live-uni-1.myshopify.com',
  'shared-live-uni-2.myshopify.com',
  'shared-live-uni-3.myshopify.com',
  'shared-staging-destination-1.myshopify.com',
  'shared-staging-source-1.myshopify.com',
  'shared-staging-uni-1.myshopify.com',
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
  'suharsh-test-store.myshopify.com',
  'syncio-test-store-21.myshopify.com',
  'tammi-2.myshopify.com',
  'tango-foxtrot-official.myshopify.com',
  'tata-la.myshopify.com',
  'the-boondocks-official.myshopify.com',
  'the-green-box-australia.myshopify.com',
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
  'wholesaleplug-com-au.myshopify.com',
  'www-holyghost-fashion-com-shop.myshopify.com',
  'zebra-vegan-shop.myshopify.com',
  'e77029-4.myshopify.com',
  'test-nainesh-stag-unvsl-destination-1.myshopify.com',
  'test-nainesh-stag-unvsl-destination-3.myshopify.com',
]);

/* ----- Mounted ----- */
onMounted(() => {
  if(isShopify.value) {
    fetchMetadata.value();
  }
});

/* ----- Methods ----- */
const goBackHandler = () => {
  const { history } = window;
  if (!history.state.back) return;
  window.history.length > 1 ? router.back() : router.go('/');
};

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const logout = () => {
  activityCenter.$reset();
  auth.$reset();
  connections.$reset();
  dashboard.$reset();
  marketPlace.$reset();
  orders.$reset();
  payouts.$reset();
  plan.$reset();
  products.$reset();
  productSettings.$reset();
  sessionStorage.removeItem('ID_TOKEN_KEY');
  sessionStorage.removeItem('USER_ID');
  router.push({ name: routes.LOGIN });
};

const copyStoreNameHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store URL copied successfully' });
};
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
      <Button
        @click="goBackHandler"
        icon="pi pi-arrow-left"
        iconPos="left"
        outlined
        v-tooltip.left="'Go Back'">
      </Button>
    </div>

    <div class="header-right flex align-items-center">
      <div v-if="allowedUniversalStores.includes(storeName) && isShopify" class="flex">
        <UniversalStoreActions v-if="isUniversalStore" />
        <NonuniversalStoreActions v-else />
      </div>
      <div v-else>
        <Tag v-if="customStoreName" severity="info" class="text-900" :class="`tag-${storeType}`">
          <div class="flex flex-column pr-4">
            <h4 class="m-0 font-semiBold" style="transform: translateY(2px);">{{ customStoreName }}</h4>
            <p class="flex align-items-center m-0 font-normal" style="font-size: .9rem;">
              {{ storeName }}
              <i class="pi pi-copy pointer ml-1" @click="copyStoreNameHandler(storeName)"></i>
            </p>
          </div>
          <span :class="storeType" class="font-bold">{{ storeType }}</span>
        </Tag>
        <Tag v-else severity="info" class="pointer text-900" :class="`tag-${storeType}`" @click="copyStoreNameHandler(storeName)">
          {{ storeName }}
          <span :class="storeType" class="font-bold">{{ storeType }}</span>
        </Tag>
      </div>

      <Button
        @click="toggleMenu"
        class="ml-4"
        icon="pi pi-user"
        outlined
        rounded>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>

    <!-- Shopify permissions dialog -->
    <ShopifyPermissionsDialog v-if="shopifyPermissions.showDialog" />

    <!-- Enable universal store dialog -->
    <EnableUniversalStore v-if="isEnableUniversalStoreRequested" />
  </header>
</template>
