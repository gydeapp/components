<template>
  <div class="px-[15px] text-center">
    <svg-icon-lock class="inline"></svg-icon-lock>

    <p class="my-5 text-xl font-bold leading-[30px]">
      Creator added paywall<br />
      to view full content
    </p>

    <button
      class="h-11 w-full rounded-xl bg-black text-sm font-bold text-white"
    >
      Unlock for {{ currency }}{{ tourPrice }}
    </button>

    <button
      class="mt-[10px] h-11 w-full rounded-xl border border-black text-sm font-bold text-black"
    >
      Subscribe for $4.99/mo
    </button>

    <p class="my-5 text-xs font-medium leading-[18px]">
      Get unlimited access to all paid content <br />
      from {{ creatorFirstName }} with one subscription.
    </p>

    <p class="text-xs font-bold">7-day free trial. Cancel anytime.</p>
  </div>
</template>

<script setup>
import { useTourCurrency } from '../../composables/useTourCurrency'

import SvgIconLock from '../svg/SvgIconLock.vue'

const props = defineProps({
  tourPrice: {
    type: Number,
    required: true
  },
  tourPriceCurrId: {
    type: Number,
    required: true
  },
  creatorFirstName: {
    type: String,
    required: true
  }
})

const { currency } = useTourCurrency(props.tourPriceCurrId)
</script>

<script>
export default {
  name: 'TourPaywall'
}
</script>
