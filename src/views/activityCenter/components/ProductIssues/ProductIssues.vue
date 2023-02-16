<script setup>
import { useActivities } from '../../composables/activities'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import ProductIssuesSkeleton from './ProductIssuesSkeleton.vue'

/* ===== DATA ===== */
const { activityCenter, deleteActivityHandler } = useActivities()
</script>

<template>
  <ProductIssuesSkeleton v-if="activityCenter.loadingActivities" />

  <DataTable v-else :value="activityCenter.productIssues?.notifications" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <div class="px-4 py-4 text-center">
        <h2 class="m-0">Hurray 🎉</h2>
        <p>You have no Product issues at this time.<br> If you notice something isn't right with your sync,<br> check back here to see if there are any issues and how to fix them.</p>
      </div>
    </template>

    <Column header="Date(AEST)" style="width: 7.5%;">
      <template #body="{ data: { date, time } }">
        <div class="flex flex-column">
          <span class="text-sm font-semibold">{{ date }}</span>
          <span class="text-xs mt-2">{{ time }}</span>
        </div>
      </template>
    </Column>

    <Column header="Issue And Suggested Action" style="width: 25%;">
      <template #body="{ data: { title, subtitle } }">
        <div class="flex flex-column">
          <span class="font-semibold text-sm">{{ title }}</span>
          <span class="text-xs mt-2">{{ subtitle }}</span>
        </div>
      </template>
    </Column>

    <Column header="Product" style="width: 25%;">
      <template #body="{ data: { data } }">
        <div class="flex">
          <figure class="m-0">
            <img :src="data.image" :alt="data.name" style="width: 32px; padding: 2px; border: 1px solid rgb(231, 231, 231);">
          </figure>
          <div class="flex flex-column ml-2">
            <span class="font-semibold text-sm text-blue-500">{{ data.name }}</span>
            <span class="text-xs mt-2">{{ data.store_name }}</span>
          </div>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 20%;">
      <template #body="{ data: { details } }">
        <div class="flex flex-column">
          <span class="font-semibold text-sm">{{ details.line_1 }}</span>
          <span class="text-xs mt-2">{{ details.line_2 }}</span>
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
        <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger" v-tooltip.top="'Dismiss'" @click="deleteActivityHandler(id)" />
      </template>
    </Column>
  </DataTable>
</template>
