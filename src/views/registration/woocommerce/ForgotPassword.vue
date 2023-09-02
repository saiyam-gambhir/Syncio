<script setup>
import { useAuthStore } from 'auth';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  forgotPassword,
  forgotPasswordForm,
} = toRefs(useAuthStore());

/* ----- Computed ----- */
const isFormDisabled = computed(() => {
  return forgotPasswordForm.value.email.length === 0;
});
</script>

<template>
  <PageDetails
    content="Enter your Syncio account's email to reset your password. <br /> We'll send you an email with a link and instruction."
    title="Reset my passsword">
  </PageDetails>

  <aside class="auth-wrapper">
    <Message v-if="forgotPasswordForm.emailSent" severity="success" :closable="false" class="p-message-lg mt-1 mb-0">
      Email sent to {{ forgotPasswordForm.email }} <br />
      Check your inbox shortly for instructions.
    </Message>

    <form v-else autocomplete="off" @submit.prevent="forgotPassword">
      <div class="field">
        <InputText
          class="p-inputtext-lg mb-2 w-full"
          id="email"
          placeholder="Email address"
          type="text"
          v-model="forgotPasswordForm.email">
        </InputText>
      </div>

      <Button
        :disabled="isFormDisabled"
        :loading="forgotPasswordForm.loading"
        @click="forgotPassword()"
        class="w-full p-button-lg mt-2"
        iconPos="right"
        label="Reset Password">
      </Button>
    </form>
  </aside>

  <div class="text-center mt-6">
    <p v-if="!forgotPasswordForm.emailSent" class="text-xl mb-5">
      If you still need help contact
      <a href="mailto:support@syncio.co" class="btn-link text-xl">support@syncio.co</a>
    </p>
    <router-link :to="routes.LOGIN" class="btn-link hovered text-xl">Go back</router-link>
  </div>
</template>
