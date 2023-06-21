<script setup>
import { useActivities } from '../../composables/activities';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import GeneralUpdatesSkeleton from './GeneralUpdatesSkeleton.vue';
import StoresFilter from '@/components/shared/StoresFilter.vue';

/* ----- Data ----- */
const { activityCenter, fetchActivitiesHandler } = useActivities();

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  activityCenter.generalQueries.partner_store_id = storeId;
  await fetchActivitiesHandler();
};
</script>

<template>
  <GeneralUpdatesSkeleton v-if="activityCenter.loadingActivities" />

  <DataTable v-else :value="activityCenter.generalUpdates?.notifications" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50"></div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter @update:modelValue="storeFilterHandler"
              v-model="activityCenter.generalQueries.partner_store_id">
            </StoresFilter>
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown :autoOptionFocus="false" :options="activityCenter.generalEvents" @change="fetchActivitiesHandler"
              optionLabel="label" optionValue="value" placeholder="All Events" showClear
              v-model="activityCenter.generalQueries['filters[event]']">
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm font-semibold">{{ data.date }}</span>
          <span class="text-xs mt-2">{{ data.time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Log" style="width: 25%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm">{{ data.title }} {{ data.subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Store" style="width: 25%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm">{{ data.data.store_name }}</span>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 30%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm">{{ data.details.line_1 }}</span>
          <span v-if="data.details.line_2" class="text-xs mt-1">{{ data.details.line_2 }}</span>
        </div>
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%">
      <template #body="{ data }">
        <AppLink v-if="data.link" label="How to fix this" :link="data.link" class="text-sm" />
        <span v-else>-</span>
      </template>
    </Column>
  </DataTable>
</template>
