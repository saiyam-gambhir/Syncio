<script setup>
import { useFilters } from '@/composables/filters';

/* ----- Data ----- */
const {
  randomInteger
} = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>

    <template #header>
      <ProductCommissionHeader />
    </template>

    <Column header="" style="width: 3%">
      <template #body>
        <CheckboxWrapper />
      </template>
    </Column>

    <Column header="Product" style="width: 15%">
      <template #body>
        <div class="flex align-items-center">
          <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
            <Skeleton width="100%" height="100%" />
          </figure>
          <div class="flex flex-column ml-3">
            <Skeleton width="125px" height="16px" />
          </div>
        </div>
      </template>
    </Column>

    <Column header="Store URL" style="width: 15%">
      <template #body>
        <Skeleton height="26px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Commission type" style="width: 15%">
      <template #body>
        <Skeleton height="39px" width="90%" />
      </template>
    </Column>

    <Column style="width: 12.5%">
      <template #header>
        Rate <i class="pi pi-question-circle ml-3 text-xl" v-tooltip.right="'Select commission type to add rate'"></i>
      </template>
      <template #body>
        <Skeleton height="39px" />
      </template>
    </Column>

    <Column header="Actions" style="width: 15%" class="text-right">
      <template #body>
        <Skeleton width="130px" height="32.5px" borderRadius="8px" style="float: right" />
      </template>
    </Column>
  </DataTable>
</template>
