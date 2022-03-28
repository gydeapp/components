<template>
  <swiper
    loop
    :modules="modules"
    :slides-per-view="1"
    :space-between="0"
    :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <div
        class="h-0 w-full bg-cover bg-center"
        style="padding-bottom: 74.7%"
        :style="`background-image: url(${image.image});`"
      ></div>

      <div
        class="flex h-[50px] w-full items-center px-[15px]"
        :style="{ background: image.background }"
      >
        <p class="text-sm font-semibold leading-[18px] text-white">
          {{ image.caption }}
        </p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps({
  images: {
    type: Array,
    required: true
  }
})

const modules = [Pagination, A11y]
</script>

<script>
export default {
  name: 'TourSliderImages'
}
</script>

<style>
.swiper-pagination-bullet {
  width: 6px !important;
  height: 6px !important;
}

.swiper-pagination-bullet {
  background: #fff !important;
  opacity: 0.5 !important;
}

.swiper-pagination-bullet-active {
  opacity: 1 !important;
  background: #fff !important;
}

.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 53px !important;
}
</style>
