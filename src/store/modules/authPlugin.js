import { app as fb } from '../firebase';
import router from '../../router/index';

export default function createFirebaseAuthPlugin() {
  return (store) => {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfo = fb.database().ref(`users/${user.uid}/info/group`);
        userInfo.once('value').then((snapshot) => {
          store.commit('userChange', {
            loggedIn: true,
            info: snapshot.val(),
            id: user.email.slice(0, -10),
          });
          console.log(router);
          router.push('/home');
        });
        // User is signed in.
      } else {
        // User is signed out.
        store.commit('userChange', {
          loggedIn: false,
          info: {},
          id: 0,
        });
        router.push('/');
      }
    });
  };
}
