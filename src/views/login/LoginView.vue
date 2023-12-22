<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const shopifyStore = ref(null);

const {
  login,
  loginForm,
  shopifyLogin,
} = toRefs(useAuthStore());

/* ----- Computed ----- */
const isDevelopment = computed(() => {
  return import.meta.env.VITE_NODE_ENV === 'development';
})

/* ----- Methods ----- */
const loginHandler = () => {
  const { email, password } = loginForm.value;
  login.value({ email, password });
};

const shopifyLoginHandler = async () => {
  //await shopifyLogin.value('shopify', 'alpha-jimmy.myshopify.com');
  //await shopifyLogin.value('shopify', 'test-saiyam-destination.myshopify.com');
  //await shopifyLogin.value('shopify', 'zac-destination-3.myshopify.com'); // Navbar add-ons dialogs
  //await shopifyLogin.value('shopify', 'dev-destination-1.myshopify.com'); // Update add-on plan dialogs
  const response = await shopifyLogin.value('shopify', shopifyStore.value);
  //await shopifyLogin.value('shopify', 'test-nainesh-source-2.myshopify.com');
};
</script>

<template>
  <section class="mx-auto" style="width: 700px;">
    <div class="text-center">
      <h1 class="text-5xl line-height-3 my-6 font-bold">
        Login to your account
      </h1>
    </div>
    <aside class="auth-wrapper">
      <div class="flex justify-content-between login-platforms">
        <Button class="active-btn mr-2 w-6 font-bold border-1 surface-border surface-0 p-button-lg p-component text-900 inline-flex align-items-center justify-content-center">
          <img src="@/assets/images/wo-logo-sm.png" alt="shopify logo" class="mr-2" />
          <span class="ml-2">WooCommerce</span>
        </Button>
        <Button class="ml-2 w-6 font-bold border-1 surface-border surface-0 p-button-lg p-component text-600 inline-flex align-items-center justify-content-center">
          <img src="@/assets/images/shopify-logo-sm.png" alt="shopify logo" class="mr-2" />
          <span class="ml-2">Shopify</span>
        </Button>
      </div>

      <form class="mt-6" autocomplete="current-password">
        <div class="field">
          <InputText
            class="p-inputtext-lg mb-3 w-full"
            id="email"
            placeholder="Email address"
            type="text"
            v-model="loginForm.email" autocomplete="email">
          </InputText>
        </div>

        <div class="field">
          <Password
            :feedback="false"
            autocomplete="new-password"
            class="mb-3 w-full p-inputtext-lg"
            id="password"
            placeholder="Password"
            toggleMask
            v-model="loginForm.password">
          </Password>
        </div>

        <div class="flex align-items-center mb-6">
          <router-link :to="routes.FORGOT_PASSWORD" class="btn-link hovered text-xl">Forgot password?</router-link>
        </div>

        <Button
          :loading="loginForm.loading"
          @click="loginHandler"
          class="w-full p-button-lg"
          iconPos="right"
          label="Login">
        </Button>

        <div v-if="!isDevelopment" class="flex mt-4">
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
      </form>
    </aside>

    <div class="text-center">
      <router-link :to="routes.PLATFORM_SELECTION">
        <Button label="Don't have an account? Register for Syncio" outlined raised class="p-button-lg outlined-button-hover w-75 mt-6"></Button>
      </router-link>
    </div>
  </section>
</template>
