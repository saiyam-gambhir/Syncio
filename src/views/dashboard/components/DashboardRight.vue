<script setup>
import { useDashboardStore } from '@/stores/dashboard'
import Card from '@/views/dashboard/components/Card.vue'

const { $state } = useDashboardStore()
</script>

<template>
  <section class="col-12 md:col-7 lg:col-9">
    <Card v-if="$state.learn_the_basics" title="Learn the basics" class="mb-5">
      <template #links>
        <ul class="list-none p-0 mb-0 mt-4">
          <li class="py-3 border-bottom-1 border-top-1 surface-border">
            <a href="https://help.syncio.co/en/articles/6116999-quick-start" class="btn-link" target="_blank">Quick start guide</a>
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <a href="https://help.syncio.co/en/articles/5596700-connecting-to-a-store" class="btn-link" target="_blank">Connecting to a store</a>
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <a href="https://help.syncio.co/en/collections/1906212-syncing-products" class="btn-link" target="_blank">Syncing products</a>
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <a href="https://help.syncio.co/en/articles/3284137-best-practices-healthy-syncing" class="btn-link" target="_blank">Best practices and healthy syncing</a>
          </li>
        </ul>
      </template>
    </Card>

    <Card v-if="$state.helpful_articles" title="Helpful articles" class="mb-5">
      <template #links>
        <ul class="list-none p-0 mb-0 mt-4">
          <li class="py-3 border-bottom-1 border-top-1 surface-border">
            <a href="https://help.syncio.co/en/articles/4813676-syncio-overview" class="btn-link" target="_blank">Syncio overview</a>
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <a href="https://help.syncio.co/en/articles/3837270-common-use-cases" class="btn-link" target="_blank">Common use cases</a>
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <a href="https://help.syncio.co/en/articles/4641975-my-products-are-not-syncing" class="btn-link" target="_blank">My products aren't syncing</a>
          </li>
          <li class="py-3">
            <a href="https://help.syncio.co/en/articles/3330115-troubleshooting" class="btn-link" target="_blank">Other issues and how to fix them</a>
          </li>
          <li class="pt-3 text-center">
            <a href="https://help.syncio.co/en/" class="btn-link" target="_blank">More articles</a>
          </li>
        </ul>
      </template>
    </Card>

    <Card v-if="$state.add_ons" title="Add-ons">
      <template #links>
        <ul class="list-none p-0 mb-0 mt-4">
          <li class="py-3 border-bottom-1 border-top-1 surface-border">
            <a href="https://help.syncio.co/en/articles/4163480-orders-add-on" class="btn-link" target="_blank">Orders Add-on</a>
          </li>
          <li class="py-3">
            <a href="https://help.syncio.co/en/articles/3704617-product-settings-add-on" class="btn-link" target="_blank">Product Settings Add-on</a>
          </li>
          <li class="pt-3 text-center">
            <a href="https://help.syncio.co/en/collections/1906329-orders-product-settings-add-ons-shopify-only" class="btn-link" target="_blank">More about Add-ons</a>
          </li>
        </ul>
      </template>
    </Card>
  </section>
</template>
