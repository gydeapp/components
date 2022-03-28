<template>
  <ul class="mt-[10px] px-[15px]">
    <li v-for="(apartment, index) in apartments" :key="index" class="mb-[15px]">
      <p class="font-semibold">
        {{ apartment.city }} /
        <span class="font-normal">
          {{ apartment.cnt_nights }}
          {{ apartment.cnt_nights === 1 ? 'night' : 'nights' }}
        </span>
      </p>

      <a
        v-for="(option, optionIndex) in apartment.options"
        :key="optionIndex"
        class="mt-[15px] flex cursor-pointer items-start"
        :href="option.url"
        target="_blank"
      >
        <div
          class="mr-[18px] flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-gray-200"
        >
          <img
            v-if="option.image"
            class="h-[50px] w-[50px] object-cover"
            :src="option.image"
            :alt="option.title"
          />

          <svg-no-image v-else></svg-no-image>
        </div>

        <p
          class="text-sm font-semibold leading-[18px]"
        >
          {{ option.title }}<br />

          <span v-if="option.url" class="font-normal text-gray">
            {{ option.note || option.canonical }}
          </span>
        </p>
      </a>
    </li>
  </ul>
</template>

<script setup>
import SvgNoImage from '../svg/SvgNoImage.vue'

defineProps({
  apartments: {
    type: Array,
    required: true
  }
})
</script>

<script>
export default {
  name: 'TourApartments'
}
</script>
