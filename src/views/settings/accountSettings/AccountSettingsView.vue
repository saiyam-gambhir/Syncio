<script setup>
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';
import { useToasts } from '@/composables/toasts';

/* ----- Components ----- */
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
const { copyToClipBoard, formatDate } = useFilters();
const { showToast } = useToasts();
const { platform, storeCreationDate, storeKey, storeName, storeType } = useConnectionsStore();

/* ----- Methods ----- */
const copyStoreKeyHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store key copied successfully' });
};
</script>

<template>
  <PageHeader
    content="Find specific information about your account with Syncio, including your store type, Syncio connection key and how to uninstall Syncio"
    title="Account Details">
  </PageHeader>

  <article class="grid mt-4">
    <section class="col-12 md:col-5 lg:col-3">
      <h2 class="pb-2">The essentials</h2>
      <CardWrapper
        class="pb-3"
        description="Share this with Source stores so you can import products to your store."
        icon="key"
        title="Unique store key">
        <template #links>
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
    </section>

    <section class="col-12 md:col-7 lg:col-9">
      <h2 class="pb-2">My Store Details</h2>

      <CardWrapper class="pb-3">
        <template #links>
          <ul class="list-none p-0 mb-0 mt-0">
            <li class="pb-3 pt-0 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between mb-1">
                Platform:
                <Tag severity="info" class="capitalize ml-3">{{ platform }}</Tag>
              </h3>
            </li>
            <li class="py-3 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Store Type:
                <Tag severity="info" class="capitalize ml-3">{{ storeType }} store</Tag>
              </h3>
            </li>
            <li class="py-3 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Store Name:
                <Tag severity="info" class="ml-3">{{ storeName }}</Tag>
              </h3>
            </li>
            <li class="py-3 border-bottom-1 surface-border">
              <h3 class="flex align-items-center justify-content-between my-1">
                Joining Date:
                <Tag severity="info" class="ml-3">{{ formatDate(storeCreationDate).date }} at {{ formatDate(storeCreationDate).time }}</Tag>
              </h3>
            </li>
            <li class="pt-3 pb-1 surface-border">
              <h3 class="flex align-items-center justify-content-between mt-1 mb-0">
                Uninstall Syncio:
                <Tag severity="danger" class="ml-3 transform-none">* For Shopify, please use Shopify admin page to uninstall Syncio.</Tag>
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
