<script setup>
import Header from '@/components/header/Header.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <main class="main">
    <div class="min-h-screen flex relative lg:static surface-ground">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <div class="flex justify-content-end align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static" style="height:60px">
            <ul class="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
                surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                <li>
                    <a class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                        transition-duration-150 transition-colors p-ripple">
                        <i class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"></i>
                        <span class="block lg:hidden font-medium">Notifications</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="p-3 flex flex-column flex-auto">
            <div class="border-1 surface-border border-round surface-section flex-auto p-3">
              <RouterView />
            </div>
        </div>
    </div>
    </div>

  </main>
</template>
