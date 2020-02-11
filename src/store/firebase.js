import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBirOlLXVJ216Jw0zbW7iEsQeBg5X_x1iA',
  authDomain: 'yale-game-study.firebaseapp.com',
  databaseURL: 'https://yale-game-study.firebaseio.com',
  projectId: 'yale-game-study',
  storageBucket: 'yale-game-study.appspot.com',
  messagingSenderId: '250533185262',
};


const app = firebase.initializeApp(config);
/* eslint-disable */
export { app };
