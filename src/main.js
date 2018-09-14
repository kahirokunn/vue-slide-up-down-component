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
    isInitialized: false,
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
      if (this.active) {
        this.isInitialized = true;
        this.maxHeight = this.$el.scrollHeight;
        setTimeout(() => {
          if (this.active) {
            this.opened = true;
          }
        }, this.duration);
      } else {
        if (!this.isInitialized) {
          this.isInitialized = true;
          return;
        }
        this.opened = false;
        this.maxHeight = this.$el.scrollHeight;
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.active) {
              this.maxHeight = 0;
            }
          }, 1);
        });
      }
    },
  },
};
