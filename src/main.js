export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 500,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },

  data: () => ({
    maxHeight: 0,
    offsetHeight: 0,
  }),

  render(h) {
    return h(
      this.tag,
      {
        style: this.style,
        ref: 'container',
      },
      this.$slots.default,
    );
  },

  mounted() {
    this.layout();

    window.addEventListener('resize', this.layout);
  },

  destroyed() {
    window.removeEventListener('resize', this.layout);
  },

  watch: {
    active() {
      this.layout();
    },
  },

  computed: {
    style() {
      return {
        overflow: 'hidden',
        'transition-property': 'height',
        height: `${this.maxHeight}px`,
        'transition-duration': `${this.duration}ms`,
      };
    },
  },

  methods: {
    layout() {
      if (this.active) {
        this.maxHeight = this.$el.offsetHeight;
      } else {
        this.maxHeight = 0;
      }
    },
  },
};
