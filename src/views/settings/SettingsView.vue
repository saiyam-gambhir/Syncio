<script setup>
import { toRefs } from 'vue';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
import Setting from './components/Setting.vue';

/* ----- Data ----- */
const { isDestinationStore } = toRefs(useConnectionsStore());
</script>

<template>
  <PageHeader
    content="Manage your settings to make Syncio work better for you"
    title="Settings">
  </PageHeader>

  <section class="settings mt-4">
    <div class="surface-white">
      <div class="grid">
        <Setting
          description="Find specific information about your account with Syncio, including your store type, Syncio connection key and how to uninstall Syncio"
          href="/settings/account-settings"
          icon="pi-user"
          title="Account details">
        </Setting>

        <Setting
          v-if="isDestinationStore"
          description="Manage and upgrade your base plan and add ons"
          href="/settings/plan-and-billings"
          icon="pi-file"
          title="Plan and billing">
        </Setting>

        <Setting
          description="Manage what attributes sync across your connected stores"
          href="/settings/product-settings"
          icon="pi-list"
          title="Product settings">
        </Setting>

        <Setting
          v-if="isDestinationStore"
          description="Set commissions at store, vendor or product/SKU level"
          href="/settings/payouts-settings"
          icon="pi-dollar"
          title="Payouts settings">
        </Setting>

        <Setting
          description="Manage your Marketplace profile and settings"
          href="/settings/marketplace-settings"
          icon="pi-shopping-bag"
          title="Marketplace settings">
        </Setting>

        <Setting
          description="Choose how you'd like to receive communications and customise what type of alerts we send you"
          href="/settings/notification-settings"
          icon="pi-bell"
          title="Notifications">
        </Setting>
      </div>
    </div>
  </section>
</template>
