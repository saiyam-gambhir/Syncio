<script setup>
import { useConnectionsStore } from '@/stores/connections'
import Card from '@/views/dashboard/components/Card.vue'

/* ===== DATA ===== */
const connections = useConnectionsStore()
</script>

<template>
  <section class="col-12 md:col-5 lg:col-3">
    <Card
      description="Share this with Source stores so you can import products to your store."
      icon="key"
      title="Unique store key">
      <template #links>
        <h3 class="mb-0">{{ connections.storeKey }}</h3>
      </template>
    </Card>

    <Card
      class="mt-5"
      icon="user"
      title="Your account">
      <template #links>
        <div class="pt-3">
          <router-link to="/account-settings" class="btn-link">Account settings</router-link>
          <p class="text-sm mt-1 mb-0">Manage your account</p>
        </div>

        <div class="pt-3">
          <router-link to="/plan-and-billings" class="btn-link">Plan and billing</router-link>
          <p class="text-sm mt-1 mb-0">Manage your plan and billing details</p>
        </div>
      </template>
    </Card>

    <Card
      class="mt-5"
      icon="link"
      title="Other resources">
      <template #links>
        <div class="pt-3">
          <a href="#" class="btn-link">Help centre</a>
          <p class="text-sm mt-1 mb-0">Get answers and advice from Syncio</p>
        </div>

        <div class="pt-3">
          <a href="#" class="btn-link">Roadmap and feature requests</a>
          <p class="text-sm mt-1 mb-0">See improvements and request features</p>
        </div>

        <div class="pt-3">
          <a href="#" class="btn-link">Let us know what you think</a>
          <p class="text-sm mt-1 mb-0">Answer a short 3 minute survey to help us improve Syncio for you</p>
        </div>
      </template>
    </Card>
  </section>
</template>
