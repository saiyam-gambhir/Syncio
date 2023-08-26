<script setup>
/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};
</script>

<template>
  <PageHeader
    content="Manage your payouts by shop, store and product"
    title="Payouts Settings">
  </PageHeader>

  <article class="mt-4">
    <h2>Commissions</h2>
    <p class="text-lg line-height-4">
      Commissions will be calculated on sales value; the total amount your customers pay for the product. <br>
      If no Product commissions are set, Syncio will use the Store commission in Payouts calculations for that product. <br>
      Commissions can only be set for Shopify stores, as Payouts is not available for Woo stores yet.
    </p>

    <TabView @update:activeIndex="handleTabChange" class="mt-4">
      <TabPanel header="Your Shop default">
      </TabPanel>
      <TabPanel header="By Store">
      </TabPanel>
      <TabPanel header="By Product">
      </TabPanel>
    </TabView>
  </article>
</template>
