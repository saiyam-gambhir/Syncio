<script setup>
import { useActivities } from '../../composables/activities';
import { useActivityCenterStore } from '@/stores/activityCenter';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import EmptyTable from '../EmptyTable.vue';
import Pagination from '@/components/shared/Pagination.vue';
import ProductIssuesSkeleton from './ProductIssuesSkeleton.vue';
import SearchFilter from '@/components/shared/SearchFilter.vue';
import StoresFilter from '@/components/shared/StoresFilter.vue';

/* ----- Data ----- */
const { deleteActivityHandler, fetchActivitiesHandler } = useActivities();
const {
  loadingActivities,
  productEvents,
  productIssues,
  productQueries,
} = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
const searchHandler = searchText => {
  productQueries.value.search_str = searchText;
  fetchActivitiesHandler();
};

const storeFilterHandler = storeId => {
  productQueries.value.partner_store_id = storeId;
  fetchActivitiesHandler();
};

const updateCurrentPageHandler = page => {
  fetchActivitiesHandler(page);
};
</script>

<template>
  <ProductIssuesSkeleton v-if="loadingActivities" />

  <DataTable v-else :value="productIssues?.notifications" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <EmptyTable />
    </template>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50">
          <SearchFilter
            @update:modelValue="searchHandler"
            placeholder="Search by product name or SKU"
            v-model="productQueries.search_str">
          </SearchFilter>
        </div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter
              @update:modelValue="storeFilterHandler"
              v-model="productQueries.partner_store_id">
            </StoresFilter>
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown
              :autoOptionFocus="false"
              :options="productEvents"
              @change="fetchActivitiesHandler"
              optionLabel="label"
              optionValue="value"
              placeholder="All Events"
              showClear
              v-model="productQueries['filters[event]']">
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%">
      <template #body="{ data: { date, time } }">
        <div class="flex flex-column">
          <span>{{ date }}</span>
          <span class="text-sm mt-2">{{ time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Issue And Suggested Action" style="width: 25%">
      <template #body="{ data: { subtitle, title } }">
        <div class="flex flex-column">
          <span class="font-semibold">{{ title }}</span>
          <span class="mt-2">{{ subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Product" style="width: 25%">
      <template #body="{ data }">
        <div class="flex pointer" @click="searchHandler(data.data?.name)">
          <figure class="m-0">
            <img v-if="data.data?.image" :src="data.data.image" :alt="data.data.name" style="width: 32px; padding: 2px; border: 1px solid rgb(231, 231, 231);" />
          </figure>
          <div class="flex flex-column ml-2">
            <span v-if="data.data?.name" class="font-semibold text-blue-500">{{ data.data.name }}</span>
            <span v-if="data.data?.store_name" class="mt-2">{{ data.data.store_name }}</span>
          </div>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 20%">
      <template #body="{ data: { details } }">
        <div class="flex flex-column">
          <span class="font-semibold">{{ details.line_1 }}</span>
          <span class="mt-2">{{ details.line_2 }}</span>
        </div>
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%">
      <template #body="{ data: { link } }">
        <AppLink v-if="link" label="How to fix this" :link="link" />
        <span v-else>-</span>
      </template>
    </Column>

    <Column header="Actions" style="width: 10%" class="text-right">
      <template #body="{ data: { id } }">
        <Button
          @click="deleteActivityHandler(id)"
          class="p-button-sm"
          label="Dismiss"
          outlined
          raised
          severity="danger">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="productIssues.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="productIssues?.pagination">
  </Pagination>
</template>
