<script setup>
/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import Card from '@/views/dashboard/components/Card.vue'
</script>

<template>
  <section class="col-12 md:col-7 lg:col-9">
    <Card title="Learn the basics" class="mb-5">
      <template #links>
        <ul class="list-none p-0 mb-0 mt-4">
          <li class="py-3 border-bottom-1 border-top-1 surface-border">
            <AppLink link="https://help.syncio.co/en/articles/6116999-quick-start" label="Quick start guide" />
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <AppLink link="https://help.syncio.co/en/articles/5596700-connecting-to-a-store" label="Connecting to a store" />
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <AppLink link="https://help.syncio.co/en/collections/1906212-syncing-products" label="Syncing products" />
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <AppLink link="https://help.syncio.co/en/articles/3284137-best-practices-healthy-syncing" label="Best practices and healthy syncing" />
          </li>
          <li class="pt-3 text-center">
            <AppLink link="https://help.syncio.co/en/" label="More articles" />
          </li>
        </ul>
      </template>
    </Card>
  </section>
</template>
