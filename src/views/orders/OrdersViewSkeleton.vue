<script setup>
import { useFilters } from '@/composables/filters';
import { useOrdersStore } from '@/stores/orders';

/* ----- Data ----- */
const { filters, loadingOrders, sortOptions } = toRefs(useOrdersStore());
const { randomInteger } = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines class="mt-4">
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <SearchFilter
            placeholder="Search by exact order number (eg: #1234)"
            v-model="filters.searchString">
          </SearchFilter>
        </div>

        <Dropdown
          :loading="loadingOrders"
          :options="sortOptions"
          optionLabel="label"
          optionValue="sortBy"
          placeholder="Sort by"
          v-model="filters.sortBy">
          <template #value>Sort by</template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon" class="ml-2"></i>
            </div>
          </template>
        </Dropdown>
      </div>
    </template>

    <Column header="" style="width: 3rem; min-width: 42.5px">
      <template #body>
        <CheckboxWrapper :isChecked="false" />
      </template>
    </Column>

    <Column header="Order #" style="width: 10%">
      <template #body>
        <Skeleton height="14px" width="75px" />
      </template>
    </Column>

    <Column header="Date" style="width: 20%">
      <template #body>
        <Skeleton height="14px" width="75px" />
        <Skeleton height="14px" width="50px" class="mt-2" />
      </template>
    </Column>

    <Column header="Customer" style="width: 30%">
      <template #body>
        <Skeleton height="14px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Push Status" style="width: 15%">
      <template #body>
        <Skeleton width="68px" height="27px" borderRadius="20px" />
      </template>
    </Column>

    <Column header="Synced Items" style="width: 10%" class="text-center">
      <template #body>
        <Skeleton height="27px" width="31.75px" class="mx-auto" />
      </template>
    </Column>

    <Column header="Actions" style="width: 15%" class="text-right">
      <template #body>
        <Skeleton height="30.5px" width="96px" style="float: right" />
      </template>
    </Column>
  </DataTable>
</template>
