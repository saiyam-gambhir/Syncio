<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductSettingsStore } from '@/stores/productSettings'
import { useRouter } from 'vue-router'

/* ----- COMPONENTS ----- */
import PageHeader from '@/components/shared/PageHeader.vue'
const Product = defineAsyncComponent(() => import('./components/Product.vue'))
const Variant = defineAsyncComponent(() => import('./components/Variant.vue'))

/* ----- DATA ----- */
const auth = useAuthStore()
const productSettings = useProductSettingsStore()
const router = useRouter()

/* ----- MOUNTED ----- */
onMounted(async () => {
  if(!auth.isProductModuleAvailable) {
    router.push({ path: '/', query: { showUpgrade: 'true', type: 'product-settings' }})
    return
  }
	await productSettings.fetchSettings()
})

/* ----- METHODS ----- */
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
		<div v-if="productSettings.activeTabIndex === 0">
      <Product />
    </div>
    <div v-if="productSettings.activeTabIndex === 1">
      <Variant />
    </div>
	</section>
</template>
