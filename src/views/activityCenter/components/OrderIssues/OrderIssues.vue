<script setup>
import { useActivities } from '../../composables/activities'

/* ===== DATA ===== */
const { activityCenter, deleteActivityHandler } = useActivities()
</script>

<template>
  <DataTable :value="activityCenter.orderIssues?.notifications" responsiveLayout="scroll" showGridlines>
    <template #empty v-if="!activityCenter.loadingActivities">
      <div class="px-4 py-4 text-center">
        <h2 class="m-0">Hurray 🎉</h2>
        <p>You have no Order issues at this time.<br> If you notice something isn't right with your sync,<br> check back here to see if there are any issues and how to fix them.</p>
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
        <div class="flex">
          <figure class="m-0">
            <img :src="data.data.image" :alt="data.data.name" style="width: 32px; padding: 2px; border: 1px solid rgb(231, 231, 231);">
          </figure>
          <div class="flex flex-column ml-2">
            <span class="font-semibold text-sm text-blue-500">{{ data.data.name }}</span>
            <span class="text-xs mt-1">{{ data.data.store_name }}</span>
          </div>
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
      <template #body="{ data }">
        <a v-if="data.link" :href="data.link" class="btn-link text-sm">How to fix this</a>
      </template>
    </Column>

    <Column header="Actions" style="width: 10%;" class="text-right">
      <template #body="{ data: { id } }">
        <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger" v-tooltip.top="'Dismiss'" @click="deleteActivityHandler(id)" />
      </template>
    </Column>
  </DataTable>
</template>
