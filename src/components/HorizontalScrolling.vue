<template>
  <div
    ref="tags"
    class="horizontal-scrolling flex w-full select-none overflow-x-auto"
    :class="{ 'not-scrollable': notScrollable }"
    @mouseup="stopScroll"
    @mouseleave="stopScroll"
    @mousedown="mouseDownHandler"
    @mousemove="mouseMoveHandler"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppHorizontalScrolling',

  props: {
    notScrollable: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      scrollEl: '',
      isDraggable: false,
      pos: { top: 0, left: 0, x: 0, y: 0 }
    }
  },

  mounted() {
    this.scrollEl = this.$refs.tags
  },

  methods: {
    mouseDownHandler(e) {
      this.isDraggable = true

      this.scrollEl.style.cursor = 'grabbing'
      this.scrollEl.style.userSelect = 'none'

      this.pos = {
        left: this.scrollEl.scrollLeft,
        top: this.scrollEl.scrollTop,
        x: e.clientX,
        y: e.clientY
      }
    },
    mouseMoveHandler(e) {
      if (!this.isDraggable) {
        return
      }

      const dx = e.clientX - this.pos.x
      this.scrollEl.scrollLeft = this.pos.left - dx
    },
    stopScroll() {
      this.isDraggable = false
      this.scrollEl.style.cursor = 'grab'
      this.scrollEl.style.removeProperty('user-select')
    }
  }
}
</script>

<style>
.horizontal-scrolling {
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.horizontal-scrolling::-webkit-scrollbar {
  display: none;
}
</style>
