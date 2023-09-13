<script setup>
import { useConnectionsStore } from 'connections';
import * as routes from '@/routes';

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
          :href="routes.ACCOUNT_SETTINGS"
          icon="pi-user"
          title="Account details">
        </Setting>

        <Setting
          v-if="isDestinationStore"
          description="Manage and upgrade your base plan and add-ons"
          :href="routes.PLAN_AND_BILLINGS"
          icon="pi-credit-card"
          title="Plan and billing">
        </Setting>

        <Setting
          description="Manage what attributes sync across your connected stores"
          :href="routes.PRODUCT_SETTINGS"
          icon="pi-wrench"
          title="Product settings">
        </Setting>

        <Setting
          v-if="isDestinationStore"
          description="Set commissions at store, vendor or product/SKU level"
          :href="routes.PAYOUTS_SETTINGS"
          icon="pi-dollar"
          title="Payouts settings">
        </Setting>

        <Setting
          description="Manage your Marketplace profile and settings"
          :href="routes.MARKETPLACE_SETTINGS"
          icon="pi-shopping-bag"
          title="Marketplace settings">
        </Setting>

        <Setting
          description="Manage order push settings like email, shipping rate and shipping tags."
          :href="routes.PUSH_SETTINGS"
          icon="pi-file"
          title="Order push settings">
        </Setting>

        <Setting
          description="Choose how you'd like to receive communications and customise what type of alerts we send you"
          :href="routes.NOTIFICATION_SETTINGS"
          icon="pi-bell"
          title="Notifications">
        </Setting>
      </div>
    </div>
  </section>
</template>
