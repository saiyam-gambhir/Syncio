<script setup>
import Header from '@/components/header/Header.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <main class="main">
    <div class="min-h-screen flex relative lg:static surface-ground">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <Header />
        <div class="flex flex-column flex-auto">
          <div class="pt-0 pb-4 pl-0 pr-4 flex flex-column flex-auto">
            <div class="surface-section flex-auto pt-3 p-4">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
