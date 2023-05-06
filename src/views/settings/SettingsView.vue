<script setup>
import { useAuthStore } from '@/stores/auth'
import PageHeader from '@/components/shared/PageHeader.vue'
import Setting from './components/Setting.vue'

/* ----- DATA ----- */
const auth = useAuthStore()
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
          description="Find specific information about your account with Syncio, including how to store type, your Syncio key and how to uninstall Syncio"
          href="/account-details"
          icon="pi-user"
          title="Account details">
        </Setting>

        <Setting
          description="Manage and upgrade your base plan and add ons"
          href="/plan-and-billings"
          icon="pi-file"
          title="Plan and billing">
        </Setting>

        <Setting
          description="Manage what attributes sync across your connected stores"
          :disabled="!auth.isProductModuleAvailable"
          href="/product-settings"
          icon="pi-list"
          title="Products">
        </Setting>

        <Setting
          description="Set commissions at store, vendor or product/SKU level"
          :disabled="!auth.isOrderModuleAvailable"
          href="/payouts-settings"
          icon="pi-dollar"
          title="Payouts">
        </Setting>

        <Setting
          description="Choose how you'd like to receive communications and customise what type of alerts we send you"
          href="/notifications"
          icon="pi-bell"
          title="Notifications">
        </Setting>
      </div>
    </div>
  </section>
</template>
