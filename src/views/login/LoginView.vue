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
  await auth.shopifyLogin('shopify', 'test-destination-store-deep.myshopify.com')
}
</script>

<template>
<div class="px-4 py-8 md:px-6 lg:px-8 w-100 flex align-items-center justify-content-center login-screen">
  <div class="flex flex-wrap">
    <div class="w-full lg:w-6 p-4 lg:p-7" style="background-color: rgba(255,255,255,.7)">
      <div class="w-100">
        <Logo />
        <div class="text-xl text-900 font-500 mb-3 mt-3">Welcome to Syncio</div>
          <p class="text-600 line-height-3 mt-0 mb-6">Quis vel eros donec ac odio tempor orci dapibus. In hac habitasse platea dictumst quisque.</p>
          <ul class="list-none p-0 m-0">
            <li class="flex align-items-start mb-4">
              <div>
                <span class="flex align-items-center justify-content-center bg-red-400" style="width:38px;height:38px;border-radius:10px">
                  <i class="text-xl text-white pi pi-inbox"></i>
                </span>
              </div>
              <div class="ml-3">
                <span class="font-medium text-900">Unlimited Inbox</span>
                <p class="mt-2 mb-0 text-600 line-height-3">Tincidunt nunc pulvinar sapien et. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. </p>
              </div>
            </li>
            <li class="flex align-items-start mb-4">
              <div>
                <span class="flex align-items-center justify-content-center bg-red-400" style="width:38px;height:38px;border-radius:10px">
                  <i class="text-xl text-white pi pi-shield"></i>
                </span>
              </div>
              <div class="ml-3">
                <span class="font-medium text-900">Premium Security</span>
                <p class="mt-2 mb-0 text-600 line-height-3">Scelerisque purus semper eget duis at tellus at urna. Sed risus pretium quam vulputate.</p>
              </div>
            </li>
            <li class="flex align-items-start">
              <div>
                <span class="flex align-items-center justify-content-center bg-red-400" style="width:38px;height:38px;border-radius:10px">
                  <i class="text-xl text-white pi pi-globe"></i>
                </span>
              </div>
              <div class="ml-3">
                <span class="font-medium text-900">Cloud Backups Inbox</span>
                <p class="mt-2 mb-0 text-600 line-height-3">Egestas sed tempus urna et. Auctor elit sed vulputate mi sit amet mauris commodo.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full lg:w-6 p-4 lg:p-7 flex align-items-center" style="background-color: rgba(255,255,255,.9)">
        <div class="w-100">
          <div class="text-900 text-2xl font-bold mt-0 mb-6">Login</div>
          <label for="email" class="block text-900 font-semibold mb-2">Email</label>
          <InputText id="email" type="text" class="w-full mb-4" v-model="auth.email" />

          <label for="password" class="block text-900 font-semibold mb-2">Password</label>
          <InputText id="password" type="password" class="w-full mb-4" v-model="auth.password" />

          <Button label="Log In" icon="pi pi-user" class="w-full mt-2" @click="loginHandler" :loading="auth.loading" iconPos="right"></Button>
          <Button label="Shopify Login" icon="pi pi-user" @click="shopifyLoginHandler" class="w-full mt-4" :loading="auth.loading" iconPos="right"></Button>
        </div>
      </div>
    </div>
  </div>
</template>
