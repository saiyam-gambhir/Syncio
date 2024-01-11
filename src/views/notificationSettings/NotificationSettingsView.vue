<script setup>
import { useForm } from 'vee-validate';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  currentStore,
  fetchCurrentStore,
  loadingEmail,
  updateEmail,
} = toRefs(useConnectionsStore());

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    currentStoreEmail: yup.string().email(validationMessages.EMAIL).required(validationMessages.REQUIRED),
  }),
});
const [currentStoreEmail] = defineField('currentStoreEmail');

/* ----- Computed ----- */
const isEmailUnchanged = computed(() => {
  return currentStore.value.email === currentStoreEmail.value || currentStoreEmail.value === '';
});

/* ----- Mounted ----- */
onMounted(async () => {
  currentStoreEmail.value = currentStore.value.email;
});

/* ----- Methods ----- */
const updateEmailHandler = async () => {
  await updateEmail.value(currentStoreEmail.value);
  await fetchCurrentStore.value();
};
</script>

<template>
  <PageHeader content="Choose how you'd like to receive communications for your account" title="Notification settings">
  </PageHeader>

  <article class="grid mt-1">
    <div class="col col-6">
      <h4 class="font-medium text-2xl mt-0">Preferred contact method</h4>
      <h5 class="font-medium text-xl mb-0">Email</h5>
      <p class="text-gray-500">
        The email address where you'd like to receive emails and system alerts
      </p>
    </div>
    <div class="col col-6">
      <div class="grid mt-7">
        <div class="col col-8">
          <InputText
            :class="{ 'p-invalid mb-3': errors.currentStoreEmail }"
            class="mr-4 w-full"
            size="large"
            type="email"
            v-model="currentStoreEmail">
          </InputText>
          <ValidationMessage :error="errors.currentStoreEmail" />
        </div>
        <div class="col col-4">
          <Button
            class="w-full"
            :disabled="isEmailUnchanged || !meta.valid"
            :loading="loadingEmail"
            label="Update email"
            size="large"
            style="height: 3.45rem"
            @click="updateEmailHandler">
          </Button>
        </div>
      </div>
    </div>
  </article>
</template>
