<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useActivities } from './composables/activities'

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue'
const GeneralUpdates = defineAsyncComponent(() => import('@/views/activityCenter/components/GeneralUpdates/GeneralUpdates.vue'))
const OrderIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/OrderIssues/OrderIssues.vue'))
const ProductIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/ProductIssues/ProductIssues.vue'))


/* ----- Data ----- */
const { activityCenter, fetchActivitiesHandler } = useActivities()

/* ----- Mounted ----- */
onMounted(() => {
  fetchActivitiesHandler()
})

/* ----- Methods ----- */
const handleTabChange = async index => {
  activityCenter.activeTabIndex = index
  await fetchActivitiesHandler()
}
</script>

<template>
	<PageHeader
		content="See what's happening with your syncs, find and fix issues"
		title="Activity Center">
	</PageHeader>

  <TabView @update:activeIndex="handleTabChange">
    <TabPanel header="Product issues">
      <ProductIssues />
    </TabPanel>
    <TabPanel header="Order Issues">
      <OrderIssues />
    </TabPanel>
    <TabPanel header="General updates">
      <GeneralUpdates />
    </TabPanel>
  </TabView>

	<!-- <section class="mt-4">
    <ul class="surface-card p-0 m-0 list-none flex overflow-x-auto select-none">
      <li class="pr-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activityCenter.activeTabIndex === 0, 'text-700 border-transparent': activityCenter.activeTabIndex !== 0 }" @click="fetchActivitiesHandler()">
          <span class="font-semibold capitalize">Product issues</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="px-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activityCenter.activeTabIndex === 1, 'text-700 border-transparent': activityCenter.activeTabIndex !== 1 }" @click="fetchActivitiesHandler()">
          <span class="font-semibold capitalize">Order issues</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="pl-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activityCenter.activeTabIndex === 2, 'text-700 border-transparent': activityCenter.activeTabIndex !== 2 }" @click="fetchActivitiesHandler()">
          <span class="font-semibold capitalize"></span>
        </a>
      </li>
    </ul>
	</section> -->
</template>
