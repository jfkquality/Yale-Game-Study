import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  name: 'Game',
  data() {
    return {
      trialCounter: 1,
      started: false,
      selected: undefined,
      timer: 0,
      listener: {},
      endSlide: 0,
      complete: false,
      safeLeft: true,
    };
  },
  computed: {
    ...mapState('lottery', ['date', 'startTime', 'endTime', 'turns', 'currentTurn', 'autoLossCount', 'score', 'scoreChart', 'scored', 'session', 'percents']), // scored means they're done
  },
  methods: {
    ...mapMutations({
      start: 'lottery/start',
      end: 'lottery/end',
      closeMove: 'lottery/closeMove',
    }),
    ...mapActions({
      init: 'lottery/init',
      push: 'lottery/push',
      chart: 'lottery/chart',
    }),
    randomChip(chipType, index) {
      // as per the design spec the chip order is 1,2,3,1,2,3,....
      const constant = Math.floor(index / 3);
      const random = (index - (constant * 3)) + 1;
      const image = `/static/lottery/${chipType}_chip_${random}.png`;
      return image;
    },
    select(e) {
      const charCode = e.keyCode || e.which;
      if (charCode === 70 && !this.scored) { // f
        if (this.safeLeft) {
          this.selected = 'safe';
        } else {
          this.selected = 'lottery';
        }
      } else if (charCode === 74 && !this.scored) { // j
        if (this.safeLeft) {
          this.selected = 'lottery';
        } else {
          this.selected = 'safe';
        }
      } else if (charCode === 32 && this.selected) { // space bar
        this.confirmMove();
      } else if (charCode === 32 && this.scored) {
        if (this.endSlide === 5) {
          this.complete = true;
        } else if (this.endSlide === 2) {
          this.endGame();
          if (this.scored.spread.gray > 0) {
            this.endSlide += 1;
          } else {
            this.endSlide += 2;
          }
        } else {
          this.endSlide += 1;
        }
      }
    },
    confirmMove() {
      const result = { choice: this.selected, timeToChoose: this.timer };
      this.safeLeft = (Math.floor(Math.random() * 2) === 0);
      this.closeMove(result);
      this.selected = undefined;
    },
    endGame() {
      this.end();
      this.push().then(() => {
        this.chart().then(() => {
        });
      });
    },
    home() {
      this.$router.push('/home');
    },
  },
  mounted() {
    this.start();
    this.init();
    this.started = true;
  },
  created() {
    if (this.scoreChart) {
      this.complete = true;
    }
    window.addEventListener('keydown', this.select);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.select);
  },
};
