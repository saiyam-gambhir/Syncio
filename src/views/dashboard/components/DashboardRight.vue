<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import Card from '@/views/dashboard/components/Card.vue'
import DashboardRightSkeleton from '@/views/dashboard/components/DashboardRightSkeleton.vue'
import IconDashboardEmpty from '@/icons/IconDashboardEmpty.vue'

/* ===== DATA ===== */
const { $state } = useDashboardStore()

/* ===== COMPUTED ===== */
const isDashboardEmpty = computed(() => {
  const { loading, learn_the_basics, helpful_articles, add_ons } = $state
  return !loading && (!learn_the_basics && !helpful_articles && !add_ons)
})
</script>

<template>
  <section class="col-12 md:col-7 lg:col-9">

    <div v-if="isDashboardEmpty" class="text-center">
      <IconDashboardEmpty />
      <h2 class="mt-5">No content selected</h2>
      <p>Customise your Homepage to add <br> content to this section</p>
    </div>

    <DashboardRightSkeleton v-if="$state.loading" />
    <template v-else>
      <Card v-if="$state.learn_the_basics" title="Learn the basics" class="mb-5">
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
          </ul>
        </template>
      </Card>

      <Card v-if="$state.helpful_articles" title="Helpful articles" class="mb-5">
        <template #links>
          <ul class="list-none p-0 mb-0 mt-4">
            <li class="py-3 border-bottom-1 border-top-1 surface-border">
              <AppLink link="https://help.syncio.co/en/articles/4813676-syncio-overview" label="Syncio overview" />
            </li>
            <li class="py-3 border-bottom-1 surface-border">
              <AppLink link="https://help.syncio.co/en/articles/3837270-common-use-cases" label="Common use cases" />
            </li>
            <li class="py-3 border-bottom-1 surface-border">
              <AppLink link="https://help.syncio.co/en/articles/4641975-my-products-are-not-syncing" label="My products aren't syncing" />
            </li>
            <li class="py-3">
              <AppLink link="https://help.syncio.co/en/articles/3330115-troubleshooting" label="Other issues and how to fix them" />
            </li>
            <li class="pt-3 text-center">
              <AppLink link="https://help.syncio.co/en/" label="More articles" />
            </li>
          </ul>
        </template>
      </Card>

      <Card v-if="$state.add_ons" title="Add-ons">
        <template #links>
          <ul class="list-none p-0 mb-0 mt-4">
            <li class="py-3 border-bottom-1 border-top-1 surface-border">
              <AppLink link="https://help.syncio.co/en/articles/4163480-orders-add-on" label="Orders Add-on" />
            </li>
            <li class="py-3">
              <AppLink link="https://help.syncio.co/en/articles/3704617-product-settings-add-on" label="Product Settings Add-on" />
            </li>
            <li class="pt-3 text-center">
              <AppLink link="https://help.syncio.co/en/collections/1906329-orders-product-settings-add-ons-shopify-only" label="More about Add-ons" />
            </li>
          </ul>
        </template>
      </Card>
    </template>
  </section>
</template>
