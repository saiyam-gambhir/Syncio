<script setup>
import { useForm } from 'vee-validate';
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  forgotEmailErrorMessage,
  forgotPassword,
  forgotPasswordForm,
} = toRefs(useAuthStore());

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    emailAddress: yup.string().email(validationMessages.EMAIL).required(validationMessages.REQUIRED),
  }),
});

const [emailAddress] = defineField('emailAddress');

/* ----- Methods ----- */
const inputEmailHandler = () => {
  forgotEmailErrorMessage.value = null;
};
</script>

<template>
  <section class="mx-auto" style="width: 700px;">
    <PageDetails
      content="Enter your Syncio account's email to reset your password. <br /> We'll send you an email with a link and instruction."
      title="Reset my passsword">
    </PageDetails>

    <aside class="auth-wrapper">
      <Message v-if="forgotPasswordForm.emailSent" severity="success" :closable="false" class="p-message-lg mt-1 mb-0">
        Email sent to {{ emailAddress }} <br />
        Check your inbox shortly for instructions.
      </Message>

      <form v-else autocomplete="off" @submit.prevent="forgotPassword">
        <div class="field">
          <InputText
            @input="inputEmailHandler"
            class="p-inputtext-lg mb-2 w-full"
            id="email"
            placeholder="Email address"
            type="text"
            v-model="emailAddress">
          </InputText>
          <ValidationMessage :error="forgotEmailErrorMessage ?? errors.emailAddress" style="padding-bottom: 0 !important;" />
        </div>

        <Button
          :disabled="!meta.valid"
          :loading="forgotPasswordForm.loading"
          @click="forgotPassword(emailAddress)"
          class="w-full mt-2"
          iconPos="right"
          label="Reset Password"
          style="height: 46px;">
        </Button>
      </form>
    </aside>

    <div class="text-center mt-6">
      <p v-if="!forgotPasswordForm.emailSent" class="text-xl mb-5">
        If you still need help contact
        <a href="mailto:support@syncio.co" class="btn-link btn-link-dark text-xl">support@syncio.co</a>
      </p>
      <router-link :to="routes.LOGIN">
        <Button label="Go back" outlined raised class="p-button-lg outlined-button-hover w-25" style="margin-top: 0 !important;"></Button>
      </router-link>
    </div>
  </section>
</template>
