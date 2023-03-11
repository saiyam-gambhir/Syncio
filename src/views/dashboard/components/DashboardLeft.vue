<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useFilters } from '@/composables/filters'
import { useToasts } from '@/composables/toasts'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import Card from '@/views/dashboard/components/Card.vue'

/* ===== DATA ===== */
const { copyToClipBoard } = useFilters()
const { showToast } = useToasts()
const connections = useConnectionsStore()

const copyStoreKeyHandler = async (val) => {
  await copyToClipBoard(val)
  showToast({
    detail: 'Store key copied successfully.'
  })
}
</script>

<template>
  <section class="col-12 md:col-5 lg:col-3">
    <Card
      class="pb-3"
      description="Share this with Source stores so you can import products to your store."
      icon="key"
      title="Unique store key">
      <template #links>
        <h3 class="mb-0 flex align-items-center">
          {{ connections.storeKey }}
          <Button icon="pi pi-copy" class="p-button-rounded p-button-text ml-2" @click="copyStoreKeyHandler(connections.storeKey)" />
        </h3>
      </template>
    </Card>

    <Card
      class="mt-5"
      icon="user"
      title="Your account">
      <template #links>
        <div class="pt-3">
          <router-link to="/account-settings" class="btn-link">Account settings</router-link>
          <p class="text-sm mt-1 mb-0">Manage account and notification settings</p>
        </div>

        <div class="pt-3">
          <router-link to="/plan-and-billings" class="btn-link">Plan and billing</router-link>
          <p class="text-sm mt-1 mb-0">Manage your plan and billing details</p>
        </div>
      </template>
    </Card>

    <Card
      class="mt-5"
      icon="volume-up"
      title="Have your say">
      <template #links>
        <div class="pt-3">
          <AppLink link="https://syncio.canny.io/" label="Feature requests" />
          <p class="text-sm mt-1 mb-0">Got an idea? Submit here</p>
        </div>

        <div class="pt-3">
          <AppLink link="https://docs.google.com/forms/d/e/1FAIpQLSego6l-ceEo02LZyAfGH78U_C8hzN7mNTWCr4u4yzS4AlB07Q/viewform" label="Let us know what you think" />
          <p class="text-sm mt-1 mb-0">Answer a short 3 minute survey to help us improve Syncio for you</p>
        </div>
      </template>
    </Card>
  </section>
</template>
