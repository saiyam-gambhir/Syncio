<script setup>
import { useActivities } from '../../composables/activities'

/* ----- Components ----- */
import SearchFilter from '@/components/shared/SearchFilter.vue'
import StoresFilter from '@/components/shared/StoresFilter.vue'

const { activityCenter } = useActivities()
</script>

<template>
  <DataTable :value="[{},{},{},{},{}]" responsiveLayout="scroll" showGridlines>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50">
          <SearchFilter
            :loading="activityCenter.loadingActivities"
            placeholder="Search by product name or SKU"
            v-model="activityCenter.productQueries.search_str">
          </SearchFilter>
        </div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter
              :loading="activityCenter.loadingActivities"
              v-model="activityCenter.productQueries.partner_store_id" />
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown
              :autoOptionFocus="false"
              :loading="activityCenter.loadingActivities"
              :options="activityCenter.productEvents"
              optionLabel="label"
              optionValue="value"
              placeholder="All Events"
              v-model="activityCenter.productQueries['filters[event]']">
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%;">
      <template #body>
        <Skeleton height="12.5px" width="40px" />
        <Skeleton height="12.5px" width="50px" class="mt-2" />
      </template>
    </Column>

    <Column header="Issue And Suggested Action" style="width: 25%;">
      <template #body>
        <Skeleton height="12.5px" width="50%" />
        <Skeleton height="12.5px" width="80%" class="mt-2" />
      </template>
    </Column>

    <Column header="Product" style="width: 25%;">
      <template #body>
        <div class="flex">
          <figure class="m-0">
            <Skeleton height="32px" width="32px" />
          </figure>
          <div class="flex flex-column ml-2 w-full">
            <Skeleton height="12.5px" width="50%" />
            <Skeleton height="12.5px" width="75%" class="mt-2" />
          </div>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 20%;">
      <template #body>
        <Skeleton height="12.5px" width="50%" />
        <Skeleton height="12.5px" width="80%" class="mt-2" />
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%;">
      <template #body>
        <Skeleton height="18px" width="75%" />
      </template>
    </Column>

    <Column header="Actions" style="width: 10%;" class="text-right">
      <template #body>
        <Skeleton size="40px" shape="circle" style="float: right;" />
      </template>
    </Column>
  </DataTable>
</template>
