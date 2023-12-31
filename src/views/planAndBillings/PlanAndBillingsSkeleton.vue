<template>
  <article class="mt-2">
    <section class="grid">
      <div class="col-12 md:col-12 lg:col-9">
        <div class="pr-2">
          <CardWrapper class="pb-2">
            <template #content>
              <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 1: select a base plan</Tag>
              <h2 class="my-2">Select how many products you need to sync</h2>
              <p class="mt-0">
                All base plans include real time and ongoing inventory syncing, and have a <strong>14 day free trial</strong>.
                <AppLink label="Learn more about our pricing" link="https://www.syncio.co/pricing"></AppLink>
              </p>

              <div class="grid mt-4 pb-1">
                <div class="md:col-3 lg:col-3 relative p-3" v-for="_plan in 7">
                  <Skeleton height="141.25px" width="100%" />
                </div>
              </div>
            </template>
          </CardWrapper>

          <CardWrapper class="mt-6 pb-2" id="addons-wrapper">
            <template #content>
              <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 2: upgrade add-ons</Tag>
              <h2 class="my-2">Upgrade add-ons to suit your needs</h2>
              <p class="mt-0">Downgrade at any time. All add-ons have a <strong>14 day free trial</strong>.</p>

              <div class="grid mt-4 pb-1">
                <div class="md:col-4 lg:col-4 relative p-3" v-for="_addon in 3">
                  <Skeleton height="426.5px" width="100%" />
                </div>
              </div>
            </template>
          </CardWrapper>
        </div>
      </div>

      <div class="col-12 md:col-12 lg:col-3">
        <CardWrapper style="position: sticky; top: 2rem;">
          <template #content>
            <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 3: Review and approve subscription</Tag>
            <p class="m-0">For paid plans, cancel any time within your <strong>14 day free trial</strong> period and you won't be charged. <br> Free plans are free forever.</p>
            <h2 class="mt-3">Plan Summary</h2>
            <Divider />
            <h4 class="uppercase">Base Plan</h4>
            <div class="flex justify-content-between uppercase font-semibold">
              <Skeleton height="15.5px" width="100px" />
              <Skeleton height="15.5px" width="75px" />
            </div>

            <Divider />

            <h4 class="uppercase">Add-ons</h4>
            <div v-for="addon in 3">
              <div v-if="addon" class="flex justify-content-between uppercase font-semibold mb-3">
                <div>
                  <Skeleton height="15.5px" width="100px" />
                </div>
                <Skeleton height="15.5px" width="75px" />
              </div>
            </div>

            <Divider />

            <div class="flex justify-content-between uppercase font-semibold">
              <h2 class="mb-0">Total</h2>
              <Skeleton height="23.5px" width="110px" />
            </div>

            <Button label="Next" disabled class="p-button-lg w-full mt-5"></Button>
          </template>
        </CardWrapper>
      </div>
    </section>
  </article>
</template>

<style scoped>
.plan-block {
  border: 1px solid transparent;
  transition: .35s border-color;
}

.current-plan {
  background: #e3f2ff !important;
}

.selected-plan {
  border: 1px solid #0052aa;
}

.strike-through {
  text-decoration: line-through;
  color: #999;
}
</style>
