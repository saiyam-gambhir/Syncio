<script setup>
/* ----- Data ----- */
const {
  registerWooStore,
  user,
} = toRefs(useAuthStore());

const arePermissionsApproved = ref(false);
const storeType = ref('');
const storeUrl = ref('');

/* ----- Mounted ----- */
onMounted(() => {
  const url = new URL(window.location);
  let searchParams = url.searchParams;
  arePermissionsApproved.value = searchParams.get('success') === '1';
  storeUrl.value = searchParams.get('store');

  if(url.searchParams.get('type')) storeType.value = url.searchParams.get('type');
  else if(this.currentShop && this.currentShop.type) storeType.value = this.currentShop.type;
  else if(window.sessionStorage.getItem('type')) storeType.value = window.sessionStorage.getItem('type');
});

/* ----- Methods ----- */
const registerStore = async () => {
  let withoutHttps;
  withoutHttps = storeUrl.value.replace(/^http(s)*:\/\//, '');
  withoutHttps = withoutHttps.replace(/\/$/, '');
  const params = {
    platform_api_version: 'v3',
    platform: 'woocommerce',
    type: shopType,
    url: withoutHttps,
    user_id: user.value.id,
  };

  try {
    const response = await registerWooStore.value(params);
    let redirectUrl = response?.redirect_url;
    redirectUrl += import.meta.env.VITE_WOO_REDIRECT_URL + '?store=' + withoutHttps + '&type=' + shopType;
    window.location.href = redirectUrl;
  } catch (error) {
    //storeAlreadyUsedError = error.data.errors[0]
  }
}
</script>

<template>
  <!-- <h1 v-if="arePermissionsApproved">Approved</h1>
  <h1 v-else>Denied</h1> -->
</template>

<!-- <script>
import { CheckCircleIcon } from '@/icons'
import { mapGetters, mapState } from 'vuex'
import { REGISTER_SHOP } from '@/store/actions.type'
import JwtService from '@/common/jwt.service'
import OnboardingCard from '../../OnboardingCard.vue'
import OnboardingHeading from '../../OnboardingHeading.vue'

export default {
  name: 'Permissions',

  data() {
    return {
      arePermissionsApproved: false,
      storeType: '',
      storeUrl: '',
    }
  },

  components: {
    CheckCircleIcon,
    OnboardingCard,
    OnboardingHeading,
  },

  async mounted() {

    await this.$store.dispatch(`shop/init`)
    if(url.searchParams.get('type')) this.storeType = url.searchParams.get('type')
    else if(this.currentShop && this.currentShop.type) this.storeType = this.currentShop.type
    else if(window.sessionStorage.getItem('type')) this.storeType = window.sessionStorage.getItem('type')
  },

  computed: {
    ...mapGetters('shop', ["newShopType"]),
    ...mapGetters('auth', ["currentUserID"]),
    ...mapState('shop', [ 'currentShop' ]),

    wooPlanSelectionLink() {
      return `${process.env.VUE_APP_WOO_BILLING}/?jwt=${JwtService.getToken()}`;
    },
  },

  watch: {
    'storeType'() {
      if(this.storeType === 'source' && this.arePermissionsApproved) {
        this.$router.push('/woocommerce/installation-completed')
      }
    },
  },

  methods: {
    registerStore() {
      let withoutHttps;
      withoutHttps = this.storeUrl.replace(/^http(s)*:\/\//, "")
      withoutHttps = withoutHttps.replace(/\/$/, "")
      this.$store.dispatch(`shop/${REGISTER_SHOP}`, {
        user_id: this.currentUserID,
        url: withoutHttps,
        platform_api_version: "v3",
        platform: "woocommerce",
        type: this.storeType
      }).then((response) => {
        let redirectUrl = response.redirect_url;
        redirectUrl += process.env.VUE_APP_WOO_REDIRECT_URI + '?store=' + withoutHttps + '?type=' + this.storeType;
        window.location.href = redirectUrl;
      }).catch((error) => {
        console.log(error)
      })
    },

    navigateToWooPlanSelction() {
      window.location.href = this.wooPlanSelectionLink
    }
  }
}
</script>

<template>
  <section class="onboarding v2">

    <template v-if="arePermissionsApproved && storeType === 'destination'">
      <OnboardingHeading heading="Syncio installed successfully" />
      <p class="onboarding-text m-t-2">
        Select your Syncio plan to activate your free 14 day trial
      </p>

      <div :class="{ 'm-t-4': arePermissionsApproved, 'm-t-8': !arePermissionsApproved }">
        <OnboardingCard medium>
          <ul class="onboarding-complete-list m-0">
            <li>
              <CheckCircleIcon />
              One click copy and import products from <br> other Shopify & WooCommerce stores
            </li>
            <li>
              <CheckCircleIcon />
              Real time auto-inventory cross-platform <br> syncing
            </li>
            <li>
              <CheckCircleIcon />
              Unlimited source store connections
            </li>
          </ul>
        </OnboardingCard>

        <div class="outside-card-btn">
          <v-btn
            @click="navigateToWooPlanSelction"
            block
            class="onboarding-btn m-y-6"
            color="primary"
            elevation="0">
            Pick a plan and activate my free trial
          </v-btn>
        </div>
      </div>
    </template>

    <OnboardingCard v-else-if="!arePermissionsApproved" large>
      <div class="text-center url-linked-text">
        <p class="lg">You've denied Syncio access to connect to your store</p>
        <p>In order to send and receive stock and updates between the stores you've connected to, <br> Syncio requires Read & Write permissions for an API Key and Webhooks.</p>
        <p>Syncio will only use these permissions to perform essential product and order updates.</p>
        <p class="lg">Would you like to grant permissions to Syncio now?</p>

        <v-btn
          @click="registerStore"
          block
          class="onboarding-btn m-t-4"
          color="primary"
          elevation="0">
          Continue to permissions approval
        </v-btn>
      </div>
    </OnboardingCard>

    <div class="text-center m-t-4" v-if="!arePermissionsApproved">
      <router-link to="/registration/woocommerce/continue-later" class="btn-later relative">
        Signout, continue later
      </router-link>
    </div>
  </section>
</template> -->
