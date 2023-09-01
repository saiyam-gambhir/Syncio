<script setup>
import { useAuthStore } from 'auth';
import * as routes from '@/routes';

/* ----- Data ----- */
const auth = useAuthStore();

/* ----- Computed ----- */
const isFormDisabled = computed(() => {
  return auth.forgotPasswordForm.email.length === 0;
});
</script>

<template>
  <PageDetails title="Reset my passsword" content="Enter your Syncio account's email to reset your password. <br /> We'll send you an email with a link and instruction." />

  <aside class="auth-wrapper">
    <Message v-if="auth.forgotPasswordForm.emailSent" severity="success" :closable="false" class="p-message-lg mt-1 mb-0">
      Email sent to {{ auth.forgotPasswordForm.email }} <br />
      Check your inbox shortly for instructions
    </Message>

    <form v-else autocomplete="off">
      <div class="field">
        <InputText id="email" type="text" class="p-inputtext-lg mb-2 w-full" placeholder="Email address"
          v-model="auth.forgotPasswordForm.email" />
      </div>

      <Button label="Reset Password" class="w-full p-button-lg mt-2" :loading="auth.forgotPasswordForm.loading"
        iconPos="right" :disabled="isFormDisabled" @click="auth.forgotPassword()"></Button>
    </form>
  </aside>
  <div class="text-center mt-6">
    <p v-if="!auth.forgotPasswordForm.emailSent" class="text-xl mb-5">
      If you still need help contact
      <a href="mailto:support@syncio.co" class="btn-link text-xl">support@syncio.co</a>
    </p>
    <router-link :to="routes.LOGIN" class="btn-link hovered text-xl">Go back</router-link>
  </div>
</template>
