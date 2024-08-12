<script setup>
import { DateTime } from 'luxon';

/* ----- Data ----- */
const {
  plan,
} = toRefs(usePlanStore());

/* ----- Props ----- */
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  limitUsed: {
    type: [Number || String],
    required: true
  },
  limitAvailable: {
    type: [Number || String],
    required: true
  }
});

/* ----- Computed ----- */
const percentageLimitUsed = computed(() => {
  let progress = ((props.limitUsed * 100) / props.limitAvailable);
  return progress > 100 ? '100%' : `${progress}%`;
});

const getNextBillableDaysRemaining = computed(() => {
  const nextBillableDate = plan.value?.next_billable_date.split(' ')[0];
  const targetDate = DateTime.fromISO(nextBillableDate);
  const now = DateTime.now().minus({ days: 1 });
  const daysRemaining = parseInt(targetDate.diff(now, 'days').days);
  return daysRemaining;
});
</script>

<template>
  <aside class="mb-2">
    <p class="text-sm m-0">Monthly usage plan</p>

    <template v-if="getNextBillableDaysRemaining - 30 > 0">
      <h3 class="m-0 mt-1">Free Trial</h3>
      <h4 class="m-0 mt-3 font-semi line-height-3">Your usage plan will start after the free trial period ends</h4>
      <div class="text-sm mt-2">
        {{ `${getNextBillableDaysRemaining - 30} ${(getNextBillableDaysRemaining - 30) > 1 ? 'days' : 'day'} remaining` }}
      </div>
    </template>

    <template v-else>
      <h3 class="m-0 mt-1">{{ title }}</h3>
      <div class="flex align-items-center justify-content-between mt-3" v-if="limitUsed <= 1000">
        <h4 class="m-0">Synced products sold</h4>
        <div class="text-sm">{{ limitUsed }}/{{ limitAvailable }}</div>
      </div>
      <div class="progress-bar relative my-2 w-full" v-if="limitUsed <= 1000">
        <div class="progress-bar-used absolute h-full" :style="{ 'width': percentageLimitUsed }" style="transition: width .25s;"></div>
      </div>
      <div v-else class="font-semibold mt-3 mb-3">
        <div class="mb-2">Synced products sold</div>
        {{ limitUsed }} / <span class="font-normal">unlimited</span>
      </div>
      <div class="text-sm mt-2">
        {{ `${getNextBillableDaysRemaining} ${getNextBillableDaysRemaining > 1 ? 'days' : 'day'} remaining` }}
      </div>
    </template>
    <Divider />
    <p class="text-sm mt-0 line-height-3">You plan tier will automatically adjust with your usage.</p>
    <AppLink label="Learn about Source store pricing" link="https://help.syncio.co/en/articles/9643458-source-store-pricing" class="text-sm line-height-2" />
  </aside>
</template>

<style scoped>
.text-sm {
  color: #757575;
}

a.text-sm {
  font-size: .8rem !important;
}

h4 {
  color: #212121;
  font-size: .9rem;
  font-weight: 500;
}

.progress-bar {
  background: #E0E0E0;
  border-radius: var(--border-radius);
  height: .85rem;
  overflow-x: hidden;
}

.progress-bar-used {
  background: #F3C58D;
  left: 0;
  top: 0;
}

.addon-active + .addon-active .text-xl {
  margin-bottom: 0 !important;
}
</style>
