<script setup>
import { onMounted, ref } from 'vue'
import { useOrders } from '../composables/orders'

/* ----- COMPONENTS ----- */
import PageHeader from '@/components/shared/PageHeader.vue'

/* ----- DATA ----- */
const { fetchPushSettings } = useOrders()
const activeTabIndex = ref(0)

/* ----- MOUNTED ----- */
onMounted(async () => {
  await fetchPushSettings()
})

</script>

<template>
	<PageHeader
		content="Manage order push settings"
		title="Order Push Settings">
  </PageHeader>

	<section class="mt-4">
    <ul class="surface-card p-0 m-0 list-none flex overflow-x-auto select-none">
      <li class="pr-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activeTabIndex === 0, 'text-700 border-transparent': activeTabIndex !== 0 }">
          <span class="font-semibold capitalize">E-mail contact method</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="px-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activeTabIndex === 1, 'text-700 border-transparent': activeTabIndex !== 1 }">
          <span class="font-semibold capitalize">Shipping rules rates</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="pl-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': activeTabIndex === 2, 'text-700 border-transparent': activeTabIndex !== 2 }">
          <span class="font-semibold capitalize">Shipping type tags</span>
        </a>
      </li>
    </ul>
	</section>
</template>
