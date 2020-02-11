import { app as fb } from '../firebase';
import Store from '../index';


let ref = {};
let generatedTurns = [];
// initial state
const initState = {
  date: new Date(),
  startTime: false,
  endTime: false,
  turns: [],
  currentTurn: {},
  scoreChart: false,
  scored: false,
  percents: {},
  session: 0,
};

const getters = {

};
/* eslint-disable no-param-reassign */
const actions = {
  init(context) {
    const lotteryListRef = fb.database().ref(`subjects/${Store.getters.id}/trials/lottery`);
    lotteryListRef.once('value').then((snapshot) => {
      context.commit('setSession', Object.entries(snapshot.val()).length + 1);
    });
    ref = lotteryListRef.push();
  },
  push(context) {
    ref.set(JSON.parse(JSON.stringify(context.state)));
  },
  chart({ commit, state }) {
    const lotteryListref = fb.database().ref(`subjects/${Store.getters.id}/trials/lottery`);
    let scores = [];
    lotteryListref.once('value').then((snapshot) => {
      scores = Object.entries(snapshot.val()).map((session) => {
        if (session[1].scored.win) {
          if (session[1].scored.choice === 'lottery') {
            return session[1].score;
          }
          return 61;
        }
        return 56;
      });
      commit('setChart', scores);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  },
};

const spreadTypes = [
  { gray: 24, red: 38, blue: 38 },
  { gray: 50, red: 25, blue: 25 },
  { gray: 74, red: 13, blue: 13 },
  { gray: 0, red: 50, blue: 50 },
];
/* eslint-disable no-param-reassign */
const mutations = {
  start(state) {
    generatedTurns = [];
    state.startTime = new Date().toTimeString();
    // generate spread
    for (let i = 0; i < 4; i += 1) {
      for (let j = 5; j <= 18; j += 1) {
        generatedTurns.push({ spread: spreadTypes[i],
          value: j,
          red: (Math.floor(Math.random() * 2) === 1) });
      }
    }
    let counter = 56;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);

      counter -= 1;
      const temp = generatedTurns[counter];
      generatedTurns[counter] = generatedTurns[index];
      generatedTurns[index] = temp;
    }
    state.currentTurn = generatedTurns.pop();
  },
  setSession(state, session) {
    state.session = session;
  },
  end(state) {
    state.endTime = new Date().toTimeString();
  },
  closeMove(state, result) {
    state.turns = [...state.turns,
      {
        ...state.currentTurn,
        choice: result.choice,
        timeToChoose: result.time,
      }];
    if (generatedTurns.length > 0) {
      state.currentTurn = generatedTurns.pop();
    } else if (state.session >= 4) { //  finalize the game
      let lotteryCounter = 0;
      state.turns.forEach((turn) => {
        if (turn.choice === 'lottery') {
          lotteryCounter += 1;
        }
      });
      state.percents = { safe: ((56 - lotteryCounter) / 56) * 100,
        lottery: (lotteryCounter / 56) * 100 };
      let graysPresent = false;
      let index;
      let selectedTrial;
      while (!graysPresent) {
        index = Math.floor(Math.random() * 56);
        selectedTrial = state.turns[index];
        graysPresent = selectedTrial.spread.gray > 0;
      }
      selectedTrial.index = index;
      let blue = selectedTrial.spread.blue;
      if (selectedTrial.spread.gray > 0) { // if there are grays assign them
        const rand = Math.floor(Math.random() * selectedTrial.spread.gray);
        blue += rand;
      }
      selectedTrial.finalSpread = { blue, red: 100 - blue };
      const choice = Math.floor(Math.random() * 100);
      const blueCorrect = choice <= blue;
      selectedTrial.choseBlue = blueCorrect;
      if (selectedTrial.choice === 'lottery') {
        if (!selectedTrial.red) { // blue had points
          selectedTrial.win = blueCorrect;
        } else { // red had points
          selectedTrial.win = !blueCorrect;
        }
        state.scored = selectedTrial;
      } else {
        selectedTrial.win = true;
        state.scored = selectedTrial;
      }
    } else { // rigged
      let lotteryCounter = 0;
      state.turns.forEach((turn) => {
        if (turn.choice === 'lottery') {
          lotteryCounter += 1;
        }
      });
      state.percents = { safe: ((56 - lotteryCounter) / 56) * 100,
        lottery: (lotteryCounter / 56) * 100 };
      if (lotteryCounter >= 28) { // lottery chosen most
        const possibleTrials = [];
        state.turns.forEach((turn, index) => {
          if (turn.choice === 'lottery' && turn.value > 5 && turn.spread.gray > 0) {
            turn.index = index;
            possibleTrials.push(turn);
          }
        });
        const selectedTrial = possibleTrials[Math.floor(Math.random() * possibleTrials.length)];
        let blue = selectedTrial.spread.blue;
        if (selectedTrial.spread.gray > 0) { // if there are grays assign them
          const rand = Math.floor(Math.random() * selectedTrial.spread.gray);
          blue += rand;
        }
        selectedTrial.finalSpread = { blue, red: 100 - blue };
        selectedTrial.win = false;
        selectedTrial.choseBlue = selectedTrial.red;
        state.scored = selectedTrial;
      } else { // safe chosen most
        const possibleTrials = [];
        state.turns.forEach((turn, index) => {
          if (turn.choice !== 'lottery' && turn.value > 5 && turn.spread.gray > 0) {
            turn.index = index;
            possibleTrials.push(turn);
          }
        });
        const selectedTrial = possibleTrials[Math.floor(Math.random() * possibleTrials.length)];
        let blue = selectedTrial.spread.blue;
        if (selectedTrial.spread.gray > 0) { // if there are grays assign them
          const rand = Math.floor(Math.random() * selectedTrial.spread.gray);
          blue += rand;
        }
        selectedTrial.finalSpread = { blue, red: 100 - blue };
        selectedTrial.win = true;
        selectedTrial.choseBlue = !selectedTrial.red;  // ensure the lottery wins
        state.scored = selectedTrial;
      }
    }
    if (state.scored.win) {
      state.score = ((state.scored.choice === 'lottery') ? 56 + state.scored.value : 56 + 5);
    } else {
      state.score = 56;
    }
  },
  setChart(state, scores) {
    state.scoreChart = scores;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
