<script setup>
import { computed, ref, toRefs } from 'vue';
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import CardWrapper from '@/components/shared/CardWrapper.vue';
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
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
            Hello
          </template>
        </CardWrapper>
      </div>
      <div class="col-12 md:col-12 lg:col-3">
        <CardWrapper>
          <template #content>
            Hello
          </template>
        </CardWrapper>
      </div>
    </section>
  </article>
</template>
