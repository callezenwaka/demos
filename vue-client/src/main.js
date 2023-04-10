import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './store';
import firebase from '@/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './style.css';
const auth = getAuth(firebase);

onAuthStateChanged(auth, async user => {
  if (user && user.emailVerified) {
    const idTokenResult = await user.getIdTokenResult();
    const { claims: { entity, name, permissions } } = await user.getIdTokenResult();

    if (idTokenResult && idTokenResult.claims) {
      await store.dispatch('setProfile', { ...user, entity, name, permissions });
      await store.dispatch('setClaims', idTokenResult.claims);
      await store.dispatch('setIsAuthenticated', true);
      await store.dispatch('setIdToken', idTokenResult.token);
      await store.dispatch('setCurrentUser', idTokenResult.claims.entity);
    }
  // } else {
  //   store.dispatch('logout', `Unauthorised access!`);
  //   return;
  }
});

createApp(App).use(store).use(router).mount('#app')
