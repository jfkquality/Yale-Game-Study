// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import InstructionControl from './shared/components/InstructionControls.vue';
import Chart from './shared/components/Chart.vue';
import store from './store';


Vue.config.productionTip = false;

Vue.component('instructionControl', InstructionControl);
Vue.component('scoreChart', Chart);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
