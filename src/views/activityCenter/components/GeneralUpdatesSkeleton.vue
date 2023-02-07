<script setup>
import { useActivityCenterStore } from '@/stores/activityCenter'
import { useFilters } from '@/composables/filters'

/* ===== DATA ===== */
const activityCenter = useActivityCenterStore()
const { randomInteger } = useFilters()
</script>

<template>
  <DataTable :value="[{},{},{},{},{}]" responsiveLayout="scroll" showGridlines>
    <Column header="Date(AEST)" style="width: 7.5%;">
      <template #body>
        <Skeleton height="12.5px" width="40px" />
        <Skeleton height="12.5px" width="50px" class="mt-2" />
      </template>
    </Column>

    <Column header="Log" style="width: 25%;">
      <template #body>
        <Skeleton height="18px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Store" style="width: 25%;">
      <template #body>
        <Skeleton height="18px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Details" style="width: 30%;">
      <template #body>
        <Skeleton height="18px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%;">
      <template #body>
        <Skeleton height="18px" />
      </template>
    </Column>
  </DataTable>
</template>
