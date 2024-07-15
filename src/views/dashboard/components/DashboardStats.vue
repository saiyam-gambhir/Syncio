<script setup>
/* ----- Mounted ----- */
onMounted(() => {});
</script>

<template>
  <section class="col-12 mt-2 mb-7">
    <h2 class="flex align-items-center justify-content-between pb-2">
      Performance
      <a href="javascript:void(0);" class="btn-link">Tell us what data you want to see</a>
    </h2>
    <div class="grid">
      <div class="col-3">
        <CardWrapper title="Connected stores" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">100</h2>
            <p class="mb-0 text-500 text-sm pt-2">As of today</p>
          </template>
        </CardWrapper>
      </div>
      <div class="col-3">
        <CardWrapper title="Synced products" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">
              1000
              <span class="relative ml-2 text-lg" style="top: -6px; color: #1EA97C;">
                <IconChartLine fill="#1EA97C" />
                +1
              </span>
            </h2>
            <p class="mb-0 text-500 text-sm pt-2">As of today</p>
          </template>
        </CardWrapper>
      </div>
      <div class="col-3">
        <CardWrapper title="Orders containing synced products" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">
              20
              <span class="relative ml-2 text-lg" style="top: -6px; color: #6C757D;">
                <IconChartLine />
                0
              </span>
            </h2>
            <p class="mb-0 text-500 text-sm pt-2">Last 30 days compared to previous 30 day period</p>
          </template>
        </CardWrapper>
      </div>
      <div class="col-3">
        <CardWrapper title="Synced products sold" lightHeading class="h-100">
          <template #content>
            <h2 class="font-semi mt-4 mb-0">
              50
              <span class="relative ml-2 text-lg" style="top: -6px; color: #F59E08;">
                <IconChartLine fill="#F59E08" />
                -1
              </span>
            </h2>
            <p class="mb-0 text-500 text-sm pt-2">Last 30 days compared to previous 30 day period</p>
          </template>
        </CardWrapper>
      </div>
    </div>
  </section>
</template>
