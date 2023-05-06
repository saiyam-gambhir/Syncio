<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

/* ----- DATA ----- */
const auth = useAuthStore()

/* ----- COMPUTED ----- */
const isFormDisabled = computed(() => {
  return auth.forgotPasswordForm.email.length === 0
})
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <h1 class="text-3xl text-center line-height-3 m-0">Reset my passsword</h1>
  </div>
  <p class="mt-4 font-semibold">Enter your Syncio account's email to reset your password <br> We'll send you an email with a link and instruction</p>

  <Message v-if="auth.forgotPasswordForm.emailSent" severity="success" :closable="false" class="p-message-lg mt-5 mb-0">
    Email sent to {{ auth.forgotPasswordForm.email }} <br>
    Check your inbox shortly for instructions
  </Message>

  <form v-else class="mt-6" autocomplete="off">
    <div class="field">
      <InputText id="email" type="text" class="p-inputtext-lg mb-2 w-full" placeholder="Email address" v-model="auth.forgotPasswordForm.email" />
    </div>

    <Button label="Reset Password" class="w-full p-button-lg mt-2" :loading="auth.forgotPasswordForm.loading" iconPos="right" :disabled="isFormDisabled" @click="auth.forgotPassword()"></Button>
  </form>

  <div class="text-center mt-6">
    <p v-if="!auth.forgotPasswordForm.emailSent" class="text-xl mb-5">If you still need help contact <a href="mailto:support@syncio.co" class="btn-link text-xl">support@syncio.co</a></p>
    <router-link to="/login" class="btn-link hovered text-xl">Go back</router-link>
  </div>

</template>
