<template>
  <div
    class="relative flex h-0 items-center justify-center overflow-hidden rounded-[15px] bg-black pb-[100%]"
    style="padding-bottom: 56.2%"
  >
    <svg
      v-if="!links"
      class="absolute top-1/2 -translate-y-1/2"
      width="48"
      height="34"
      viewBox="0 0 48 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.9982 5.25536C46.725 4.23771 46.1892 3.30967 45.4446 2.56412C44.7 1.81857 43.7727 1.28167 42.7554 1.00714C39.0107 2.04359e-07 24 0 24 0C24 0 8.98929 -2.04359e-07 5.24464 1.00179C4.2269 1.27542 3.29906 1.81203 2.55432 2.55771C1.80957 3.3034 1.27414 4.23191 1.00179 5.25C-2.04359e-07 9 0 16.8214 0 16.8214C0 16.8214 -2.04359e-07 24.6429 1.00179 28.3875C1.55357 30.4554 3.18214 32.0839 5.24464 32.6357C8.98929 33.6429 24 33.6429 24 33.6429C24 33.6429 39.0107 33.6429 42.7554 32.6357C44.8232 32.0839 46.4464 30.4554 46.9982 28.3875C48 24.6429 48 16.8214 48 16.8214C48 16.8214 48 9 46.9982 5.25536ZM19.2321 24V9.64286L31.6607 16.7679L19.2321 24Z"
        fill="white"
      />
    </svg>

    <iframe
      v-else
      class="absolute top-1/2 h-full w-full -translate-y-1/2 rounded-[15px]"
      :src="`https://www.youtube.com/embed/${videoLink}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  links: {
    type: String,
    required: true,
  },
});

const videoLink = computed(() => {
  return props.links.replace("https://youtu.be/", "");
});
</script>

<script>
export default {
  name: "TourVideo",
};
</script>
