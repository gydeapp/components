<template>
  <the-aside-overlay
    :is-active="modelValue"
    @close="changeAsideState"
  ></the-aside-overlay>

  <aside
    :class="{
      '-translate-x-full': !isActiveAside,
      'lg:translate-x-0': activeForDesktop
    }"
    class="fixed top-0 left-0 bottom-0 z-50 w-[296px] transform bg-[#2C2C2C] transition duration-200 ease-in-out lg:block lg:w-[calc((100vw-var(--max-container-width))/2+var(--max-aside-content-width))]"
  >
    <div class="ml-auto px-5 lg:mr-[72px] lg:w-[220px] lg:px-0 lg:pl-5">
      <header-container class="mb-9">
        <router-link :to="{ name: 'profile' }">
          <svg-logo class="h-5 w-[94px] lg:h-[25px] lg:w-[104px]"></svg-logo>
        </router-link>

        <button-mobile-menu-close
          @click="changeAsideState"
        ></button-mobile-menu-close>
      </header-container>

      <slot></slot>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

import SvgLogo from './svg/SvgLogo.vue'
import TheAsideOverlay from './TheAsideOverlay.vue'
import HeaderContainer from './HeaderContainer.vue'
import ButtonMobileMenuClose from './ButtonMobileMenuClose.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
    required: false
  },
  activeForDesktop: {
    type: Boolean,
    default: false,
    required: false
  }
})

const isActiveAside = computed(() => {
  return props.modelValue
})

function changeAsideState() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<script>
export default {
  name: 'TheAside'
}
</script>
