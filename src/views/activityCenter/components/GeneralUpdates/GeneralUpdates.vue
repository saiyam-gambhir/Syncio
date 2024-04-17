<script setup>
/* ----- Data ----- */
const {
  fetchActivitiesHandler
} = useActivities();

const {
  generalUpdates,
  loadingActivities
} = toRefs(useActivityCenterStore());

/* ----- Methods ----- */
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
      <GeneralUpdatesHeader />
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
      <template #body="{ data: { data: { store_domain, store_name } } }">
        <div v-if="store_name" class="flex flex-column">
          <span style="font-size: 1.1rem;">{{ store_name }}</span>
          <span class="text-small">{{ store_domain }}</span>
        </div>
        <div v-else>
          {{ store_domain }}
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
