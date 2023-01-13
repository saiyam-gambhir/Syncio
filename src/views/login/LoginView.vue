<script setup>
import { useAuthStore } from '@/stores/auth'
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
  await auth.shopifyLogin('shopify', 'test-destination-0.myshopify.com')
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4 md:w-8 mx-auto align-self-center">
    <div class="text-center mb-6">
      <Logo />
    </div>

    <div>
      <label for="email" class="block text-900 font-semibold mb-2">Email</label>
      <InputText id="email" type="text" class="w-full mb-3" v-model="auth.email" />

      <label for="password" class="block text-900 font-semibold mb-2">Password</label>
      <InputText id="password" type="password" class="w-full mb-3" v-model="auth.password" />

      <Button label="Log In" icon="pi pi-user" class="w-full mt-2" @click="loginHandler" />
      <Button label="Shopify Login" @click="shopifyLoginHandler" class="w-full mt-4"></Button>
    </div>
  </div>
</template>
