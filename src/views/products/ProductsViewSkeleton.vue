<script setup>
/* ----- Data ----- */
const {
  loading,
} = toRefs(useProductsStore());
</script>

<template>
  <article class="mt-4">
    <DataTable
      :value="[{}, {}, {}, {}]"
      responsiveLayout="scroll"
      showGridlines>

      <template #header>
        <ProductsViewHeader />
      </template>

      <Column
        headerStyle="width: 4%"
        selectionMode="multiple">
      </Column>

      <Column header="Product" style="width: 36%">
        <template #body>
          <div class="flex align-items-center pointer btn-link-parent" @click="fetchProductDetails({ externalProductId: external_product_id, targetStoreId: store_id }, true)">
            <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
              <div class="w-full h-full" style="background-size: contain; background-repeat: no-repeat; background-position: center;" :style="{ backgroundImage: `url(${default_image_url})` }"></div>
            </figure>
            <div class="flex flex-column ml-3 pointer btn-link text-blue-500">
              {{ title }}
            </div>
          </div>
        </template>
      </Column>

      <Column header="Inventory" style="width: 15.5%;">
        <template #body>
        </template>
      </Column>

      <Column header="Status" style="width: 12.5%">
        <template #body="{ data }">
          <Tag :severity="statusOptions[getProductSyncStatus(data)]" rounded>
            <i v-if="getProductSyncStatus(data) === 'pending'" class="pi pi-spin pi-sync"></i>
            <span :class="{ 'ml-2': getProductSyncStatus(data) === 'pending' }" style="transition: margin .25s;">
              {{ getProductSyncStatus(data).replace('_', ' ') }}
            </span>
          </Tag>
        </template>
      </Column>

      <Column header="Sales channel visibility" style="width: 16%">
        <template #body="{ data: { published_at } }">
          <span v-if="published_at">Online store</span>
          <span v-else>Unavailable</span>
        </template>
      </Column>

      <Column header="Actions" style="width: 16%" class="text-right">
        <template #body="{ data }" v-if="isDestinationStore">
          <div v-if="data.mapper_id">
            <span v-if="syncedProducts.length > 0 || unsyncedProducts.length > 0" v-tooltip.top="'Clear bulk selection to access this button.'" class="inline-block">
              <SplitButton
                disabled
                class="p-button-sm"
                label="View sync"
                outlined>
              </SplitButton>
            </span>
            <SplitButton
              v-else
              @click="fetchProductDetails({ externalProductId: data.external_product_id, targetStoreId: data.store_id }, false)"
              class="p-button-sm"
              label="View sync"
              :model="[
                  { label: 'Resync', command: () => resyncProductHandler(data) },
                  { label: 'Unsync', command: () => unsyncProductHandler(data) }
              ]"
              outlined>
            </SplitButton>

          </div>
          <div v-else>
            <span v-if="syncedProducts.length > 0 || unsyncedProducts.length > 0" v-tooltip.top="'Clear bulk selection to access this button.'" class="inline-block">
              <SplitButton
                disabled
                class="p-button-sm"
                label="Sync"
                outlined>
              </SplitButton>
            </span>
            <SplitButton
              v-else
              @click="syncProductHandler(data)"
              class="p-button-sm"
              label="Sync"
              :model="[
                { label: 'Map', command: () => {} }
              ]"
              outlined>
            </SplitButton>
          </div>
        </template>
      </Column>
    </DataTable>
  </article>

  <!----- Bulk Mapper ----->
  <BulkMapperDialog v-if="isBulkMapperDialogRequested" />

  <!----- Product Details ----->
  <ProductDetailsDialog v-if="isProductDetailsDialogRequested" />
</template>

<style scoped>
.product-action {
  width: 70px;
}

.bulk-mapper-btn {
  height: 39.5px;
}
</style>
