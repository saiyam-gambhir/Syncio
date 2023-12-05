<script setup>
/* ----- Data ----- */
const {
  copyToClipBoard,
  formatDate,
} = useFilters();

const {
  showToast
} = useToasts();

const {
  platform,
  storeCreationDate,
  storeKey,
  storeName,
  storeType,
} = useConnectionsStore();

const {
  currency,
  currencies,
  timeZone,
  timeZones,
}  = toRefs(useAuthStore());

/* ----- Methods ----- */
const copyStoreKeyHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store key copied successfully' });
};

const handleTimeZoneChange = (event) => {
  timeZone.value = event.value;
};

const handleCurrencyChange = (event) => {
  currency.value = event.value;
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
      <CardWrapper
        class="pb-3"
        description="Share this with Source stores so you can import products to your store."
        icon="key"
        title="Unique store key">
        <template #content>
          <h3 class="mb-0 flex align-items-center">
            {{ storeKey }}
            <Button
              @click="copyStoreKeyHandler(storeKey)"
              class="ml-2"
              rounded
              text
              icon="pi pi-copy">
            </Button>
          </h3>
        </template>
      </CardWrapper>

      <CardWrapper
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
      </CardWrapper>
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
                Store Type:
                <Tag severity="info" class="capitalize ml-3">{{ storeType }} store</Tag>
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
                Joining Date:
                <Tag severity="info" class="ml-3">{{ formatDate(storeCreationDate).date }} at {{ formatDate(storeCreationDate).time }}</Tag>
              </h3>
            </li>
            <li class="pt-4 pb-2 surface-border">
              <h3 class="flex align-items-center justify-content-between mt-1 mb-0">
                Uninstall Syncio:
                <Tag severity="danger" class="ml-3 transform-none">* For Shopify, please use Shopify admin page to uninstall Syncio</Tag>
              </h3>
            </li>
          </ul>
        </template>
      </CardWrapper>
    </section>
  </article>
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
