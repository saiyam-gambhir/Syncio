<script setup>
import Header from '@/components/header/Header.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <main class="main">
    <div class="min-h-screen flex relative lg:static surface-ground">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <div class="bg-white" style="height: 60px;"></div>
        <div class="p-4 flex flex-column flex-auto">
          <div class="border-1 surface-border border-round surface-section flex-auto p-4">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
