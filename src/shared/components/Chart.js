export default {
  name: 'GameChart',
  props: ['scores'],
  data() {
    return {
      legends: {},
      path: '',
      xMargin: 0,
      stars: [],
    };
  },
  methods: {
    home() {
      this.$router.push('/home');
    },
  },
  mounted() {
    const legendx = [];
    const legendy = [];
    let max = 0;
    for (let i = 0; i < this.scores.length; i += 1) {
      legendx.push(i + 1);
      if (this.scores[i] > max) {
        max = this.scores[i];
      }
    }
    // max will be moved from 10:1 50:5 100:10, there shouldn't be scores above 100
    let increment = 1;
    if (max > 10) {
      increment = 5;
    }
    if (max > 50) {
      increment = 10;
    }
    if (max > 100) {
      increment = 30;
    }
    if (max > 250) {
      increment = 100;
    }
    for (let j = 10; j >= 0; j -= 1) {
      legendy.push(j * increment);
    }
    this.legends = { x: legendx, y: legendy };
    const xscale = 700 / legendx.length;
    this.xMargin = `${xscale}px`;
    const yscale = 500 / (10 * increment);
    this.scores.forEach((score, index) => {
      if (index === 0) {
        this.path = `M${xscale / 2} ${500 - (score * yscale)}`;
      } else {
        this.path = `${this.path} L${(xscale * (index + 1)) - (xscale / 2)} ${500 - (score * yscale)}`;
      }
      this.stars.push({ x: (xscale * (index + 1)) - (xscale / 2), y: 500 - (score * yscale) });
    });
  },
};
