<script setup>
import { useForm } from 'vee-validate';
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  registerUser,
  registrationForm,
} = toRefs(useAuthStore());

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(validationMessages.REQUIRED),
    emailAddress: yup.string().email(validationMessages.EMAIL).required(validationMessages.REQUIRED),
    password: yup.string().matches(/[#?!@$%^&*-]/, validationMessages.PASSWORD).min(8, validationMessages.PASSWORD),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], validationMessages.PASSWORD_CONFIRMATION).required(validationMessages.REQUIRED),
  }),
});

const [name] = defineField('name');
const [emailAddress] = defineField('emailAddress');
const [password] = defineField('password');
const [passwordConfirmation] = defineField('passwordConfirmation');

/* ----- Methods ----- */
const registerUserHandler = async () => {
  const payload = { name, emailAddress, password, passwordConfirmation };
  await registerUser.value(payload);
};
</script>

<template>
  <section class="mx-auto" style="width: 700px; max-width: 100%;">
    <PageDetails title="Register and create your account" content="You'll use these details to login in the future" />

    <aside class="auth-wrapper">
      <form autocomplete="current-password">
        <div class="field">
          <InputText
            :class="{ 'p-invalid' : errors.name }"
            class="p-inputtext-lg mb-3 w-full"
            id="name"
            placeholder="Your name"
            type="text"
            v-model="name">
          </InputText>

          <ValidationMessage :error="errors.name" />
        </div>

        <div class="field">
          <InputText
            :class="{ 'p-invalid': errors.emailAddress }"
            class="p-inputtext-lg mb-3 w-full"
            id="email"
            placeholder="Email address"
            type="text"
            v-model="emailAddress">
          </InputText>

          <ValidationMessage :error="errors.emailAddress" />
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
          :loading="registrationForm.loading"
          @click="registerUserHandler"
          class="w-full p-button-lg mt-2"
          iconPos="right"
          label="Create Syncio account">
        </Button>
      </form>

      <div class="text-center mt-6 text-lg line-height-3 text-900">
        By proceeding with the registration, you are agreeing to the <br>
        Syncio <AppLink class="text-lg" label="terms and conditions" link="https://www.syncio.co/terms-and-conditions" :icon="false" /> and <AppLink class="text-lg" label="privacy policy" link="https://www.syncio.co/privacy-policy" :icon="false" />
      </div>
    </aside>

    <div class="text-center">
      <router-link :to="routes.LOGIN">
        <Button label="Already have an account? Login here" outlined raised class="p-button-lg outlined-button-hover w-75 my-6"></Button>
      </router-link>
    </div>
  </section>
</template>
