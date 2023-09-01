<script setup>
import { useAuthStore } from 'auth';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  registrationForm,
} = toRefs(useAuthStore());
</script>

<template>
  <PageDetails title="Register and create your account" content="You'll use these details to login in the future" />

  <aside class="auth-wrapper">
    <form autocomplete="current-password">
      <div class="field">
        <InputText
          class="p-inputtext-lg mb-3 w-full"
          id="name"
          placeholder="Your name"
          type="text"
          v-model="registrationForm.name">
        </InputText>
      </div>

      <div class="field">
        <InputText
          class="p-inputtext-lg mb-3 w-full"
          id="email"
          placeholder="Email address"
          type="text"
          v-model="registrationForm.email">
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
          v-model="registrationForm.password">
        </Password>
      </div>

      <div class="field">
        <Password
          :feedback="false"
          autocomplete="new-password"
          class="mb-3 w-full p-inputtext-lg"
          id="password-confirmation"
          placeholder="Confirm password"
          toggleMask
          v-model="registrationForm.passwordConfirmation">
        </Password>
      </div>

      <Button
        class="w-full p-button-lg"
        iconPos="right"
        label="Create Syncio account">
      </Button>
    </form>
  </aside>

  <div class="text-center">
    <router-link :to="routes.LOGIN">
      <Button label="Already have an account? Login here" outlined raised class="p-button-lg outlined-button-hover w-75 mt-6"></Button>
    </router-link>
  </div>
</template>
