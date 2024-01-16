<script setup>
import { useForm } from 'vee-validate';
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  loadingResetPassword,
  resetPassword,
} = toRefs(useAuthStore());

const emailAddress = ref(null);
const errorMessage = ref(null);
const isPasswordResetSuccessful = ref(false);
const resetToken = ref(null);

/* ----- Mounted ----- */
onMounted(() => {
  getQueryParams();
});

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    password: yup.string().min(8, validationMessages.PASSWORD).required(validationMessages.REQUIRED),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required(validationMessages.REQUIRED),
  }),
});

const [password] = defineField('password');
const [passwordConfirmation] = defineField('passwordConfirmation');

/* ----- Methods ----- */
const getQueryParams = () => {
  const url = new URL(window.location)
  url.searchParams.sort()
  const token = url.search.split('&token=')
  resetToken.value = token[1]
  emailAddress.value = decodeURIComponent(token[0].split('?email=')[1])
};

const resetPasswordHander = async () => {
  const params = {
    email: emailAddress.value,
    password_confirmation: passwordConfirmation.value,
    password: password.value,
    token: resetToken.value,
  };

  const response = await resetPassword.value(params);

  if(response?.errors) {
    errorMessage.value = response?.errors[0];
  }

  if(response.success) {
    isPasswordResetSuccessful.value = true;
  }
};
</script>

<template>
  <section class="mx-auto" style="width: 700px;">
    <PageDetails title="WooCommerce: Reset my password" :content="!isPasswordResetSuccessful ? 'Enter your new password below' : ''" />

    <Message v-if="errorMessage" severity="error" :closable="true" class="p-message-lg mb-5" style="text-transform: capitalize; color: #fff !important;">
      {{ errorMessage }}
    </Message>

    <aside class="auth-wrapper" v-if="!isPasswordResetSuccessful">
      <form>
        <div class="field">
          <InputText
            disabled
            class="p-inputtext-lg mb-3 w-full"
            id="email"
            placeholder="Email address"
            type="text"
            v-model="emailAddress">
          </InputText>
        </div>

        <div class="field">
          <Password
            :class="{ 'p-invalid': errors.password }"
            :feedback="false"
            autocomplete="new-password"
            class="mb-3 w-full p-inputtext-lg"
            id="password"
            placeholder="Password"
            toggleMask
            v-model="password">
          </Password>

          <ValidationMessage :error="errors.password" />
        </div>

        <div class="field">
          <Password
            :class="{ 'p-invalid': errors.passwordConfirmation }"
            :disabled="!password"
            :feedback="false"
            autocomplete="new-password"
            class="mb-3 w-full p-inputtext-lg"
            id="password-confirmation"
            placeholder="Confirm password"
            toggleMask
            v-model="passwordConfirmation">
          </Password>

          <ValidationMessage :error="errors.passwordConfirmation" />
        </div>

        <Button
          :disabled="!meta.valid"
          :loading="loadingResetPassword"
          @click="resetPasswordHander"
          class="w-full p-button-lg mt-2"
          iconPos="right"
          label="Reset Password">
        </Button>
      </form>

      <div class="text-center mt-6 text-lg line-height-3 text-900">
        If you still need help, contact <a href="mailto:support@syncio.co" class="btn-link text-lg">support@syncio.co</a>
      </div>
    </aside>

    <aside class="auth-wrapper" v-else>
      <Message severity="success" :closable="false" class="p-message-lg mt-1 mb-0">
        Password reset success.
      </Message>

      <router-link :to="routes.LOGIN">
        <Button label="Login to Syncio" class="p-button-lg w-100 mt-5"></Button>
      </router-link>
    </aside>
  </section>
</template>
