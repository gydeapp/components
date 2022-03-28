<template>
  <div class="mb-3 flex items-start justify-between">
    <div class="flex">
      <div
        class="shrink-0 h-12 w-12 overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center"
      >
        <img
          v-if="image"
          :src="image"
          class="object-cover h-full w-full"
          alt="Route image"
        />
        <svg-no-image v-else></svg-no-image>
      </div>

      <div class="ml-3">
        <p class="font-semibold leading-5">
          {{ route.place.title }}
        </p>

        <p class="text-sm leading-5 text-gray">
          {{ route.description }}
        </p>
      </div>
    </div>

    <button class="ml-3 shrink-0" type="button" @click="showActionModal">
      <svg-dots></svg-dots>
    </button>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";

import SvgDots from "../svg/SvgDots.vue";
import SvgNoImage from "../svg/SvgNoImage.vue";
import TourProgramRouteModal from "./TourProgramRouteModal.vue";

const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});

const showModal = inject("$showModal");

const image = computed(() => {
  if (props.route.image) {
    return props.route.image;
  } else {
    return props.route.place.photo;
  }
});

function showActionModal() {
  showModal({
    component: TourProgramRouteModal,
    props: {
      place: props.route.place,
      image: props.route.place.photo,
      description: props.route.description
    },
  });
}
</script>

<script>
export default {
  name: "TourProgramRoute",
};
</script>
