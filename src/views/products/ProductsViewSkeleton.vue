<script setup>
/* ----- Data ----- */
const {
  randomInteger,
} = useFilters();

const {
  isDestinationStore,
} = toRefs(useConnectionsStore());
</script>

<template>
  <article class="mt-2">
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
          <div class="flex">
            <figure class="m-0">
              <Skeleton height="42px" width="42px" />
            </figure>
            <div class="flex align-items-center ml-3 w-100">
              <Skeleton height="15.5px" :width="`${randomInteger(25, 60)}%`" />
            </div>
          </div>
        </template>
      </Column>

      <Column header="Inventory" style="width: 15.5%;">
        <template #body>
          <Skeleton height="15.5px" width="50%" />
        </template>
      </Column>

      <Column header="Status" style="width: 12.5%">
        <template #body>
          <Skeleton height="29.04px" width="101px" borderRadius="20px" />
        </template>
      </Column>

      <Column header="Sales channel visibility" style="width: 16%">
        <template #body>
          <Skeleton height="15.5px" width="60%" />
        </template>
      </Column>

      <Column header="Actions" style="width: 16%" class="text-right" v-if="isDestinationStore">
        <template #body>
          <Skeleton height="33.06px" width="100px" style="float: right" borderRadius="6px" />
        </template>
      </Column>
    </DataTable>
  </article>
</template>
