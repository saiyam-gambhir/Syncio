<script setup>
/* ----- Data ----- */
const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const {
  randomInteger
} = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <ConnectionsViewHeader />
    </template>

    <Column header="Platform" style="width: 5%" class="text-center">
      <template #body>
        <div class="flex align-items-center justify-content-center">
          <Skeleton width="31px" height="31px" />
        </div>
      </template>
    </Column>

    <Column header="Store" style="width: 37.5%">
      <template #body>
        <Skeleton height="21px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Status" style="width: 12.5%" v-if="isDestinationStore">
      <template #body>
        <Skeleton width="75px" height="29px" borderRadius="20px" />
      </template>
    </Column>

    <Column header="Location" style="width: 25%">
      <template #body>
        <Skeleton height="39px" />
      </template>
    </Column>

    <Column header="Actions" style="width: 20%" class="text-right">
      <template #body>
        <Skeleton width="148.82px" height="33px" style="float: right" borderRadius="6px" />
      </template>
    </Column>
  </DataTable>
</template>
