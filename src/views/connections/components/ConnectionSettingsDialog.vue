<script setup>
/* ----- Data ----- */
const {
  clickedStore,
  isConnectionSettingsDialogRequested,
} = toRefs(useConnectionsStore());
</script>

<template>
  <Sidebar v-model:visible="isConnectionSettingsDialogRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        {{ clickedStore.store_name ?? clickedStore.store_domain }}
      </h1>
    </template>

    <section class="col-12 mt-4">
      <h2 class="flex align-items-center justify-content-between pb-2 text-900">
        Store performance
        <a href="https://us18.list-manage.com/survey?u=d3876b95496c25d2e8d7568bb&id=13fad7c875&attribution=false" target="_blank" class="btn-link">Tell us what data you want to see</a>
      </h2>
      <div class="grid">
        <div class="col-4">
          <CardWrapper title="Synced products" lightHeading class="h-100">
            <template #content>
              <h2 class="font-semi mt-4 mb-0">
                {{ clickedStore?.synced_products }}
              </h2>
              <p class="mb-0 text-500 text-sm pt-2">As of today</p>
            </template>
          </CardWrapper>
        </div>
        <div class="col-4">
          <CardWrapper title="Orders containing synced products" lightHeading class="h-100">
            <template #content>
              <h2 class="font-semi mt-4 mb-0">
                {{ clickedStore?.synced_orders }}
              </h2>
              <p class="mb-0 text-500 text-sm pt-2">Last 30 days</p>
            </template>
          </CardWrapper>
        </div>
        <div class="col-4">
          <CardWrapper title="Synced products sold" lightHeading class="h-100">
            <template #content>
              <h2 class="font-semi mt-4 mb-0">
                {{ clickedStore?.synced_products_sold }}
              </h2>
              <p class="mb-0 text-500 text-sm pt-2">Last 30 days</p>
            </template>
          </CardWrapper>
        </div>
      </div>
    </section>
  </Sidebar>
</template>
