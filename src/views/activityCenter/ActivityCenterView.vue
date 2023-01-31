<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useActivityCenterStore } from '@/stores/activityCenter'
import PageHeader from '@/components/shared/PageHeader.vue'
import ProductIssues from '@/views/activityCenter/components/ProductIssues.vue'
const OrderIssues = defineAsyncComponent(() => import('@/views/activityCenter/components/OrderIssues.vue'))
const GeneralUpdates = defineAsyncComponent(() => import('@/views/activityCenter/components/GeneralUpdates.vue'))

/* ===== DATA ===== */
const activityCenter = useActivityCenterStore()

/* ===== MOUNTED ===== */
onMounted(() => {
  fetchActivitiesHandler(0)
})

/* ===== METHODS ===== */
const fetchActivitiesHandler = async (activeTabIndex) => {
  activityCenter.activeTabIndex = activeTabIndex
  await activityCenter.fetchActvities()
}
</script>

<template>
	<PageHeader
		content="See what's happening with your syncs, find and fix issues"
		title="Activity Center">
	</PageHeader>

	<section class="mt-4">
    <ul class="surface-card p-0 m-0 list-none flex overflow-x-auto select-none">
      <li class="pr-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activityCenter.activeTabIndex === 0, 'text-700 border-transparent': activityCenter.activeTabIndex !== 0 }" @click="fetchActivitiesHandler(0)">
          <span class="font-semibold">Product Issues</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="px-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activityCenter.activeTabIndex === 1, 'text-700 border-transparent': activityCenter.activeTabIndex !== 1 }" @click="fetchActivitiesHandler(1)">
          <span class="font-semibold">Order Issues</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="pl-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activityCenter.activeTabIndex === 2, 'text-700 border-transparent': activityCenter.activeTabIndex !== 2 }" @click="fetchActivitiesHandler(2)">
          <span class="font-semibold">General Updates</span>
        </a>
      </li>
    </ul>

    <div v-if="activityCenter.activeTabIndex === 0" class="mt-4">
      <ProductIssues />
    </div>
    <div v-if="activityCenter.activeTabIndex === 1" class="mt-4">
      <OrderIssues />
    </div>
    <div v-if="activityCenter.activeTabIndex === 2" class="mt-4">
      <GeneralUpdates />
    </div>
	</section>
</template>
