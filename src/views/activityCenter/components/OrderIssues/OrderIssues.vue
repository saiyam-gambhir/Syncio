<script setup>
import { useActivities } from '../../composables/activities'

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue'
import OrderIssuesSkeleton from './OrderIssuesSkeleton.vue'
import SearchFilter from '@/components/shared/SearchFilter.vue'
import StoresFilter from '@/components/shared/StoresFilter.vue'

/* ----- Data ----- */
const { activityCenter, deleteActivityHandler, fetchActivitiesHandler } = useActivities()

/* ----- Methods ----- */
const searchHandler = async searchText => {
  activityCenter.orderQueries.search_str = searchText
  await fetchActivitiesHandler()
}

const storeFilterHandler = async storeId => {
  activityCenter.orderQueries.partner_store_id = storeId
  await fetchActivitiesHandler()
}
</script>

<template>
  <OrderIssuesSkeleton v-if="activityCenter.loadingActivities" />

  <DataTable v-else :value="activityCenter.orderIssues?.notifications" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <div class="px-4 py-4 text-center">
        <h2 class="m-0">Hurray 🎉</h2>
        <p>You have no Order issues at this time.<br> If you notice something isn't right with your sync,<br> check back
          here to see if there are any issues and how to fix them.</p>
      </div>
    </template>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50">
          <SearchFilter @update:modelValue="searchHandler" placeholder="Search by order number order ID"
            v-model="activityCenter.orderQueries.search_str">
          </SearchFilter>
        </div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter @update:modelValue="storeFilterHandler" v-model="activityCenter.orderQueries.partner_store_id">
            </StoresFilter>
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown :autoOptionFocus="false" :options="activityCenter.orderEvents" @change="fetchActivitiesHandler"
              optionLabel="label" optionValue="value" placeholder="All Events" showClear
              v-model="activityCenter.orderQueries['filters[event]']">
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="text-sm font-semibold">{{ data.date }}</span>
          <span class="text-xs mt-1">{{ data.time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Issue And Suggested Action" style="width: 25%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="font-semibold text-sm">{{ data.title }}</span>
          <span class="text-xs mt-1">{{ data.subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Order" style="width: 25%;">
      <template #body="{ data }">
        <div class="flex flex-column ml-2 pointer" @click="searchHandler(data.data?.name)">
          <span class="font-semibold text-sm text-blue-500">{{ data.data.name }}</span>
          <span class="text-xs mt-1">{{ data.data.store_name }}</span>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 20%;">
      <template #body="{ data }">
        <div class="flex flex-column">
          <span class="font-semibold text-sm">{{ data.details.line_1 }}</span>
          <span class="text-xs mt-1">{{ data.details.line_2 }}</span>
        </div>
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%;">
      <template #body="{ data: { link } }">
        <AppLink v-if="link" label="How to fix this" :link="link" class="text-sm" />
        <span v-else>-</span>
      </template>
    </Column>

    <Column header="Actions" style="width: 10%;" class="text-right">
      <template #body="{ data: { id } }">
        <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger" v-tooltip.top="'Dismiss'"
          @click="deleteActivityHandler(id)"></Button>
      </template>
    </Column>
  </DataTable>
</template>
