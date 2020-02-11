import * as firebase from 'firebase';
import { app as fb } from '../firebase';
import Store from '../index';
import Router from '../../router/index';


// initial state
const state = {
  info: {},
  loggedIn: false,
  id: 0,
};

// getters
const getters = {
  info: state => state.info,
  loggedIn: state => state.loggedIn,
  group: state => state.info.group,
  id: state => state.id,
};

// actions
const actions = {
  login({ commit, state }, payload) {
    const id = payload.id;
    const password = payload.password;
    fb.auth().signInWithEmailAndPassword(`${id}@yale.test`, password).catch((error) => { // this will need to be changed to signInWithCustomToken(token) in a later change in order to track user changes over trials
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  },
  logout({ commit, state }) {
    fb.auth().signOut().catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    location.reload();
  },
  register({ commit, state }, payload) {
    console.log(payload);
    const email = payload.email;
    const password = payload.password;
    const group = payload.group;
    fb.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      const userInfo = fb.database().ref(`users/${user.uid}/info/group`);
      userInfo.set(group);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  },
  setGroup({ commit, state }, group) {
    if (state.loggedIn) {
      const userInfo = fb.database.ref(`users/${state.authInfo.uid}/info`);
      userInfo.update(group);
    } else {
      const errorMessage = 'Not Logged In';
    }
  },
};

// mutations
/* eslint-disable no-param-reassign */

const mutations = {
  userChange(state, user) {
    state.info = user.info;
    state.loggedIn = user.loggedIn;
    state.id = user.id;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
