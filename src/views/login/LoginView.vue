<script setup>
import { useAuthStore } from '@/stores/auth'

/* ===== DATA ===== */
const auth = useAuthStore()

/* ===== METHODS ===== */
const loginHandler = () => {
  const { email, password } = auth.loginForm
  auth.login({ email, password })
}

const shopifyLoginHandler = async () => {
  await auth.shopifyLogin('shopify', 'test-nainesh-destination.myshopify.com')
}
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <h1 class="text-3xl text-center line-height-3 m-0">Login to your account</h1>
    <router-link to="/woocommerce/create-account" class="btn-link hovered text-xl">Register</router-link>
  </div>

  <div class="flex justify-content-between mt-5 login-platforms">
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
      <InputText id="email" type="text" class="p-inputtext-lg mb-3 w-full" placeholder="Email address" v-model="auth.loginForm.email" autocomplete="email" />
    </div>

    <div class="field">
      <Password id="password" class="p-inputtext-lg mb-3 w-full" placeholder="Password" v-model="auth.loginForm.password" autocomplete="new-password" :feedback="false" toggleMask />
    </div>

    <div class="flex align-items-center mt-5 mb-4">
      <router-link to="/forgot-password" class="btn-link hovered text-xl">Forgot password?</router-link>
    </div>

    <Button label="Login" class="w-full p-button-lg" @click="loginHandler" :loading="auth.loginForm.loading" iconPos="right"></Button>
    <Button label="Shopify Login" icon="pi pi-user" class="w-full p-button-lg mt-4" @click="shopifyLoginHandler" :loading="auth.loading" iconPos="right"></Button>
  </form>
</template>
