<script setup>
import { onMounted } from 'vue'
import { useProductSettingsStore } from '@/stores/productSettings'

/* ===== COMPONENTS ===== */
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const productSettings = useProductSettingsStore()

/* ===== MOUNTED ===== */
onMounted(async  () => {
	await productSettings.fetchSettings()
})

/* ===== METHODS ===== */
const changeTabHandler = activeTabIndex => {
	productSettings.activeTabIndex = activeTabIndex
}
</script>

<template>
	<PageHeader
		content="Manage how your products sync with your connected store"
		title="Product Settings"
		withBackButton
		href="settings">
	</PageHeader>

	<section class="mt-4">
    <ul class="surface-card p-0 m-0 list-none flex overflow-x-auto select-none">
      <li class="pr-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': productSettings.activeTabIndex === 0, 'text-700 border-transparent': productSettings.activeTabIndex !== 0 }" @click="changeTabHandler(0)">
          <span class="font-semibold capitalize">Product</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="px-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': productSettings.activeTabIndex === 1, 'text-700 border-transparent': productSettings.activeTabIndex !== 1 }" @click="changeTabHandler(1)">
          <span class="font-semibold capitalize">Variant</span>
        </a>
      </li>
    </ul>
	</section>

	<section class="mt-4">
		{{ productSettings.configrations }}
	</section>
</template>
