<script setup>
const {
  stats
} = toRefs(useDashboardStore())

const {
  isShopify,
} = toRefs(useConnectionsStore());
</script>

<template>
  <section class="col-12 mt-2 mb-7">
    <h2 class="flex align-items-center justify-content-between pb-2">
      Performance
      <a href="https://us18.list-manage.com/survey?u=d3876b95496c25d2e8d7568bb&id=13fad7c875&attribution=false" target="_blank" class="btn-link">Tell us what data you want to see</a>
    </h2>
    <div class="grid">
      <div class="col-3">
        <CardWrapper title="Connected stores" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">{{ stats?.connected_stores }}</h2>
            <p class="mb-0 text-500 text-sm pt-2">As of today</p>
          </template>
        </CardWrapper>
      </div>
      <div class="col-3">
        <CardWrapper title="Synced products" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">
              {{ stats?.synced_products }}
            </h2>
            <p class="mb-0 text-500 text-sm pt-2">As of today</p>
          </template>
        </CardWrapper>
      </div>
      <div class="col-3" v-if="isShopify">
        <CardWrapper title="Orders containing synced products" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">
              {{ stats?.synced_orders }}
            </h2>
            <p class="mb-0 text-500 text-sm pt-2">Last 30 days</p>
          </template>
        </CardWrapper>
      </div>
      <div class="col-3" v-if="isShopify">
        <CardWrapper title="Synced products sold" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">
              {{ stats?.synced_products_sold }}
            </h2>
            <p class="mb-0 text-500 text-sm pt-2">Last 30 days</p>
          </template>
        </CardWrapper>
      </div>
    </div>
  </section>
</template>
