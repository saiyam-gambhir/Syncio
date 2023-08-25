<script setup>
import { toRefs } from 'vue';
import { useConnectionsStore } from '@/stores/connections';

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
        <li class="py-5 border-bottom-1 surface-border">
          <h3 class="m-0 text-xl">Initial sync</h3>
          <p class="mt-2 mb-0 text-lg">Syncs once, the first time you connect to a specific store</p>
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
        <li class="py-5 border-bottom-1 surface-border">
          <h3 class="m-0 text-xl">Ongoing sync</h3>
          <p class="mt-2 mb-0 text-lg">Syncs in real time on an ongoing basis</p>
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
      </ul>
    </div>
  </div>
</template>
