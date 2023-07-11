<script setup>
import { toRefs } from 'vue';
import { useActivities } from '../../composables/activities';
import { useActivityCenterStore } from '@/stores/activityCenter';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import EmptyTable from '../EmptyTable.vue';
import GeneralUpdatesSkeleton from './GeneralUpdatesSkeleton.vue';
import Pagination from '@/components/shared/Pagination.vue';
import StoresFilter from '@/components/shared/StoresFilter.vue';

/* ----- Data ----- */
const { fetchActivitiesHandler } = useActivities();
const { generalEvents, generalQueries, generalUpdates, loadingActivities } = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  generalQueries.value.partner_store_id = storeId;
  await fetchActivitiesHandler();
};

const updateCurrentPageHandler = page => {
  fetchActivitiesHandler(page);
};
</script>

<template>
  <GeneralUpdatesSkeleton v-if="loadingActivities" />

  <DataTable v-else :value="generalUpdates?.notifications" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <EmptyTable />
    </template>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50"></div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter
              @update:modelValue="storeFilterHandler"
              v-model="generalQueries.partner_store_id">
            </StoresFilter>
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown
              :autoOptionFocus="false"
              :options="generalEvents"
              @change="fetchActivitiesHandler"
              optionLabel="label"
              optionValue="value"
              placeholder="All Events"
              showClear
              v-model="generalQueries['filters[event]']">
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span>{{ data.date }}</span>
          <span class="text-sm mt-2">{{ data.time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Log" style="width: 25%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span>{{ data.title }} {{ data.subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Store" style="width: 25%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span>{{ data.data.store_name }}</span>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 30%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span>{{ data.details.line_1 }}</span>
          <span v-if="data.details.line_2" class="mt-2">{{ data.details.line_2 }}</span>
        </div>
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%">
      <template #body="{ data }">
        <AppLink v-if="data.link" label="How to fix this" :link="data.link" />
        <span v-else>-</span>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="generalUpdates.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="generalUpdates?.pagination">
  </Pagination>
</template>
