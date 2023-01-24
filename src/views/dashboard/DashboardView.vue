<script setup>
import DashboardLeft from '@/views/dashboard/components/DashboardLeft.vue'
import DashboardRight from '@/views/dashboard/components/DashboardRight.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
</script>

<template>
	<PageHeader
		content="Get the most out of Syncio so you can focus on growing your business"
		title="Welcome">
	</PageHeader>

	<article class="grid mt-4">
    <DashboardLeft />
    <DashboardRight />
	</article>
</template>
