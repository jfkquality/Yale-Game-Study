export default {
  name: 'InstructionControl',
  props: ['totalSlides'],
  data() {
    return {
      slideCounter: 1,
      slideEnded: false,
    };
  },
  computed: {
    buttonText() {
      if (this.totalSlides === this.slideCounter) {
        return 'Start';
      }
      return 'Next';
    },
  },
  methods: {
    back() {
      if (this.slideCounter > 1) {
        this.slideCounter -= 1;
      } else {
        this.slideCounter = 1;
      }
      this.$emit('back', { slideCounter: this.slideCounter, slideEnded: false });
    },
    next() {
      const result = {};
      if (this.slideCounter < this.totalSlides) {
        this.slideCounter += 1;
        result.slideCounter = this.slideCounter;
        this.$emit('next', result);
      } else {
        this.slideEnded = true;
        this.$emit('start');
      }
    },
    skip() {
      this.slideCounter = this.totalSlides;
      this.$emit('skip', { slideCounter: this.totalSlides, slideEnded: true });
    },
  },
};
