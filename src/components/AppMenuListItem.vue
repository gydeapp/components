<template>
  <li class="mb-2 last:mb-0">
    <router-link
      class="navigation-link flex h-9 items-center opacity-30"
      :to="to"
    >
      <svg-base class="mr-4" height="18" width="20">
        <component :is="icon"></component>
      </svg-base>

      <span
        class="font-gilroy font-semibold -tracking-02 text-white lg:text-sm"
      >
        <slot></slot>
      </span>
    </router-link>
  </li>
</template>

<script setup>
import SvgBase from './svg/SvgBase.vue'

defineProps({
  to: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
})
</script>

<script>
export default {
  name: 'AppMenuListItem'
}
</script>

<style>
.navigation-link svg {
  fill: #fff;
  stroke: #fff;
}

.navigation-link.router-link-active svg {
  fill: var(--main-color);
  stroke: var(--main-color);
}

.navigation-link.router-link-active {
  opacity: 1;
}
</style>
