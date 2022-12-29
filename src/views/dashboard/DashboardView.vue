<script setup>
import Card from '@/views/dashboard/components/Card.vue'
import DashboardLeft from '@/views/dashboard/components/DashboardLeft.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
</script>

<template>
	<PageHeader
		content="Get the most out of Syncio so you can focus on growing your business."
		title="Welcome">
	</PageHeader>

	<article class="grid mt-4">
    <DashboardLeft />
		<section class="col-12 md:col-7 lg:col-9">
			<div class="surface-card p-4 shadow-2 border-round">
    		<div class="text-xl font-semibold mb-3">Learn the basics</div>
        <ul class="list-none p-0 m-0">
          <li class="py-3 border-bottom-1 border-top-1 border-300">
            <a href="#" class="btn-link">Quick start guide</a>
          </li>
          <li class="py-3 border-bottom-1 border-300">
            <div>Connecting to a store</div>
          </li>
          <li class="py-3 border-bottom-1 border-300">
            <div>Syncing products</div>
          </li>
          <li class="py-3 border-bottom-1 border-300">
            <div>Best practices and healthy syncing</div>
          </li>
        </ul>
			</div>

      <div class="surface-card p-4 shadow-2 border-round mt-4">
    		<div class="text-xl font-semibold mb-3">Helpful articles</div>
        <ul class="list-none p-0 m-0">
          <li class="py-3 border-bottom-1 border-top-1 border-300">
            <div>Syncio overview</div>
          </li>
          <li class="py-3 border-bottom-1 border-300">
            <div>Common use cases</div>
          </li>
          <li class="py-3 border-bottom-1 border-300">
            <div>My products aren't syncing</div>
          </li>
          <li class="py-3">
            <div>Other issues and how to fix them</div>
          </li>
          <li class="pt-3 text-center">
            <div>More articles</div>
          </li>
        </ul>
			</div>

      <div class="surface-card p-4 shadow-2 border-round mt-4">
    		<div class="text-xl font-semibold mb-3">Learn the basics</div>
        <ul class="list-none p-0 m-0">
          <li class="py-3 border-bottom-1 border-top-1 border-300">
            <div>Orders Add-on</div>
          </li>
          <li class="py-3 border-bottom-1 border-300">
            <div>Product Settings Add-on</div>
          </li>
          <li class="py-3">
            <div>Syncing products</div>
          </li>
          <li class="pt-3 text-center">
            <div>More articles</div>
          </li>
        </ul>
			</div>
		</section>
	</article>
</template>
