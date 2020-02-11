import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';


const audio = new Audio('/static/shapestone.wav');
export default {
  name: 'Game',
  data() {
    return { // sample code
      beepTimeout: {},
      fixation: false,
      blank: false,
      displayShape: false,
      fixDelay: {},
      shapeDelay: {},
      beepDelay: {},
      blankDelay: {},
      blockDelay: {},
      blockCountdown: {},
      shapeTimestamp: 0,
      countdown: 0,
      continued: true,
      complete: false,
      pointsAvailable: false,
    };
  },
  computed: {
    ...mapState('shapes', {
      shape: state => state.shape,
      trial: state => state.currentTrial,
      points: state => state.score,
      scoreChart: state => state.scoreChart,
    }),
    ...mapGetters({
      trialLength: 'shapes/trialLength',
    }),
  },
  watch: {
    trial: (val) => {
      this.pointsAvailable = (val >= 2);
    },
  },
  methods: {
    ...mapActions({
      init: 'shapes/init',
      push: 'shapes/push',
      chart: 'shapes/chart',
    }),
    ...mapMutations({
      start: 'shapes/start',
      end: 'shapes/end',
      requestShape: 'shapes/serveShape',
      commitShape: 'shapes/resolveShape',
    }),
    startGame() {
      this.start();
      this.init();
      this.requestShape();
      this.showFixation();
    },
    showFixation() {
      this.fixation = true;
      this.fixDelay = setTimeout(() => {
        this.fixation = false;
        this.showShape();
      }, 250); // change back to 250
    },
    showShape() {
      this.displayShape = true;
      this.shapeTimestamp = Date.now();
      if (this.shape.stop) {
        this.beepDelay = setTimeout(() => {
          audio.play();
        }, this.shape.timer);
      }
      this.shapeDelay = setTimeout(() =>
      this.endShape({ keyPressed: undefined, timePressed: undefined }), 1250);
    },
    endShape(response) {
      this.displayShape = false;
      clearTimeout(this.shapeDelay);
      this.commitShape(response);
      this.showBlank();
      this.requestShape();
    },
    showBlank() { // this happens before a new shape is requested
      this.blank = true;
      if (this.trialLength > 63) { // change back to 63
        if (this.trial >= 3) {
          this.end();
          this.push().then(() => {
            this.chart().then(() => {
              this.continued = false;
            });
          });
        } else {
          this.continued = false;
        }
      } else {
        this.blankDelay = setTimeout(() => {
          this.blank = false;
          this.showFixation();
        }, 2000);
      }
    },
    nextBlock() {
      this.continued = true;
      if (this.trial >= 3 && this.scoreChart) {
        this.complete = true;
      } else {
        this.countdown = 10;
        this.blockCountdown = setInterval(() => {
          this.countdown -= 1;
        }, 1000);
        this.blankDelay = setTimeout(() => {
          clearInterval(this.blockCountdown);
          this.blank = false;
          this.showFixation();
        }, 11000);
      }
    },
    select(e) {
      if (this.displayShape) {
        const charCode = e.keyCode || e.which;
        this.endShape({ keyPressed: charCode, timePressed: Date.now() - this.shapeTimestamp });
      }
    },
    home() {
      this.$router.push('/home');
    },
  },
  created() {
    if (!this.scoreChart) {
      this.startGame();
      window.addEventListener('keydown', this.select);
    } else {
      this.complete = true;
    }
  },
  beforeDestroy() {
    clearTimeout(this.shapeDelay);
    clearTimeout(this.fixDelay);
    clearTimeout(this.beepDelay);
    clearTimeout(this.blankDelay);
    clearTimeout(this.blockDelay);
    clearInterval(this.blockCountdown);
    clearTimeout(this.beepTimeout);
    window.removeEventListener('keydown', this.select);
  },
};
