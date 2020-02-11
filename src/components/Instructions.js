export default {
  data() {
    return {
      slideCounter: 1,
      slideEnded: false,
    };
  },
  props: ['totalSlides'],
  methods: {
    controlSlides(value) {
      this.slideCounter = value.slideCounter;
      if (value.slideEnded) {
        this.slideEnded = value.slideEnded;
      }
    },
    startGame() {
      this.$emit('startGame');
    },
  },
};
