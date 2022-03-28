<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'AppAccordion',

  provide() {
    return {
      Accordion: this.Accordion
    }
  },

  props: {
    activeTab: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      Accordion: {
        count: 0,
        active: null
      }
    }
  },

  created() {
    this.Accordion.active = this.activeTab
  }
}
</script>
