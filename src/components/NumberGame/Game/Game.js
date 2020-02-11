import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';


const audio = new Audio('/static/errorsound.wav');
export default {
  name: 'NumberGameDisplay',
  data() {
    return {
      missedCount: 0,
      submitMade: false,
      roundTimeout: {},
      numberInterval: {},
      intermission: false,
      currentSubmit: 0,
      complete: false,
      paused: false,
      pauseCounter: 0,
      pauseTimer: {},
      currentDelay: 0,
      round2Start: 0,
      numShownCount: 0,
    };
  },
  computed: {
    ...mapState('numbers', {
      points: state => state.currentPoints,
      round: state => state.currentRound,
      scoreChart: state => state.scoreChart,
    }),
    ...mapGetters({
      currentNumber: 'numbers/currentNum',
      lastNumber: 'numbers/lastNum',
    }),
  },
  methods: {
    ...mapActions({
      init: 'numbers/init',
      push: 'numbers/push',
      chart: 'numbers/chart',
    }),
    ...mapMutations({
      start: 'numbers/start',
      end: 'numbers/end',
      submitNumber: 'numbers/submitAnswer',
      requestNumber: 'numbers/nextNumber',
      nextRound: 'numbers/nextRound',
    }),
    submit(number) {
      this.$store.commit('numbers/submitAnswer', number);
      this.submitMade = number;
      this.missedCount = 0;
      if (number !== this.currentNumber + this.lastNumber) {
        audio.play();
      }
      this.numShownCount = 1;
    },
    newNumber(number) {
      this.numShownCount++;
      if (!this.submitMade && this.numShownCount > 2) {
        audio.play();
        this.missedCount = this.missedCount + 1;
      } 
      if (this.missedCount >= 5) {
        this.paused = true;
        this.missedCount = 0;
        this.pauseCounter = this.pauseCounter + 3000;
        clearInterval(this.numberInterval);
        this.pauseTimer = setTimeout(() => {
          this.paused = false;
          this.numberInterval = setInterval(() => {
            this.newNumber();
          }, this.currentDelay);
        }, 3000);
        this.numShownCount = 1;
      }
      this.submitMade = false;
      this.requestNumber();
    },
    practiceRound() {
      this.numShownCount = 0;
      this.intermission = false;
      this.roundTimeout = setTimeout(() => {
        this.pauseLoop('first');
      }, 60000);
      this.currentDelay = 3000;
      this.numberInterval = setInterval(() => {
        this.newNumber();
      }, 3000);
    },
    pauseLoop(nextIntermission) {
      if (this.pauseCounter > 0) {
        this.pauseTimer = setTimeout(() => {
          this.pauseLoop(nextIntermission);
        }, this.pauseCounter);
        this.pauseCounter = 0;
      } else if (nextIntermission === 'end') {
        clearInterval(this.numberInterval);
        this.end();
        this.push().then(() => {
          this.chart().then(() => {
            this.complete = true;
          });
        });
      } else if (nextIntermission) {
        clearInterval(this.numberInterval);
        this.intermissionStarter(nextIntermission);
        this.nextRound();
      } else {
        clearInterval(this.numberInterval);
        this.firstRoundB();
      }
    },
    intermissionStarter(stage) {
      this.missedCount = 0;
      this.intermission = stage;
    },
    firstRound() {
      this.numShownCount = 0;
      this.intermission = false;
      this.roundTimeout = setTimeout(() => {
        this.pauseLoop(false);
      }, 60000);
      this.currentDelay = 3000;
      clearInterval(this.numberInterval);
      this.numberInterval = setInterval(() => {
        this.newNumber();
      }, 3000);
    },
    firstRoundB() {
      this.roundTimeout = setTimeout(() => {
        this.pauseLoop('second');
      }, 120000);
      this.currentDelay = 2000;
      clearInterval(this.numberInterval);
      this.numberInterval = setInterval(() => {
        this.newNumber();
      }, 2000);
    },
    secondRound() {
      this.numShownCount = 0;
      this.round2Start = Date.now();
      this.intermission = false;
      this.roundTimeout = setTimeout(() => {
        this.pauseLoop('end');
      }, 420000);
      this.currentDelay = 1500;
      clearInterval(this.numberInterval);
      this.numberInterval = setInterval(() => {
        this.newNumber();
      }, 1500);
    },
    quit() {
      clearInterval(this.numberInterval);
      clearTimeout(this.roundTimeout);
      this.end(Date.now() - this.round2Start);
      this.push().then(() => {
        this.chart().then(() => {
          this.complete = true;
        });
      });
    },
    inputDisabled(number) {
      if (this.paused) {
        return true;
      }
      return !((this.currentNumber && this.lastNumber) && this.submitMade !== number);
    },
    home() {
      this.$router.push('/home');
    },
  },
  mounted() {
    if (!this.scoreChart) {
      this.start();
      this.init();
    } else {
      this.complete = true;
    }
  },
  created() {
    if (!this.scoreChart) {
      this.practiceRound();
    } else {
      this.complete = true;
    }
  },
};
