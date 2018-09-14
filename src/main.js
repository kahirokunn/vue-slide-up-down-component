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
    opened: false,
    animationing: false,
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
      if (this.opened) return {};
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
      if (this.animationing) return;
      if (this.active) {
        this.maxHeight = this.$el.scrollHeight;
        this.animationing = true;
        setTimeout(() => {
          this.opened = true;
          this.animationing = false;
        }, this.duration);
      } else {
        this.opened = false;
        this.maxHeight = this.$el.scrollHeight;
        this.animationing = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.maxHeight = 0;
            this.animationing = false;
          }, 1);
        });
      }
    },
  },
};
