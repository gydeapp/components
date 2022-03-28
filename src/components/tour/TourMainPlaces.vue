<template>
  <div class="mt-[15px]">
    <tour-heading class="ml-[15px] mb-[15px]"> Main places </tour-heading>

    <horizontal-scrolling>
      <div
        v-for="(place, index) in mainPlaces"
        :key="index"
        class="mr-[10px] first:ml-[15px]"
      >
        <div
          class="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-[15px] bg-[#f0f0f0]"
        >
          <img
            v-if="place.image"
            class="h-full w-full object-cover"
            draggable="false"
            :src="place.image"
            :alt="place.title"
          />

          <svg-no-image v-else></svg-no-image>
        </div>

        <p class="mt-[10px] text-[13px] font-medium leading-4">
          {{ place.title }}
        </p>
      </div>
    </horizontal-scrolling>
  </div>
</template>

<script setup>
import SvgNoImage from '../svg/SvgNoImage.vue'
import TourHeading from './TourHeading.vue'
import HorizontalScrolling from '../HorizontalScrolling.vue'

defineProps({
  mainPlaces: {
    type: Array,
    required: true
  }
})
</script>

<script>
export default {
  name: 'TourMainPlaces'
}
</script>
