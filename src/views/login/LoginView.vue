<script setup>
import { useAuthStore } from '@/stores/auth'

/* ===== COMPONENTS ===== */
import Logo from '@/icons/Logo.vue'

/* ===== DATA ===== */
const auth = useAuthStore()

/* ===== METHODS ===== */
const loginHandler = () => {
  auth.login({
    email: auth.email,
    password: auth.password
  })
}

const shopifyLoginHandler = async () => {
  await auth.shopifyLogin('shopify', 'test-destination-20.myshopify.com')
}
</script>
<template>
  <section class="auth flex align-items-center justify-content-center w-full login-screen">
    <div class="grid auth-container">
      <div class="col-6 auth-left">
        <Logo />

        <p class="text-700 mb-0 mt-2">Less manual work and no more overselling. <br> Easily sync inventory, product fields, and orders in real-time across different stores.</p>

        <ul class="list-none p-0 mb-0 mt-5">
          <li class="pb-3">
            <div class="border-round surface-50 p-4 flex align-items-start">
              <span class="flex flex-shrink-0 align-items-center justify-content-center bg-red-300" style="width: 40px; height: 40px; border-radius:10px">
                <i class="text-xl text-white pi pi-save"></i>
              </span>
              <div class="ml-3">
                <span class="font-medium text-900 text-xl">Automate product updates and stock adjustments</span>
                <p class="mt-1 mb-0 text-600">Sync and customize product fields like Description, Price, Tags, Images and more</p>
              </div>
            </div>
          </li>

          <li class="pb-3">
            <div class="border-round surface-50 p-4 flex align-items-start">
              <span class="flex flex-shrink-0 align-items-center justify-content-center bg-red-300" style="width: 40px; height: 40px; border-radius:10px">
                <i class="text-xl text-white pi pi-bolt"></i>
              </span>
              <div class="ml-3">
                <span class="font-medium text-900 text-xl">Faster and easier order fulfilment</span>
                <p class="mt-1 mb-0 text-600">Auto-sync and push order information, fulfilment updates and tracking</p>
              </div>
            </div>
          </li>

          <li>
            <div class="border-round surface-50 p-4 flex align-items-start">
              <span class="flex flex-shrink-0 align-items-center justify-content-center bg-red-300" style="width: 40px; height: 40px; border-radius:10px">
                <i class="text-xl text-white pi pi-dollar"></i>
              </span>
              <div class="ml-3">
                <span class="font-medium text-900 text-xl">Easy revenue split between synced stores</span>
                <p class="mt-1 mb-0 text-600">Generate payouts with autofilled amounts from the orders to send payout information between stores</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-6 auth-right">
        <div class="flex align-items-center justify-content-between">
          <h1 class="text-3xl text-center line-height-3 m-0">Login to your account</h1>
          <a tabindex="0" class="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150 text-xl">Register</a>
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

        <form class="mt-6" autocomplete="off">
          <div class="field">
            <InputText id="email" type="text" class="p-inputtext-lg mb-3 w-full" placeholder="Email address" v-model="auth.email" />
          </div>
          <div class="field">
            <Password id="password" v-model="auth.password" class="p-inputtext-lg mb-3 w-full" placeholder="Password" :feedback="false" toggleMask />
          </div>

          <div class="flex align-items-center mt-6 mb-4">
            <a class="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150 text-xl">Forgot password?</a>
          </div>

          <Button label="Login" icon="pi pi-user" class="w-full p-button-lg" @click="loginHandler" :loading="auth.loading" iconPos="right"></Button>
          <Button label="Shopify Login" icon="pi pi-user" class="w-full p-button-lg mt-4" @click="shopifyLoginHandler" :loading="auth.loading" iconPos="right"></Button>
        </form>

      </div>
    </div>
  </section>
</template>
