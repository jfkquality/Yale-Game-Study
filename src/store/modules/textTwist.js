import Vue from 'vue';
import { app as fb } from '../firebase';
import Store from '../index';


let ref = {};
let dictionary = '';

// initial state
const initState = {
  date: new Date(),
  startTime: false,
  endTime: false,
  words: [],
  currentWord: 0,
  score: 0,
  scoreChart: false,
};

const getters = {
  currWord: state => state.words[state.currentWord],
};
const actions = {
  init() {
    const textListRef = fb.database().ref(`subjects/${Store.getters.id}/trials/textTwist`);
    ref = textListRef.push();
  },
  push(context) {
    ref.set(JSON.parse(JSON.stringify(context.state)));
  },
  checkWord({ commit, state }, word) {
    const saveIndex = state.currentWord;
    if (word.length >= 2) {
      let alreadyTried = false;
      state.words[state.currentWord].attempts.forEach((attempt) => {
        if (attempt.word === word) {
          alreadyTried = true;
        }
      });
      if (!alreadyTried) {
        if (dictionary.indexOf(`,${word},`) >= 1) {
          commit('wordSuccess', { word, saveIndex });
          return;
        }
      }
    }
    commit('wordFail', { word, saveIndex });
  },
  chart({ commit }) {
    const textListRef = fb.database().ref(`subjects/${Store.getters.id}/trials/textTwist`);
    let scores = [];
    textListRef.once('value').then((snapshot) => {
      scores = Object.entries(snapshot.val()).map(session => session[1].score);
      commit('setChart', scores);
    });
    /*
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    }); */
  },
};
const wordList = ['nrsoems', 'esydyso', 'ocnraco', 'kmrilse', 'eidpset', 'ppigeen', 'utiuspr',
  'eielnvd', 'lltuges', 'desttle', 'ndfgini', 'pemesar', 'beurekr', 'dnmalan', 'omhyonm',
  'afdsgin', 'lamladr', 'nunkdre', 'hlyhras', 'toeeddx', 'nojtire', 'btlseur', 'sbadler',
  'rknceis', 'rlunody', 'etrnusc', 'lsiinlt', 'aoulftl'];

/* eslint-disable no-param-reassign */
const mutations = {
  start(state) {
    Vue.http.get('/static/wordsEn.txt').then((response) => {
      dictionary = response.bodyText;
    }, (error) => {
      console.log(error);
    });
    state.startTime = new Date().toTimeString();
    let counter = 28;
    while (counter > 14) {
      const index = Math.floor(Math.random() * counter);
      state.words.push({ sourceLetters: wordList[index], attempts: [], score: 0 });
      wordList.splice(index, 1);
      counter -= 1;
    }
  },
  end(state) {
    state.endTime = new Date().toTimeString();
  },
  newWord(state) {
    state.currentWord += 1;
  },
  wordFail(state, { word, saveIndex }) {
    state.words[saveIndex].attempts.push({ word, success: false });
  },
  wordSuccess(state, { word, saveIndex }) {
    state.score += 1;
    state.words[saveIndex].score += 1;
    state.words[saveIndex].attempts.push({ word, success: true });
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
