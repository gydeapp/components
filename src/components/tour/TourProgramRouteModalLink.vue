<template>
  <a
    class="flex items-center justify-center w-[45px] h-[45px] bg-[#F0F0F0] rounded-xl"
    :class="{ 'opacity-50 pointer-events-none': !href }"
    :href="href"
    target="_blank"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "TourProgramRouteModalLink",

  props: {
    href: {
      type: String,
      required: false,
    },
  },
};
</script>
