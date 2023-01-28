<script setup>
import { onMounted, ref } from 'vue'
import DashboardLeft from '@/views/dashboard/components/DashboardLeft.vue'
import DashboardRight from '@/views/dashboard/components/DashboardRight.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useConnectionsStore } from '@/stores/connections'
import { fetchDashboard } from '../../stores/dashboard/actions/fetchDashboard'

const connections = useConnectionsStore()
const dashboard = useDashboardStore()
const dashboardSections = ref([
	{ label: 'Learn the basics', value: 'learn_the_basics', isVisible: true },
	{ label: 'Helpful articles', value: 'helpful_articles', isVisible: true },
	{ label: 'Add-ons', value: 'add_ons', isVisible: true },
])

/* ===== MOUNTED ===== */
onMounted(() => {
  fetchDashboardHandler()
})

/* ===== METHODS ===== */
const populateCustomizeDropDown = (label, value, isVisible) => {
  dashboard.selectedSections.push({
    label,
    value,
    isVisible
  })
}

const fetchDashboardHandler = async () => {
  if(dashboard.$state.success) return
	await dashboard.fetchDashboard(connections.storeId)
  const { learn_the_basics, helpful_articles, add_ons } = dashboard.$state
  if(learn_the_basics) populateCustomizeDropDown('Learn the basics', 'learn_the_basics', learn_the_basics)
  if(helpful_articles) populateCustomizeDropDown('Helpful articles', 'helpful_articles', helpful_articles)
  if(add_ons) populateCustomizeDropDown('Add-ons', 'add_ons', add_ons)
}

const updateDashboardHandler = async (event) => {
  const payload = {}
  dashboard.selectedSections.forEach(section => {
    if(section) payload[section.value] = section.isVisible
  })
  await dashboard.updateDashboard(payload, connections.storeId)
}
</script>

<template>
	<PageHeader
		content="Get the most out of Syncio so you can focus on growing your business"
		title="Welcome"
		withActions>

		<template #actions>
			<div class="flex align-items-center justify-content-between">
				<MultiSelect v-model="dashboard.selectedSections" :options="dashboardSections" optionLabel="label" placeholder="Customize Dashboard" :showToggleAll="false" @change="updateDashboardHandler($event)">
					<template #value>
						Customize Dashboard
					</template>
				</MultiSelect>
			</div>
		</template>
	</PageHeader>

	<article class="grid mt-4">
    <DashboardLeft />
    <DashboardRight />
	</article>
</template>
