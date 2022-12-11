<script setup>
import Logo from '@/icons/Logo.vue'
</script>

<template>
  <div class="bg-primary h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 border-gray-800 w-18rem lg:w-5rem select-none">
  	<div class="flex flex-column h-full">

    	<div class="flex align-items-center justify-content-center flex-shrink-0" style="height:60px">
      	<Logo tabindex="0" width="40px" height="40px" />
      </div>

      <div class="mt-3 select-none">
      	<ul class="list-none m-0 p-0">
        	<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Dashboard'">
          	<a tabindex="1" class="active flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-th-large mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Dashboard</span>
            </a>
          </li>
					<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Stores'">
          	<a tabindex="2" class="flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-link mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Stores</span>
            </a>
          </li>
					<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Products'">
          	<a tabindex="3" class="flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-list mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Products</span>
            </a>
          </li>
					<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Product Settings'">
          	<a tabindex="4" class="flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-cog mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Product Settings</span>
            </a>
          </li>
					<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Orders'">
          	<a tabindex="5" class="flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-file mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Orders</span>
            </a>
          </li>
					<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Payouts'">
          	<a tabindex="6" class="flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-dollar mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Payouts</span>
            </a>
          </li>
					<li class="p-3 lg:py-1 lg:px-2" v-tooltip.right="'Activity Center'">
          	<a tabindex="6" class="flex align-items-center cursor-pointer p-3 lg:justify-content-center border-round hover-primary text-gray-300 hover:text-white transition-duration-150 transition-colors">
            	<i class="pi pi-bell mr-2 lg:mr-0 text-base lg:text-xl"></i>
            	<span class="font-medium inline lg:hidden">Activity Center</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
	<div class="min-h-screen flex flex-column relative flex-auto">
		<div class="flex justify-content-end align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border" style="height:60px;">
			<ul class="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
				<li>
					<a class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors">
						<i class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"></i>
						<span class="block lg:hidden font-medium">Notifications</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="p-5 flex flex-column flex-auto">
      <div class="border-2 border-dashed surface-border border-round surface-section flex-auto">
      </div>
    </div>
	</div>
</template>
