import { app as fb } from '../firebase';
import Store from '../index';


let ref = {};

// initial state
const initState = {
  date: new Date(),
  startTime: false,
  endTime: false,
  rounds: [],
  currentPoints: 0,
  currentRound: 0,
  score: 0,
  scoreChart: false,
  quitLength: 0,
};

const getters = {
  currentNum: (state) => {
    if (state.rounds[state.currentRound] && state.rounds[state.currentRound].length >= 1) {
      return state.rounds[state.currentRound][state.rounds[state.currentRound].length - 1].value;
    }
    return undefined;
  },
  lastNum: (state) => {
    if (state.rounds[state.currentRound] && state.rounds[state.currentRound].length >= 2) {
      return state.rounds[state.currentRound][state.rounds[state.currentRound].length - 2].value;
    }
    return undefined;
  },
};
const actions = {
  init(context) {
    const numbersListRef = fb.database().ref(`subjects/${Store.getters.id}/trials/numbers`);
    ref = numbersListRef.push();
  },
  push(context) {
    ref.set(JSON.parse(JSON.stringify(context.state)));
  },
  chart({ commit, state }, context) {
    const numbersListref = fb.database().ref(`subjects/${Store.getters.id}/trials/numbers`);
    let scores = [];
    numbersListref.once('value').then((snapshot) => {
      scores = Object.entries(snapshot.val()).map(session => session[1].score);
      commit('setChart', scores);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  start(state) {
    state.startTime = new Date().toTimeString();
    state.rounds.push([]);
  },
  end(state, quitTime) {
    state.endTime = new Date().toTimeString();
    state.quitLength = quitTime;
  },
  submitAnswer(state, answer) {
    if (answer ===
      state.rounds[state.currentRound][state.rounds[state.currentRound].length - 1].value +
      state.rounds[state.currentRound][state.rounds[state.currentRound].length - 2].value) {
      state.currentPoints += 1;
      state.rounds[state.currentRound][state.rounds[state.currentRound].length - 1].correct = true;
      state.score += 1;
    } else {
      state.rounds[state.currentRound][state.rounds[state.currentRound].length - 1].correct = false;
    }
  },
  nextNumber(state) {
    let newNumber = Math.floor((Math.random() * 8) + 1);
    if (state.rounds[state.currentRound].length > 0) {
      while (newNumber ===
      state.rounds[state.currentRound][state.rounds[state.currentRound].length - 1].value) {
        newNumber = Math.floor((Math.random() * 8) + 1);
      }
    }
    state.rounds[state.currentRound].push({ value: newNumber });
  },
  setChart(state, scores) {
    state.scoreChart = scores;
  },
  nextRound(state) {
    state.rounds.push([]);
    if (state.currentRound === 0) {
      state.currentPoints = 0;
      state.score = 0;
    }
    state.currentRound += 1;
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
