<template>
  <div
    ref="bottomSheet"
    :style="{
      'pointer-events':
        backgroundClickable && clickToClose == false ? 'none' : 'all',
    }"
    :class="[
      'bottom-sheet',
      {
        opened,
        closed: !opened,
        moving,
      },
    ]"
    v-on="handlers"
  >
    <div
      v-if="overlay"
      class="bottom-sheet__backdrop"
      :style="{ background: overlayColor }"
    />
    <div
      ref="bottomSheetCard"
      :style="[
        { bottom: cardP + 'px', maxWidth, maxHeight },
        { height: isFullScreen ? '100%' : 'auto' },
        { 'pointer-events': 'all' },
      ]"
      :class="['bottom-sheet__card', { stripe }]"
    >
      <div
        ref="pan"
        class="flex items-center justify-center"
        :class="[title ? 'h-[50px] border-b border-[#DADADA]' : 'pt-2 pb-5']"
      >
        <p v-if="title" class="font-semibold">
          {{ title }}
        </p>

        <div v-else class="h-[3px] w-10 rounded-full bg-gray"></div>
      </div>

      <div
        ref="bottomSheetCardContent"
        :style="{ height: contentH }"
        :class="[
          overflow ? 'overflow-y-scroll pb-24' : 'overflow-y-hidden pb-0',
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from "hammerjs";

export default {
  name: "VueBottomSheet",

  props: {
    overlay: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: String,
      default: "600px",
    },
    maxHeight: {
      type: String,
      default: "98%",
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    swipeAble: {
      type: Boolean,
      default: true,
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: [null, String],
      default: null,
    },
    overflow: {
      type: Boolean,
      default: false,
    },
    overlayColor: {
      type: String,
      default: "#24232380",
    },
    backgroundScrollable: {
      type: Boolean,
      default: false,
    },
    backgroundClickable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["closed", "opened"],

  data() {
    return {
      inited: false,
      opened: false,
      contentH: "auto",
      hammer: {
        pan: null,
        content: null,
      },
      contentScroll: 0,
      cardP: null,
      cardH: null,
      moving: false,
      stripe: 0,
      handlers: {
        mousedown: this.clickOnBottomSheet,
        touchstart: this.clickOnBottomSheet,
      },
    };
  },

  watch: {
    sheet(value) {
      if (!value || value === "deactivated") {
        this.close();
      }
    },
  },

  computed: {
    sheet() {
      return this.$route.query.sheet || "deactivated";
    },
  },

  onUnmounted() {
    this.close();
  },

  beforeUnmount() {
    this.hammer?.pan?.destroy();
    this.hammer?.content?.destroy();
  },

  methods: {
    isIphone() {
      let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
      let aspect = window.screen.width / window.screen.height;
      return iPhone && aspect.toFixed(3) === "0.462";
    },
    move(event, type) {
      if (this.swipeAble) {
        let delta = -event.deltaY;
        if (
          (type === "content" && event.type === "panup") ||
          (type === "content" &&
            event.type === "pandown" &&
            this.contentScroll > 0)
        ) {
          this.$refs.bottomSheetCardContent.scrollTop =
            this.contentScroll + delta;
        } else if (["panup", "pandown"].includes(event.type)) {
          this.moving = true;
          if (event.deltaY > 0) {
            this.cardP = delta;
          }
        }
        if (event.isFinal) {
          this.contentScroll = this.$refs.bottomSheetCardContent.scrollTop;
          this.moving = false;
          if (this.cardP < -30) {
            this.opened = false;
            this.cardP = -this.cardH - this.stripe;
            document.body.style.overflow = "";
            this.$emit("closed");
          } else {
            this.cardP = 0;
          }
        }
      }
    },
    init() {
      return new Promise((resolve) => {
        this.contentH = "auto";
        this.stripe = this.isIphone() ? 20 : 0;
        this.cardH = this.$refs.bottomSheetCard.clientHeight;
        this.contentH = `${this.cardH - this.$refs.pan.clientHeight}px`;
        this.$refs.bottomSheetCard.style.maxHeight = this.maxHeight;
        this.cardP = -this.cardH - this.stripe;
        if (!this.inited) {
          this.inited = true;
          let options = {
            recognizers: [
              [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
            ],
          };
          this.hammer.pan = new Hammer(this.$refs.pan, options);
          this.hammer.pan.on("panstart panup pandown panend", (e) => {
            this.move(e, "pan");
          });
        }
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    open() {
      this.init().then(() => {
        this.opened = true;
        this.cardP = 0;
        if (!this.$props.backgroundScrollable) {
          document.body.style.overflow = "hidden";
        }

        this.setQuery("active");
        this.$emit("opened");
      });
    },
    close() {
      this.opened = false;
      this.cardP = -this.cardH - this.stripe;
      document.body.style.overflow = "";
      this.removeQuery(undefined);
      this.$emit("closed");
    },
    setQuery(state) {
      this.$router.push({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          sheet: state,
        },
      });
    },
    removeQuery(state) {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          sheet: state,
        },
      });
    },
    clickOnBottomSheet(event) {
      if (this.clickToClose) {
        if (
          event.target.classList.contains("bottom-sheet__backdrop") ||
          event.target.classList.contains("bottom-sheet")
        ) {
          this.close();
        }
      }
    },
  },
};
</script>

<style>
.bottom-sheet {
  z-index: 99;
  transition: all 0.4s ease;
  position: relative;
}

.bottom-sheet__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
}

.bottom-sheet__card {
  width: 100%;
  position: fixed;
  background: white;
  border-radius: 15px 15px 0 0;
  left: 50%;
  z-index: 9999;
  margin: 0 auto;
  transform: translate(-50%, 0);
  transition: bottom 0.3s ease;
}

.bottom-sheet__card.stripe {
  padding-bottom: 20px;
}

.bottom-sheet.closed {
  opacity: 0;
  visibility: hidden;
}

.bottom-sheet.closed .bottom-sheet__backdrop {
  animation: hide 0.3s ease;
}

.bottom-sheet.moving .bottom-sheet__card {
  transition: none;
}

.bottom-sheet.opened {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bottom-sheet.opened .bottom-sheet__backdrop {
  animation: show 0.3s ease;
  opacity: 1;
  visibility: visible;
}

@keyframes show {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
