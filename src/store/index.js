import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { app as fb, gProvider } from './firebase';
import user from './modules/user';
import lottery from './modules/lottery';
import numbers from './modules/numbers';
import shapes from './modules/shapes';
import textTwist from './modules/textTwist';
import authPlugin from './modules/authPlugin';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    user,
    lottery,
    numbers,
    shapes,
    textTwist,
  },
  strict: debug,
  plugins: [createLogger(), authPlugin()],
});

export default store;
