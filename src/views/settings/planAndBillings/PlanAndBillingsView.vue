<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import CardWrapper from '@/components/shared/CardWrapper.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import Plan from './components/Plan.vue';

/* ----- Data ----- */
const { fetchPlans, plans, getCurrentPlanId, selectedPlan } = toRefs(useAuthStore());

onMounted(() => {
  fetchPlansHandler()
})

const fetchPlansHandler = async () => {
  await fetchPlans.value()
}

const selectPlanHandler = (plan) => {
  selectedPlan.value = plan;
}
</script>

<template>
  <PageHeader content="Upgrade or downgrade anytime. <a href='#' class='btn-link'>Contact us</a> for help"
    title="Plan and Billings">
  </PageHeader>

  <article class="mt-4">
    <section class="grid">
      <div class="col-12 md:col-12 lg:col-9">
        <CardWrapper>
          <template #content>
            <h3 class="uppercase">Step 1: select a base plan</h3>
            <h2>Select how many products you need to sync</h2>
            <p>
              All base plans include real time and ongoing inventory syncing, and have a <strong>14 day free trial</strong>.
              <AppLink label="Learn more about our pricing" link="https://www.syncio.co/pricing"></AppLink>
            </p>

            <div class="grid mt-4">
              <div class="lg:col-3 relative p-3" v-for="plan in plans" :key="plan.id">
                <Plan :plan="plan" class="pointer" @click="selectPlanHandler(plan)" :style="{ 'background': getCurrentPlanId === plan.id ? '#f4f4f4 !important' : '' }" />
                <i v-if="getCurrentPlanId === plan.id" class="pi pi-check-circle absolute" style="font-size: 2rem; top: 2.15rem; right: 2.15rem;"></i>
              </div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="mt-5">
          <template #content>
            <h3 class="uppercase">Step 2: upgrade add-ons</h3>
            <h2>Upgrade add-ons to suit your needs</h2>
            <p>Downgrade at any time. All add-ons have a <strong>14 day free trial</strong>.</p>

            <div class="grid mt-4">
            </div>
          </template>
        </CardWrapper>
      </div>
      <div class="col-12 md:col-12 lg:col-3">
        <CardWrapper>
          <template #content>
          </template>
        </CardWrapper>
      </div>
    </section>
  </article>
</template>
