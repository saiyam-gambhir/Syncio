<script setup>
const {
  currentStore,
  fetchCurrentStore,
  loadingEmail,
  updateEmail,
} = toRefs(useConnectionsStore());

const currentStoreEmail = ref('');

/* ----- Computed ----- */
const isEmailUnchanged = computed(() => {
  return currentStore.value.email === currentStoreEmail.value || currentStoreEmail.value === ''
});

/* ----- Mounted ----- */
onMounted(async () => {
  currentStoreEmail.value = currentStore.value.email
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

  <article class="grid mt-2">
    <div class="col col-6">
      <h4 class="font-medium text-3xl mb-3">Preferred contact method</h4>
      <h5 class="font-medium text-xl m-t-4 mb-0">Email</h5>
      <p class="text-gray-500">
        The email address where you'd like to receive emails and system alerts
      </p>
    </div>
    <div class="col col-6">
      <div class="row mt-8 pt-4">
        <div>
          <InputText class="mr-5 w-6" size="large" type="email" v-model="currentStoreEmail" />
          <Button 
          :disabled="isEmailUnchanged" 
          :loading="loadingEmail" 
          label="Update email"
          size="large" 
          @click="updateEmailHandler">
        </Button>
        </div>
      </div>
    </div>
  </article>
</template>
