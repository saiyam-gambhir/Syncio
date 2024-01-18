<script setup>
import { useForm } from 'vee-validate';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Validations ----- */
const { errors, meta, defineField, handleReset } = useForm({
  validationSchema: yup.object({
    consumerKey: yup.string().required(validationMessages.REQUIRED),
    consumerSecretKey: yup.string().required(validationMessages.REQUIRED),
  }),
});

/* ----- Data ----- */
const {
  isInvalidKey,
  isUpdateAPIKeyDialogVisible,
  isUpdateAPISuccess,
  loadingAPIKeyUpdate,
  updateAPIKey,
} = toRefs(useConnectionsStore());

const {
  showToast,
} = useToasts();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isUpdateAPIKeyDialogVisible.value = false;
  consumerKey.value = '';
  consumerSecretKey.value = '';
  isUpdateAPISuccess.value = false;
  isInvalidKey.value = false;
  handleReset();
};

const [consumerKey] = defineField('consumerKey');
const [consumerSecretKey] = defineField('consumerSecretKey');

const handleUpdateAPIKey = async () => {
  await updateAPIKey.value(consumerKey.value, consumerSecretKey.value);
  if (isInvalidKey.value) {
    return;
  }
  showToast({ message: 'API key successfully updated.' })
  closeDialogHandler();
};
</script>

<template>
  <DialogWrapper :isVisible="isUpdateAPIKeyDialogVisible" @closeDialog="closeDialogHandler"
    title="Update WooCommerce Store API Key" :showFooter="false">
    <template #body>
      <p class="text-xl font-bold text-center m-0 pb-1 line-height-3">
        Please provide us with a new API key to continue using Syncio.
      </p>
      <p class="text-lg ml-2 line-height-3">
        Instructions
      </p>
      <p class="text-lg ml-2 mt-1 line-height-3">
        1. Go to WooCommerce -> Settings -> Advanced -> REST API and click "Add key"
      </p>
      <p class="text-lg ml-2 mt-1 line-height-3">
        2. In the submit form, add a description, select a valid user, and select the "Read/Write" permission.
      </p>
      <p class="text-lg ml-2 mt-1 line-height-3">
        3. Click "Generate API key".
      </p>
      <p class="text-lg ml-2 mt-1 line-height-3">
        4. Paste the generated Consumer key and secret key below.
      </p>

      <div class="flex align-items-center justify-content-between">
        <InputText placeholder="Consumer Key" class="w-full m-2" :class="{ 'p-invalid': errors.consumerKey }"
          v-model="consumerKey">
        </InputText>
        <InputText placeholder="Consumer Secret Key" class="w-full m-2" :class="{ 'p-invalid': errors.consumerSecretKey }"
          v-model="consumerSecretKey">
        </InputText>
      </div>
      <div class="flex">
        <div class="ml-1 w-50">
          <ValidationMessage :error="errors.consumerKey" />
        </div>
        <div class="ml-1">
          <ValidationMessage :error="errors.consumerSecretKey" />
        </div>
      </div>
      <div class="text-center" v-if="isInvalidKey">
        <p class="text-lg p-error">API key & Secret are not valid!</p>
      </div>
      <div class="mt-4">
        <Button :loading="loadingAPIKeyUpdate" :disabled="!meta.valid" class="text-lg w-full px-4"
          @click="handleUpdateAPIKey" label="Update"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>