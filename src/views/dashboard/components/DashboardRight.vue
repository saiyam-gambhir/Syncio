<script setup>
import { useConnectionsStore } from 'connections';
import MarketPlaceImageUrl from '@/assets/images/marketplace.svg';
import MultilocationImageUrl from '@/assets/images/multilocation.svg';
import WooShopifyImageUrl from '@/assets/images/woo-shopify.svg';

/* ----- Data ----- */
const { isSourceStore } = useConnectionsStore();
const destinationAnnouncements = ref([
  {
    className: 'a-woo-shopify',
    description: [
      'Use Syncio to connect to Woo stores. Simply connect as you normally would through the stores page.',
    ],
    externalLink: true,
    href: '',
    image: `${WooShopifyImageUrl}`,
    title: 'Sell in more places',
    features: [
      'Seamlessly sync inventory between Woo and Shopify',
      'It works just like with Shopify to Shopify',
      'Less manual work. More time to grow your business.',
    ],
  },
  {
    className: 'a-marketplace',
    description: [
      'Syncio Marketplace is coming soon.',
      'Find new products and form long term connections with reliable, like-minded partners.',
    ],
    externalLink: false,
    href: '/marketplace',
    image: `${MarketPlaceImageUrl}`,
    title: 'Boost sales with your perfect partner',
  },
  {
    className: 'a-multilocation',
    description: [
      'Multi-location allows you to choose where stock syncs to in your destination store.',
      'To use Multi-location, activate the toggle on the Stores page.',
    ],
    externalLink: true,
    href: 'https://help.syncio.co/en/articles/5842693-multilocations-for-destination-stores',
    image: `${MultilocationImageUrl}`,
    title: 'Sync stock to multiple locations',
  },
]);

const sourceAnnouncements = ref([
  destinationAnnouncements.value[0],
  destinationAnnouncements.value[1],
]);
</script>

<template>
  <section class="col-12 md:col-7 lg:col-9">
    <h2 class="pb-2">What's New</h2>
    <Carousel
      :autoplayInterval="5000"
      :numScroll="1"
      :numVisible="1"
      :showNavigators="false"
      :value="isSourceStore ? sourceAnnouncements : destinationAnnouncements"
      circular
      class="border-round shadow-2 surface-0 surface-border p-4 pb-3">
      <template #item="{ data }">
        <Card class="flex">
          <template #title>{{ data.title }}</template>
          <template #content>
            <div class="grid justify-content-between" :class="data.className">
              <div class="col-4">
                <ul>
                  <li v-for="item in data.description" :key="item" v-html="item"></li>
                </ul>
                <a v-if="data.externalLink" :href="data.href" target="_blank" class="p-button font-bold mt-5">Learn more</a>
                <router-link v-else :to="data.href" class="p-button font-bold mt-5">Learn more</router-link>
              </div>

              <div class="col-4 justify-content-center flex" :class="{ 'col-6': !data.features }">
                <img :src="`${data.image}`" :alt="`${data.image}`" />
              </div>

              <div v-if="data.features" class="col-4">
                <ul>
                  <li v-for="feature in data.features" :key="feature" class="flex">
                    <i class="pi pi-check-circle text-xl font-semibold mr-3 mt-2"></i>
                    <span v-html="feature"></span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Carousel>

    <CardWrapper title="Learn the basics" class="mt-5">
      <template #content>
        <ul class="list-none p-0 mb-0 mt-4">
          <li class="py-3 border-bottom-1 border-top-1 surface-border">
            <AppLink link="https://help.syncio.co/en/articles/6116999-quick-start" label="Quick start guide" />
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <AppLink link="https://help.syncio.co/en/articles/5596700-connecting-to-a-store" label="Connecting to a store" />
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <AppLink link="https://help.syncio.co/en/collections/1906212-syncing-products" label="Syncing products" />
          </li>
          <li class="py-3 border-bottom-1 surface-border">
            <AppLink link="https://help.syncio.co/en/articles/3284137-best-practices-healthy-syncing" label="Best practices and healthy syncing" />
          </li>
          <li class="pt-4 text-center">
            <AppLink link="https://help.syncio.co/en/" label="Visit the Help center for more" />
          </li>
        </ul>
      </template>
    </CardWrapper>
  </section>
</template>
