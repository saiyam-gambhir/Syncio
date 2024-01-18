<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const interval = ref('');
const shopifyStore = ref(null);
const showWooLogin = ref(true);
const timer = ref(3);

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

      <form v-if="showWooLogin" class="mt-6" autocomplete="current-password">
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
</template>

<style scoped>
.platform-btn {
  opacity: .75;
}

.platform-btn.active-btn {
  opacity: 1 !important;
}
</style>
