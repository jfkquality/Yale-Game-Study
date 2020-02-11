import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
// import Hello from '@/components/Hello';
import Home from '@/components/Home/Home.vue';
import NumberGame from '@/components/NumberGame/NumberGame.vue';
import LotteryGame from '@/components/LotteryGame/LotteryGame.vue';
import TextTwist from '@/components/TextTwist/TextTwist.vue';
import ShapeGame from '@/components/ShapeGame/ShapeGame.vue';
import LoginRegister from '@/components/LoginRegister.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister,
      beforeEnter: (to, from, next) => {
        if (store.state.user.loggedIn) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.state.user.loggedIn) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/number-game',
      name: 'NumberGame',
      component: NumberGame,
      beforeEnter: (to, from, next) => {
        if (store.state.user.loggedIn) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/lottery-game',
      name: 'LotteryGame',
      component: LotteryGame,
      beforeEnter: (to, from, next) => {
        if (store.state.user.loggedIn) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/text-twist',
      name: 'TextTwist',
      component: TextTwist,
      beforeEnter: (to, from, next) => {
        if (store.state.user.loggedIn) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/shape-game',
      name: 'ShapeGame',
      component: ShapeGame,
      beforeEnter: (to, from, next) => {
        if (store.state.user.loggedIn) {
          next();
        } else {
          next('/');
        }
      },
    },
  ],
});
