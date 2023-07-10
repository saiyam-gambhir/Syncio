<script setup>
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';
import { useToasts } from '@/composables/toasts';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';

/* ----- Data ----- */
const { copyToClipBoard } = useFilters();
const { showToast } = useToasts();
const { storeKey } = useConnectionsStore();

const copyStoreKeyHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store key copied successfully' });
};
</script>

<template>
  <section class="col-12 md:col-5 lg:col-3">
    <h2 class="pb-2">The essentials</h2>

    <CardWrapper class="pb-3" description="Share this with Source stores so you can import products to your store."
      icon="key" title="Unique store key">
      <template #links>
        <h3 class="mb-0 flex align-items-center">
          {{ storeKey }}
          <Button
            @click="copyStoreKeyHandler(storeKey)"
            class="p-button-rounded p-button-text ml-2"
            icon="pi pi-copy">
          </Button>
        </h3>
      </template>
    </CardWrapper>

    <CardWrapper class="mt-5" icon="user" title="Your account">
      <template #links>
        <div class="pt-3">
          <router-link to="/settings" class="btn-link">Account settings</router-link>
          <p class="text-sm mt-1 mb-0">Manage account and notification settings</p>
        </div>

        <div class="pt-3">
          <router-link to="/settings/plan-and-billings" class="btn-link">Plan and billing</router-link>
          <p class="text-sm mt-1 mb-0">Manage your plan and billing details</p>
        </div>
      </template>
    </CardWrapper>

    <CardWrapper class="mt-5" icon="volume-up" title="Have your say">
      <template #links>
        <div class="pt-3">
          <AppLink link="https://syncio.canny.io/" label="Feature requests" />
          <p class="text-sm mt-1 mb-0">Got an idea? Submit here</p>
        </div>

        <div class="pt-3">
          <AppLink
            link="https://docs.google.com/forms/d/e/1FAIpQLSego6l-ceEo02LZyAfGH78U_C8hzN7mNTWCr4u4yzS4AlB07Q/viewform"
            label="Let us know what you think" />
          <p class="text-sm mt-1 mb-0">Answer a short 3 minute survey to help us improve Syncio for you</p>
        </div>
      </template>
    </CardWrapper>
  </section>
</template>
