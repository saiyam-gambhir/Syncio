<script setup>
</script>

<template>
  <section class="mx-auto" style="width: 900px;">
    <PageDetails title="Select store type" content="" />

    <aside class="auth-wrapper text-900">
      <div class="grid">
        <div class="col-6 py-0">
          <CardWrapper class="font-semibold">
            <template #content>
              <div class="flex align-items-end justify-content-center" style="height: 80px;">
                <img src="@/assets/images/source-store.png" alt="Source store" style="width: 160px;" />
              </div>
              <h2 class="text-3xl text-center m-0 pt-4">Source Store</h2>
              <Divider />
              <p class="m-0 mt-2">This store is source of truth for all original inventory and product information.</p>
              <p class="m-0 mt-3">This account fulfills and ships orders from connected stores.</p>
              <p class="m-0 mt-3">Examples:</p>
              <ul class="m-0 mt-2 pl-3">
                <li>The primary online store</li>
                <li class="mt-1">Store connected to the source warehouses</li>
                <li class="mt-1">Supplies stock to other retailers</li>
                <li class="mt-1">A brand store</li>
              </ul>
              <Divider />
              <Button label="Select store type" class="p-button-lg w-100 mt-2"></Button>
            </template>
          </CardWrapper>
        </div>
        <div class="col-6 py-0">
          <CardWrapper class="font-semibold">
            <template #content>
              <div class="store-image flex align-items-end justify-content-center" style="height: 80px;">
                <img src="@/assets/images/destination-store.png" alt="Destination store" style="width: 160px;" />
              </div>
              <h2 class="text-3xl text-center m-0 pt-4">Destination Store</h2>
              <Divider />
              <p class="m-0 mt-2">This store syncs inventory and product information from a source store.</p>
              <p class="m-0 mt-3">This store creates orders containing synced products for other stores to fulfill.</p>
              <p class="m-0 mt-3">Examples:</p>
              <ul class="m-0 mt-2 pl-3">
                <li>Expansion store (different region)</li>
                <li class="mt-1">Third party retailer</li>
                <li class="mt-1">Dropshipping store</li>
                <li class="mt-1">Extra sales channel to the source</li>
              </ul>
              <Divider />
              <Button label="Select store type" class="p-button-lg w-100 mt-2"></Button>
            </template>
          </CardWrapper>
        </div>
      </div>
    </aside>
  </section>
</template>
