<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePayouts } from './composables/payouts'
import { useRouter } from 'vue-router'

/* ===== COMPONENTS ===== */
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const { fetchDashboardStats, payouts } = usePayouts()
const auth = useAuthStore()
const router = useRouter()

/* ===== MOUNTED ===== */
onMounted(() => {
	if(!auth.isOrderModuleAvailable) {
    router.push({ path: '/', query: { showUpgrade: 'true', type: 'payouts' }})
    return
  }

  fetchDashboardStats()
})
</script>

<template>
	<PageHeader
		content="Manage Payouts for fulfilled orders"
		title="Manage Payouts">
	</PageHeader>

	<section class="payouts mt-4">
    <ul class="surface-card p-0 m-0 list-none flex overflow-x-auto select-none">
      <li class="pr-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': payouts.activeTabIndex === 0, 'text-700 border-transparent': payouts.activeTabIndex !== 0 }">
          <span class="font-semibold capitalize">Payable Orders</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="px-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': payouts.activeTabIndex === 1, 'text-700 border-transparent': payouts.activeTabIndex !== 1 }">
          <span class="font-semibold capitalize">Unpaid</span>
        </a>
      </li>
      <li class="flex align-items-center">
        <div style="width:1px; height: 50%" class="border-right-1 surface-border"></div>
      </li>
      <li class="pl-3">
        <a class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150" :class="{ 'border-blue-500 text-blue-500 hover:border-blue-500': payouts.activeTabIndex === 2, 'text-700 border-transparent': payouts.activeTabIndex !== 2 }">
          <span class="font-semibold capitalize">Paid</span>
        </a>
      </li>
    </ul>
	</section>
</template>
