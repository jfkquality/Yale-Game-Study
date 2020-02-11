import { app as fb } from '../firebase';
import Store from '../index';

let ref = {};

// initial state
const initState = {
  date: new Date(),
  startTime: false,
  endTime: false,
  trials: [[]],
  shape: {},
  currentTrial: 0,
  currentDelay: 0,
  score: 0,
  scoreChart: false,
};

const getters = {
  trialLength: state => state.trials[state.currentTrial].length,
};
const actions = {
  init() {
    const shapesListRef = fb.database().ref(`subjects/${Store.getters.id}/trials/shapes`);
    ref = shapesListRef.push();
  },
  push(context) {
    console.log('pushing');
    ref.set(JSON.parse(JSON.stringify(context.state)));
  },
  chart({ commit }) {
    const shapesListRef = fb.database().ref(`subjects/${Store.getters.id}/trials/shapes`);
    let scores = [];
    shapesListRef.once('value').then((snapshot) => {
      scores = Object.entries(snapshot.val()).map(session => session[1].score);
      commit('setChart', scores);
    });
    /*
    .catch((error) => {
      errorCode = error.code;
      errorMessage = error.message;
    }); */
  },
};
/* eslint-disable no-param-reassign */
const mutations = {
  start(state) {
    state.startTime = new Date().toTimeString();
  },
  end(state) {
    state.endTime = new Date().toTimeString();
  },
  serveShape(state) {
    if (state.trials[state.currentTrial].length > 63) {
      if (state.currentTrial < 3) {
        state.trials.push([]);
        state.currentTrial += 1;
      }
    }
    if (state.trials[state.currentTrial].length === 0 &&
      (state.currentTrial === 0 || state.currentTrial === 2)) {
      state.currentDelay = 250;
    }
    state.shape = {
      square: (Math.floor(Math.random() * 2) === 0),
      stop: (Math.floor(Math.random() * 4) === 0),
      timer: state.currentDelay };
  },
  resolveShape(state, response) {
    // response = {keyPressed:  , timePressed: }  keyPresed will be false if no key was pressed
    // Store (from the Gsheet) block, trial#, stimulus (shape), signal(sound Y/N)
    // correct(reward points?), response (shape picked or nothing), rt/reaction time, ssd
    if (!state.shape.stop &&
      ((state.shape.square && (response.keyPressed === 70)) ||
      (!state.shape.square && (response.keyPressed === 74)))) {
      // no stop signal and correct key pressed
      if (state.currentTrial >= 2) {
        state.score += 5;
      }
      state.shape.correct = true;
      state.shape.timeTaken = response.timePressed;
      state.shape.key = response.keyPressed;
    } else if (state.shape.stop === false) {
      // no stop signal and wrong key pressed or no key
      state.shape.correct = false;
      state.shape.timeTaken = response.timePressed;
      if (response.keyPressed) {
        state.shape.key = response.keyPressed;
      }
    } else if (state.shape.stop) {
      // stop signal
      if (response.keyPressed) { // make it easier because they messed up
        if (state.currentDelay > 51) {
          state.currentDelay -= 50;
        }
        state.shape.correct = false;
        state.shape.timeTaken = response.timePressed;
        state.shape.key = response.keyPressed;
      } else { // make it harder because they got it right
        if (state.currentTrial >= 2) {
          state.score += 5;
        }
        state.shape.correct = true;
        if (state.currentDelay < 1199) {
          state.currentDelay += 50;
        }
      }
    }
    state.trials[state.currentTrial].push(state.shape);
    state.shape = {};
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
