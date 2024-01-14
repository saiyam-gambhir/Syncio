<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  isDestinationStore,
  isShopify,
  isWoocommerce,
} = toRefs(useConnectionsStore());
</script>

<template>
  <PageHeader
    content="Manage your settings to make Syncio work better for you"
    title="Settings">
  </PageHeader>

  <section class="settings">
    <div class="surface-white">
      <div class="grid">
        <Setting
          :href="routes.ACCOUNT_SETTINGS"
          description="Find specific information about your account with Syncio, including your store type, Syncio connection key and how to uninstall Syncio"
          icon="pi-user"
          title="Account details">
        </Setting>

        <Setting
          :href="routes.PLAN_AND_BILLINGS"
          :isWoo="isWoocommerce"
          description="Manage and upgrade your base plan and add-ons"
          icon="pi-credit-card"
          title="Plan and billing"
          v-if="isDestinationStore">
        </Setting>

        <Setting
          :href="routes.PRODUCT_SETTINGS"
          description="Manage what attributes sync across your connected stores"
          icon="pi-wrench"
          title="Product settings"
          v-if="isShopify">
        </Setting>

        <Setting
          :href="routes.PAYOUTS_SETTINGS"
          description="Set commissions at store, vendor or product/SKU level"
          icon="pi-dollar"
          title="Payouts settings"
          v-if="isDestinationStore && isShopify">
        </Setting>

        <Setting
          :href="routes.MARKETPLACE_SETTINGS"
          description="Manage your Marketplace profile and settings"
          icon="pi-shopping-bag"
          title="Marketplace settings">
        </Setting>

        <Setting
          :href="routes.ORDER_PUSH_SETTINGS"
          description="Manage order push settings like email, shipping rate and shipping tags."
          icon="pi-file"
          title="Order push settings"
          v-if="isDestinationStore && isShopify">
        </Setting>

        <Setting
          :href="routes.NOTIFICATION_SETTINGS"
          description="Choose how you'd like to receive communications and customise what type of alerts we send you"
          icon="pi-bell"
          title="Notifications">
        </Setting>
      </div>
    </div>
  </section>
</template>
