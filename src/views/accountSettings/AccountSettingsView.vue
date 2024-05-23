<script setup>
/* ----- Components ----- */
const DeactivateDialog = defineAsyncComponent(() => import('./components/DeactivateDialog.vue'));
const UninstallDialog = defineAsyncComponent(() => import('./components/UninstallDialog.vue'));
const UpdateAPIKeyDialog = defineAsyncComponent(() => import('./components/UpdateAPIKeyDialog.vue'));

/* ----- Data ----- */
const {
  copyToClipBoard,
  formatDate,
} = useFilters();

const {
  showToast
} = useToasts();

const {
  customStoreName,
  isDeactivateStoreDialogVisible,
  isDefaultStore,
  isShopify,
  isShopline,
  isUniversalStore,
  isWoocommerce,
  loadingDefaultStoreUpdate,
  loadingUninstall,
  platform,
  storeCreationDate,
  storeKey,
  storeName,
  storeType,
  UPDATE_DEFAULT_STORE,
} = toRefs(useConnectionsStore());

const {
  isUpdateAPIKeyDialogVisible,
  isUninstallDialogVisible,
} = toRefs(useConnectionsStore());

// const {
//   currency,
//   currencies,
//   timeZone,
//   timeZones,
// }  = toRefs(useAuthStore());

/* ----- Methods ----- */
const copyStoreKeyHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store key copied successfully' });
};

// const handleTimeZoneChange = (event) => {
//   timeZone.value = event.value;
// };

// const handleCurrencyChange = (event) => {
//   currency.value = event.value;
// };

const handleUpdateAPIKey = async () => {
  isUpdateAPIKeyDialogVisible.value = true;
};

const handleUninstall = async () => {
  isUninstallDialogVisible.value = true;
};

const deleteStoreHandler = () => {
  isDeactivateStoreDialogVisible.value = true;
};
</script>

<template>
  <PageHeader
    content="Find specific information about your account with Syncio, including your store type, Syncio connection key and how to uninstall Syncio"
    title="Account Details">
  </PageHeader>

  <article class="grid mt-2">
    <section class="col-12 md:col-5 lg:col-3">
      <h2 class="pb-2">The essentials</h2>
      <CardWrapper class="pb-3" description="Share this with Source stores so you can import products to your store."
        icon="key" title="Unique store key">
        <template #content>
          <h3 class="mb-0 flex align-items-center">
            {{ storeKey }}
            <Button @click="copyStoreKeyHandler(storeKey)" class="ml-2" rounded text icon="pi pi-copy">
            </Button>
          </h3>
        </template>
      </CardWrapper>

      <!-- <CardWrapper
        class="pb-3 mt-5"
        description=""
        icon=""
        title="">
        <template #content>
          <h3>Timezone</h3>
          <Dropdown
            @change="handleTimeZoneChange"
            class="w-100"
            :autoOptionFocus="false"
            :options="timeZones"
            placeholder="Select timezone"
            v-model="timeZone">
          </Dropdown>

          <h3 class="mt-5">Currency</h3>
          <Dropdown
            @change="handleCurrencyChange"
            class="w-100 mb-2"
            :autoOptionFocus="false"
            :options="currencies"
            placeholder="Select currency"
            v-model="currency">
          </Dropdown>
        </template>
      </CardWrapper> -->
    </section>

    <section class="col-12 md:col-7 lg:col-9">
      <h2 class="pb-2">My Store Details</h2>

      <CardWrapper class="pb-3">
        <template #content>
          <ul class="list-none p-0 mb-0 mt-0">
            <li class="pb-4 pt-0 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between mb-1">
                Platform:
                <Tag severity="info" class="capitalize ml-3">{{ platform }}</Tag>
              </h3>
            </li>
            <li class="py-4 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Store type:
                <div>
                  <template v-if="isUniversalStore">
                    <span v-if="isDefaultStore" class="font-normal text-light mr-2">Default for login</span>
                    <Button
                      :loading="loadingDefaultStoreUpdate"
                      @click="UPDATE_DEFAULT_STORE"
                      class="mr-2"
                      label="Make Default"
                      outlined
                      style="height: 35.54px;"
                      v-else>
                    </Button>
                  </template>
                  <Tag severity="info" class="ml-3"><span class="capitalize">{{ storeType }}</span> &nbsp;store</Tag>
                </div>
              </h3>
            </li>
            <li v-if="customStoreName" class="py-4 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Store name:
                <Tag severity="info" class="ml-3">{{ customStoreName }}</Tag>
              </h3>
            </li>
            <li class="py-4 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Store URL:
                <Tag severity="info" class="ml-3">{{ storeName }}</Tag>
              </h3>
            </li>
            <li class="py-4 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Joining date:
                <Tag severity="info" class="ml-3">{{ formatDate(storeCreationDate).date }} at {{ formatDate(storeCreationDate).time }}</Tag>
              </h3>
            </li>
            <li v-if="isWoocommerce" class="py-4 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                API key:
                <Button @click="handleUpdateAPIKey" label="Update" style="width: 7.5rem;"></Button>
              </h3>
            </li>
            <li class="py-4 surface-border" :class="{ 'border-bottom-1' : isUniversalStore }">
              <h3 class="flex align-items-center justify-content-between mt-1 mb-0">
                Uninstall syncio:
                <Tag v-if="isShopify" severity="danger" class="ml-3 transform-none">* For Shopify, please use Shopify admin page to uninstall Syncio</Tag>
                <Tag v-if="isShopline" severity="danger" class="ml-3 transform-none">* For Shopline, please use Shopline admin page to uninstall Syncio</Tag>
                <Button
                  :loading="loadingUninstall"
                  @click="handleUninstall"
                  label="Uninstall"
                  severity="danger"
                  style="width: 7.5rem;"
                  v-if="isWoocommerce">
                </Button>
              </h3>
            </li>
            <li v-if="isUniversalStore" class="pt-4 pb-2 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                <div>
                  Deactivate <span class="capitalize">{{ storeType }}</span> store:
                  <p class="mt-2 mb-0 text-small font-normal" style="line-height: 1.35rem; margin-left: 0 !important;">
                    Deactivating will remove this store type. <br> Use Uninstall to remove all stores.
                  </p>
                </div>

                <Button
                  @click="deleteStoreHandler"
                  label="Deactivate store"
                  severity="danger">
                </Button>
              </h3>
            </li>
          </ul>
        </template>
      </CardWrapper>
    </section>
  </article>

  <!-- Deactivate Store -->
  <DeactivateDialog v-if="isDeactivateStoreDialogVisible" />

  <!-- Woo Update API Key  -->
  <UpdateAPIKeyDialog v-if="isUpdateAPIKeyDialogVisible" />

  <!-- Woo Uninstall  -->
  <UninstallDialog v-if="isUninstallDialogVisible" />
</template>

<style scoped>
.capitalize {
  text-transform: capitalize !important;
}

.transform-none {
  text-transform: none !important;
}

h3 span {
  font-size: 1.25rem !important;
}
</style>
