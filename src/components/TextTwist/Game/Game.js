import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';


export default {
  name: 'textTwistGameDisplay',
  data() {
    return {
      entry: '',
      modifiedWord: '',
      timer: {},
      countdown: {},
      complete: false,
      countdownMin: 2,
      countdownSec: 0,
      pause: false,
    };
  },
  computed: {
    ...mapState('textTwist', {
      scoreChart: state => state.scoreChart,
      points: state => state.score,
      counter: state => state.currentWord,
    }),
    ...mapGetters({
      word: 'textTwist/currWord',
    }),
  },
  methods: {
    ...mapActions({
      init: 'textTwist/init',
      push: 'textTwist/push',
      checkWord: 'textTwist/checkWord',
      chart: 'textTwist/chart',
    }),
    ...mapMutations({
      start: 'textTwist/start',
      end: 'textTwist/end',
      newWord: 'textTwist/newWord',
    }),
    gameLoop() {
      this.timer = setInterval(() => {
        if (this.counter < 13) {
          this.pause = false;
          this.clear();
          this.newWord();
          this.countdownMin = 2;
          this.countdownSec = 0;
          this.clear();
        } else {
          this.pause = false;
          clearInterval(this.timer);
          clearInterval(this.countdown);
          this.end();
          this.push().then(() => {
            this.chart().then(() => {
              this.complete = true;
            });
          });
        }
      }, 130000);
      this.countdown = setInterval(() => {
        if (this.countdownSec > 0) {
          this.countdownSec = this.countdownSec - 1;
        } else if (this.countdownMin > 0) {
          this.countdownSec = 59;
          this.countdownMin = this.countdownMin - 1;
        } else {
          this.pause = true;
        }
        if (this.countdownSec === 0 && this.countdownMin === 0) {
          this.pause = true;
        }
      }, 1000);
    },
    select(e) {
      console.log('select called');
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.keyCode === 13 || e.which === 13) {
        this.checkWord(this.entry);
        this.entry = '';
        this.resetModified();
      } else if (e.keyCode === 8 || e.which === 8) {
        this.back();
      } else {
        this.addGuess(String.fromCharCode(e.keyCode));
      }
    },
    addGuess(entry) {
      const index = this.modifiedWord.indexOf(entry.toLowerCase());
      if (index !== -1) {
        this.modifiedWord = `${this.modifiedWord.slice(0, index)}_${this.modifiedWord.slice(index + 1)}`;
        this.entry = `${this.entry}${entry.toLowerCase()}`;
      }
    },
    clear() {
      this.entry = '';
      this.resetModified();
    },
    resetModified() {
      this.modifiedWord = this.word.sourceLetters;
    },
    twist() {
      let twistedWord = '';
      let temp = this.modifiedWord;
      for (let i = 0; i < this.modifiedWord.length; i += 1) {
        const pulledCharIndex = Math.floor(Math.random() * (temp.length));
        twistedWord = `${twistedWord}${temp[pulledCharIndex]}`;
        temp = `${temp.slice(0, pulledCharIndex)}${temp.slice(pulledCharIndex + 1)}`;
      }
      this.modifiedWord = twistedWord;
    },
    back() {
      if (this.entry.length >= 1) {
        const lastChar = this.entry.slice(-1);
        this.entry = this.entry.slice(0, -1);
        console.log(lastChar);
        this.modifiedWord = this.modifiedWord.replace('_', lastChar);
      }
    },
    home() {
      this.$router.push('/home');
    },
  },
  created() {
    if (!this.scoreChart) {
      this.start();
      this.init();
      this.gameLoop();
      this.resetModified();
      window.addEventListener('keydown', this.select);
    } else {
      this.complete = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.select);
  },
};
