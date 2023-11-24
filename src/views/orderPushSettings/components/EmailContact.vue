<script setup>
/* ----- Data ----- */
const emailAddress = ref('');
const isSettingsChanged = ref(false);

const {
  currentStore,
} = toRefs(useConnectionsStore());

const {
  loadingSettings,
  pushOrderEmailSettings,
  stringifyPushOrderEmailSettings,
  updatePushSettings,
} = toRefs(useOrdersStore());

/* ----- Watch ----- */
watch(pushOrderEmailSettings, (newValue, oldValue) => {
  emailAddress.value = newValue?.custom_value;
  if(newValue) {
    isSettingsChanged.value = JSON.stringify(newValue) !== JSON.stringify(stringifyPushOrderEmailSettings.value);
  }
}, { deep: true });

/* ----- Methods ----- */
const cancelHandler = () => {
  pushOrderEmailSettings.value = JSON.parse(JSON.stringify(stringifyPushOrderEmailSettings.value));
};

const updatePushSettingsHandler = async () => {
  const { id, value } = pushOrderEmailSettings.value;
  let data = null;

  emailAddress ? data = `${value}:${emailAddress.value}` : data = value;
  await updatePushSettings.value(data, id);
  isSettingsChanged.value = false;
};
</script>

<template>
  <CardWrapper v-if="pushOrderEmailSettings">
    <template #content>
      <p class="line-height-3 mb-4 mt-0">
        Select which email to be pushed with an order.<br>
        The selected e-mail will receive any relevant notification e-mails from the source store, including when an order is fulfilled.
      </p>

      <ul class="list-none p-0 m-0">
        <li class="flex align-items-center py-4 flex-wrap">
          <RadioButton v-model="pushOrderEmailSettings.value" inputId="store-email" name="email" value="destination_store_email" />
          <div class="ml-4">
            <p class="m-0 text-lg font-semibold">{{ currentStore?.email }}</p>
            <p class="m-0">Use your destination store's e-mail address.</p>
          </div>
        </li>
        <li class="flex align-items-center py-4 border-top-1 surface-border flex-wrap">
          <RadioButton v-model="pushOrderEmailSettings.value" inputId="customer-email" name="email" value="customer_email" />
          <div class="ml-4">
            <p class="m-0 text-lg font-semibold">Customer's Email</p>
            <p class="m-0">Use customer's e-mail entered during checkout.</p>
            <p class="m-0"><strong class="font-semibold">Note:</strong> Customers will receive fulfillment e-mails from source store.</p>
          </div>
        </li>
        <li class="flex align-items-center py-4 border-top-1 surface-border flex-wrap">
          <RadioButton v-model="pushOrderEmailSettings.value" inputId="other-email" name="email" value="custom_email" />
          <div class="ml-4 w-75">
            <p class="m-0 text-lg font-semibold">Other:</p>
            <InputText class="w-50 mt-2" placeholder="Enter an email address" v-model="emailAddress" />
          </div>
        </li>
      </ul>

      <Divider />

      <div class="flex">
        <Button label="Cancel" @click="cancelHandler" :disabled="!isSettingsChanged" outlined></Button>
        <Button :loading="loadingSettings" label="Save" @click="updatePushSettingsHandler" :disabled="!isSettingsChanged" class="ml-3"></Button>
      </div>
    </template>
  </CardWrapper>
</template>
