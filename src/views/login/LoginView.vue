<script setup>
import { useForm } from 'vee-validate';
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Components ----- */
const UpdateAPIKeyDialog = defineAsyncComponent(() => import('../accountSettings/components/UpdateAPIKeyDialog.vue'));

/* ----- Data ----- */
const interval = ref('');
const isContinueInstallation = ref(false);
const shopifyStore = ref(null);
const showWooLogin = ref(true);
const timer = ref(3);
const route = useRoute();

const {
  login,
  loginForm,
  shopifyLogin,
  wooEmailErrorMessage,
  wooPasswordErrorMessage,
} = toRefs(useAuthStore());

const {
  isUpdateAPIKeyDialogVisible
} = toRefs(useConnectionsStore());

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    emailAddress: yup.string().email(validationMessages.EMAIL).required(validationMessages.REQUIRED),
    password: yup.string().required(validationMessages.REQUIRED),
  }),
});

const [emailAddress] = defineField('emailAddress');
const [password] = defineField('password');

/* ----- Mounted ----- */
onMounted(() => {
  isContinueInstallation.value = route.query && route.query.continue === 'true';
});

/* ----- Computed ----- */
const isDevelopment = computed(() => {
  return import.meta.env.VITE_NODE_ENV === 'development';
})

/* ----- Methods ----- */
const loginHandler = () => {
  login.value({ email: emailAddress.value, password: password.value });
};

const shopifyLoginHandler = async () => {
  await shopifyLogin.value('shopify', shopifyStore.value);
};

const startTimer = () => {
  timer.value -= 1;
  if (timer.value < 0) {
    timer.value = 0;
  }
  if (timer.value === 0) {
    window.location.href = 'https://accounts.shopify.com/store-login';
  }
};

const showWooLoginHandler = () => {
  showWooLogin.value = true;
  timer.value = 3;
  if (interval.value) {
    clearInterval(interval.value);
  }
};

const showShopifyLoginHandler = () => {
  showWooLogin.value = false;
  interval.value = setInterval(startTimer, 1000);
};

const inputEmailHandler = () => {
  wooEmailErrorMessage.value = null;
};

const inputPasswordHandler = () => {
  wooPasswordErrorMessage.value = null;
};
</script>

<template>
  <section class="mx-auto" style="width: 700px;">
    <div class="text-center">
      <h1 class="text-5xl line-height-3 my-6 font-bold" v-if="!isContinueInstallation">
        Login to your account
      </h1>
      <template v-else>
        <h1 class="text-5xl line-height-3 mt-6 mb-0 font-bold">
          Welcome Back!
        </h1>
        <p class="mt-2 mb-6 text-2xl font-semi">Login to continue installing Syncio</p>
      </template>
    </div>

    <aside class="auth-wrapper">
      <div class="flex justify-content-between login-platforms" v-if="!isContinueInstallation">
        <Button @click="showWooLoginHandler" :class="{ 'active-btn': showWooLogin }" class="platform-btn mr-2 w-6 font-bold border-1 surface-border surface-0 p-button-lg p-component text-900 inline-flex align-items-center justify-content-center">
          <img src="@/assets/images/wo-logo-sm.png" alt="shopify logo" class="mr-2" />
          <span class="ml-2">WooCommerce</span>
        </Button>

        <Button @click="showShopifyLoginHandler" :class="{ 'active-btn': !showWooLogin }" class="platform-btn ml-2 w-6 font-bold border-1 surface-border surface-0 p-button-lg p-component text-600 inline-flex align-items-center justify-content-center">
          <a href="#" class="text-900 flex align-items-center">
            <img src="@/assets/images/shopify-logo-sm.png" alt="shopify logo" class="mr-2" />
            <span class="ml-2">Shopify</span>
          </a>
        </Button>
      </div>

      <form v-if="showWooLogin" :class="{ 'mt-6': !isContinueInstallation }" autocomplete="current-password">
        <div class="field">
          <InputText
            class="p-inputtext-lg mb-3 w-full"
            id="email"
            @input="inputEmailHandler"
            placeholder="Email address"
            type="text"
            v-model="emailAddress" autocomplete="email">
          </InputText>
          <ValidationMessage :error="wooEmailErrorMessage ?? errors.emailAddress" />
        </div>

        <div class="field">
          <Password
            :feedback="false"
            @input="inputPasswordHandler"
            autocomplete="new-password"
            class="mb-3 w-full p-inputtext-lg"
            id="password"
            placeholder="Password"
            toggleMask
            v-model="password">
          </Password>
          <ValidationMessage :error="wooPasswordErrorMessage ?? errors.password" />
        </div>

        <div class="flex align-items-center mb-6">
          <router-link :to="routes.FORGOT_PASSWORD" class="btn-link hovered text-xl">Forgot password?</router-link>
        </div>

        <Button
          :disabled="!meta.valid"
          :loading="loginForm.loading"
          @click="loginHandler"
          class="w-full p-button-lg"
          iconPos="right"
          label="Login">
        </Button>

        <div v-if="isDevelopment" class="flex mt-4">
          <div class="col-6 pl-0">
            <InputText
              autocomplete="email"
              class="w-full"
              id="email"
              placeholder="Store URL"
              style="height: 54px"
              type="text"
              v-model="shopifyStore">
            </InputText>
          </div>
          <div class="col-6 pr-0">
            <Button
              :disabled="!shopifyStore"
              :loading="loginForm.loading"
              @click="shopifyLoginHandler"
              class="w-full p-button-lg"
              icon="pi pi-user"
              iconPos="right"
              label="Shopify Login">
            </Button>
          </div>
        </div>

        <ul class="text-900 pl-0 list-none text-xl font-semi pt-4 m-0" v-if="isContinueInstallation">
          <li class="flex mt-4">
            <i class="pi pi-check-circle text-2xl text-green-700 font-bold mr-3" style="transform: translateY(-.5px);"></i>
            One click copy and sync products with Woo and Shopify stores
          </li>
          <li class="flex mt-4">
            <i class="pi pi-check-circle text-2xl text-green-700 font-bold mr-3" style="transform: translateY(-.5px);"></i>
            Real time auto-stock syncing between platforms
          </li>
          <li class="flex mt-4">
            <i class="pi pi-check-circle text-2xl text-green-700 font-bold mr-3" style="transform: translateY(-.5px);"></i>
            Connect to unlimited stores
          </li>
        </ul>
      </form>

      <div v-else class="text-center text-900 mt-7">
        <p class="text-xl mt-0">Redirecting you to Login Via Shopify</p>
        <h3 class="text-3xl font-bold mb-0">{{ timer }}</h3>
      </div>
    </aside>

    <div class="text-center">
      <router-link :to="routes.PLATFORM_SELECTION">
        <Button label="Don't have an account? Register for Syncio" outlined raised class="p-button-lg outlined-button-hover w-75 mt-6"></Button>
      </router-link>
    </div>
  </section>

  <!-- Woo Update API Key  -->
  <UpdateAPIKeyDialog v-if="isUpdateAPIKeyDialogVisible" redirectToDashboard />
</template>

<style scoped>
.platform-btn {
  opacity: .75;
}

.platform-btn.active-btn {
  opacity: 1 !important;
  pointer-events: none;
}
</style>
