<template>
  <li
    class="relative cursor-pointer last:border-none"
    :class="[
      { 'mb-[10px]': isBordered },
      {
        'border-t border-solid border-[#DADADA] first:border-t-0':
          isBordered && !visible
      }
    ]"
  >
    <div
      class="transition-background flex h-[60px] w-full items-center justify-between"
      :class="{ 'bg-black text-white': visible && isBordered }"
      @click="open"
    >
      <slot name="accordion-trigger"></slot>

      <div
        v-if="chevron"
        class="mr-5 flex-shrink-0 rotate-0 transform transition-transform"
        :class="{ 'rotate-180': visible }"
      >
        <slot name="trigger-icon" :visible="visible"></slot>
      </div>
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div v-show="visible">
        <ul>
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'AppAccordionItem',

  inject: ['Accordion'],

  props: {
    isBordered: {
      type: Boolean,
      default: false
    },
    chevron: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      index: null
    }
  },

  computed: {
    visible() {
      return this.index == this.Accordion.active
    }
  },

  created() {
    this.index = this.Accordion.count++
  },

  methods: {
    open() {
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end(el) {
      el.style.height = ''
    }
  }
}
</script>

<style>
.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
