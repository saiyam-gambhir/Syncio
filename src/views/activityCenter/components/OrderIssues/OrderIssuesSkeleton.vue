<script setup>
import { useActivityCenterStore } from '@/stores/activityCenter';

/* ----- Data ----- */
const { loadingActivities, orderEvents, orderQueries } = toRefs(useActivityCenterStore());
</script>

<template>
  <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-50">
          <SearchFilter
            :loading="loadingActivities"
            placeholder="Search by order number order ID"
            v-model="orderQueries.search_str">
          </SearchFilter>
        </div>

        <div class="flex w-50 align-items-center justify-content-end">
          <div class="p-inputgroup w-35">
            <StoresFilter
              :loading="loadingActivities"
              v-model="orderQueries.partner_store_id">
            </StoresFilter>
          </div>

          <div class="p-inputgroup w-35 ml-4">
            <Dropdown
              :autoOptionFocus="false"
              :loading="loadingActivities"
              :options="orderEvents"
              optionLabel="label"
              optionValue="value"
              placeholder="All Events"
              v-model="orderQueries['filters[event]']">
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

    <Column header="Issue And Suggested Action" style="width: 25%">
      <template #body>
        <Skeleton height="12.5px" width="50%" />
        <Skeleton height="12.5px" width="80%" class="mt-2" />
      </template>
    </Column>

    <Column header="Order" style="width: 25%">
      <template #body>
        <Skeleton height="12.5px" width="25%" />
        <Skeleton height="12.5px" width="60%" class="mt-2" />
      </template>
    </Column>

    <Column header="Details" style="width: 20%">
      <template #body>
        <Skeleton height="12.5px" width="50%" />
        <Skeleton height="12.5px" width="80%" class="mt-2" />
      </template>
    </Column>

    <Column header="Help" style="width: 12.5%">
      <template #body>
        <Skeleton height="18px" width="75%" />
      </template>
    </Column>

    <Column header="Actions" style="width: 10%" class="text-right">
      <template #body>
        <Skeleton width="71.4px" height="31.4px" style="float: right" />
      </template>
    </Column>
  </DataTable>
</template>
