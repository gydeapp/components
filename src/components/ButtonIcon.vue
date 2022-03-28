<script>
import { h, resolveComponent } from "vue";

export default {
  name: "ButtonIcon",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "button",
      validator: function (value) {
        return ["button", "router-link", "a"].indexOf(value) !== -1;
      },
    },
  },

  emits: ["click"],

  data() {
    return {
      defaultClass: "h-11 w-11 flex items-center justify-center",
    };
  },

  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },

  render() {
    const tagDefaultClass =
      "h-11 w-11 flex items-center justify-center cursor-pointer";

    if (this.tag === "button") {
      return h(
        this.tag,
        {
          type: "button",
          class: [tagDefaultClass],
          onClick: ($event) => this.handleClick($event),
        },
        this.$slots.default()
      );
    } else if (this.tag === "a") {
      return h(
        this.tag,
        {
          class: [tagDefaultClass],
        },
        this.$slots.default()
      );
    } else {
      return h(
        resolveComponent(this.tag),
        {
          class: [tagDefaultClass],
        },
        this.$slots.default
      );
    }
  },
};
</script>
