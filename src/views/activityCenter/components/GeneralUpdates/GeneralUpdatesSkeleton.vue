<script setup>
import { useActivities } from '../../composables/activities';
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import StoresFilter from '@/components/shared/StoresFilter.vue';

/* ----- Data ----- */
const { activityCenter } = useActivities();
const { randomInteger } = useFilters();
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50"></div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter :loading="activityCenter.loadingActivities" @update:modelValue="storeFilterHandler"
              v-model="activityCenter.generalQueries.partner_store_id">
            </StoresFilter>
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown :autoOptionFocus="false" :loading="activityCenter.loadingActivities"
              :options="activityCenter.generalEvents" @change="fetchActivitiesHandler" optionLabel="label"
              optionValue="value" placeholder="All Events" showClear
              v-model="activityCenter.generalQueries['filters[event]']">
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%">
      <template #body>
        <Skeleton height="12.5px" width="40px" />
        <Skeleton height="12.5px" width="50px" class="mt-2" />
      </template>
    </Column>

    <Column header="Log" style="width: 25%">
      <template #body>
        <Skeleton height="18px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Store" style="width: 25%">
      <template #body>
        <Skeleton height="18px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Details" style="width: 30%">
      <template #body>
        <Skeleton height="18px" :width="`${randomInteger()}%`" />
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%">
      <template #body>
        <Skeleton height="18px" />
      </template>
    </Column>
  </DataTable>
</template>
