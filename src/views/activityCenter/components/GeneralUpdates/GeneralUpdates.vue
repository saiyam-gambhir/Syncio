<script setup>
import { useActivities } from '../../composables/activities'
import GeneralUpdatesSkeleton from './GeneralUpdatesSkeleton.vue'

/* ===== DATA ===== */
const { activityCenter } = useActivities()
</script>

<template>
  <GeneralUpdatesSkeleton v-if="activityCenter.loadingActivities" />

  <DataTable v-else :value="activityCenter.generalUpdates?.notifications" responsiveLayout="scroll" showGridlines>
    <Column header="Date(AEST)" style="width: 7.5%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm font-semibold">{{ data.date }}</span>
          <span class="text-xs mt-2">{{ data.time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Log" style="width: 25%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm">{{ data.title }} {{ data.subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Store" style="width: 25%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm">{{ data.data.store_name }}</span>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 30%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm">{{ data.details.line_1 }}</span>
          <span v-if="data.details.line_2" class="text-xs mt-1">{{ data.details.line_2 }}</span>
        </div>
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%;">
      <template #body="{ data }">
        <a v-if="data.link" :href="data.link" target="_blank" class="btn-link text-sm">How to fix this</a>
        <span v-else>-</span>
      </template>
    </Column>
  </DataTable>
</template>
