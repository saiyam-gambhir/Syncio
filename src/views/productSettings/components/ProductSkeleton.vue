<script setup>
/* ----- Data ----- */
const {
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());
</script>

<template>
  <div v-if="isDestinationStore" class="grid">
    <div class="col-5">
      <ul class="list-none p-0 m-0">
        <li class="py-4 flex align-items-center text-2xl">
          <h3 class="m-0">Initial sync</h3>
          <i class="pi pi-question-circle text-2xl ml-3" style="transform: translateY(1px);" v-tooltip.right="'Syncs once, the first time you connect to a specific store'"></i>
        </li>
        <li class="py-5 border-bottom-1 surface-border" v-for="setting in 2">
          <div class="flex align-items-center justify-content-between w-full">
            <div>
              <Skeleton height="18.5px" width="125px" />
              <Skeleton height="18.5px" width="500px" class="mt-2" />
            </div>
            <InputSwitch />
          </div>
        </li>
      </ul>
    </div>
    <div class="col-5 col-offset-1">
      <ul class="list-none p-0 m-0">
        <li class="py-4 flex align-items-center text-2xl">
          <h3 class="m-0">Ongoing sync</h3>
          <i class="pi pi-question-circle text-2xl ml-3" style="transform: translateY(1px);" v-tooltip.right="'Syncs in real time on an ongoing basis'"></i>
        </li>
        <li class="py-5 border-bottom-1 surface-border" v-for="setting in 6">
          <div class="flex align-items-center justify-content-between w-full">
            <div>
              <Skeleton height="18.5px" width="125px" />
              <Skeleton height="18.5px" width="500px" class="mt-2" />
            </div>
            <InputSwitch disabled />
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div v-if="isSourceStore" class="grid">
    <div class="col-5">
      <ul class="list-none p-0 m-0">
        <li class="py-5 border-bottom-1 surface-border">
          <div class="flex align-items-center justify-content-between w-full">
            <div>
              <Skeleton height="18.5px" width="125px" />
              <Skeleton height="18.5px" width="500px" class="mt-2" />
            </div>
            <InputSwitch />
          </div>
        </li>
        <li class="py-5 border-bottom-1 surface-border">
          <div class="flex align-items-center justify-content-between w-full">
            <div>
              <Skeleton height="18.5px" width="125px" />
              <Skeleton height="18.5px" width="500px" class="mt-2" />
            </div>
            <InputSwitch />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
