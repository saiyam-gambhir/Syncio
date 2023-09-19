<script setup>
import { useActivities } from '../../composables/activities';
import { useActivityCenterStore } from 'activityCenter';

/* ----- Data ----- */
const {
  deleteActivityHandler,
  fetchActivitiesHandler
} = useActivities();

const {
  loadingActivities,
  orderIssues,
  orderQueries,
} = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
const searchHandler = async searchText => {
  orderQueries.value.search_str = searchText;
  await fetchActivitiesHandler();
};

const updateCurrentPageHandler = page => {
  fetchActivitiesHandler(page);
};
</script>

<template>
  <OrderIssuesSkeleton v-if="loadingActivities" />

  <DataTable v-else :value="orderIssues?.notifications" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <EmptyTable />
    </template>

    <template #header>
      <OrderIssuesHeader />
    </template>

    <Column header="Date(AEST)" style="width: 7.5%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span>{{ data.date }}</span>
          <span class="text-sm mt-2">{{ data.time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Issue And Suggested Action" style="width: 25%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="font-semibold">{{ data.title }}</span>
          <span class="mt-2">{{ data.subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Order" style="width: 25%">
      <template #body="{ data }">
        <div class="flex flex-column ml-2 pointer" @click="searchHandler(data.data?.name)">
          <span class="font-semibold text-blue-500">{{ data.data.name }}</span>
          <span class="mt-2">{{ data.data.store_name }}</span>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 20%">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="font-semibold">{{ data.details.line_1 }}</span>
          <span class="mt-2">{{ data.details.line_2 }}</span>
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
          severity="danger">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="orderIssues.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="orderIssues?.pagination">
  </Pagination>
</template>
