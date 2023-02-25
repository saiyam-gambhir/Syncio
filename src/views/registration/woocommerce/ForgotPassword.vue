<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

/* ===== DATA ===== */
const auth = useAuthStore()
const emailAddress = ref('saiyam+1111@syncio.co')
const isEmailSent = ref(false)
const loading = ref(false)

/* ===== METHODS ===== */
const forgotPasswordHandler = () => {
  loading.value = true
  auth.forgotPassword(emailAddress.value).then(response => {
    isEmailSent.value = response?.data.success
    loading.value = !response?.data.success
    if(!response) {
      loading.value = false
    }
  }).catch(error => {
    loading.value = false
  })
}
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <h1 class="text-3xl text-center line-height-3 m-0">Reset my passsword</h1>
    <router-link to="/woocommerce/create-account" class="btn-link hovered text-xl">Register</router-link>
  </div>
  <p class="mt-4 font-semibold">Enter your Syncio account's email to reset your password <br> We'll send you an email with a link and instruction</p>

  <Message v-if="isEmailSent" severity="success" :closable="false" class="p-message-lg mt-5 mb-0">
    Email sent to {{ emailAddress }} <br>
    Check your inbox shortly for instructions
  </Message>

  <form v-else class="mt-6" autocomplete="off">
    <div class="field">
      <InputText id="email" type="text" class="p-inputtext-lg mb-3 w-full" placeholder="Email address" v-model="emailAddress" />
    </div>

    <Button label="Reset Password" class="w-full p-button-lg" :loading="loading" iconPos="right" @click="forgotPasswordHandler" />
  </form>

  <div class="text-center mt-6">
    <p v-if="!isEmailSent" class="text-xl mb-5">If you still need help contact <a href="mailto:support@syncio.co" class="btn-link text-xl">support@syncio.co</a></p>
    <router-link to="/login" class="btn-link hovered text-xl">Go back</router-link>
  </div>

</template>
