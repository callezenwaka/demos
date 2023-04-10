import { createStore } from 'vuex';
import user from './modules/user';
import router from '@/router';
import firebase from '@/firebase';
import { getAuth, signInWithEmailAndPassword, signOut,  } from "firebase/auth";
const auth = getAuth(firebase);

export const store = createStore({
  state: {
    message: '',
    loading: false,
    currentUser: '',
    isAuthenticated: false,
    idToken: '',
    claims: {},
    profile: {},
  },
	getters: {
		message: state => state.message,
		loading: state => state.loading,
    currentUser: state => state.currentUser,
    isAuthenticated: state => state.isAuthenticated,
    idToken: state => state.idToken,
    claims: state => state.claims,
    profile: state => state.profile,
	},
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser;
    },
    SET_IS_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_PROFILE(state, profile) {
      state.profile.email = profile.email;
      state.profile.emailVerified = profile.emailVerified;
      state.profile.phoneNumber = profile.phoneNumber;
      state.profile.displayName = profile.displayName;
      state.profile.photoURL = profile.photoURL;
      state.profile.uid = profile.uid;
      state.profile.disabled = profile.reloadUserInfo.disabled;
      state.profile.entity = profile.entity;
      state.profile.name = profile.name;
      state.profile.permissions = profile.permissions;
      state.profile.createdAt = profile.metadata.createdAt;
      state.profile.lastLoginAt = profile.metadata.lastLoginAt;
    },
    SET_ID_TOKEN(state, idToken) {
      state.idToken = idToken;
    },
    SET_CLAIMS(state, claims) {
      state.claims = claims;
    },
    SIGN_OUT(state) {
      state.currentUser = '',
      state.idToken = null;
      state.claims = {};
      state.isAuthenticated = false;
      state.profile = {};
    },
  },
  actions: {
    async setMessage(context, payload) {
      // commit message
      context.commit('SET_MESSAGE', payload);
    },
    async setLoading(context, payload) {
      // commit loading
      context.commit('SET_LOADING', payload);
    },
    async setCurrentUser(context, payload) {
      // commit context
      context.commit('SET_CURRENT_USER', payload)
    },
    async setIsAuthenticated(context, payload) {
      // commit authenticated
      context.commit('SET_IS_AUTHENTICATED', payload)
    },
    async setProfile(context, payload) {
      // commit profile
      context.commit('SET_PROFILE', payload);
    },
    async setIdToken(context, payload) {
      // commit token
      context.commit('SET_ID_TOKEN', payload);
    },
    async setClaims(context, payload) {
      // commit token result
      context.commit('SET_CLAIMS', payload);
    },
    async login(context, payload) {
      try {
        // TODO: Log user in with parameters
        const { email } = payload;
        const { user } = await signInWithEmailAndPassword(auth, email, 'password');  
        if (!user.disabled) return await context.dispatch('setMessage', 'Email disabled!');
        await context.dispatch('setLoading', true);
        const idToken = await user.getIdToken();
        context.commit('SET_ID_TOKEN', idToken);
        context.commit('SET_IS_AUTHENTICATED', true);
        context.commit('SET_PROFILE', user);
        return user;
      } catch (error) {
        console.log('Error: ', error);
        return;
      }
    },
    async logout(context, payload) {
      try {
        // TODO: sign user out
        await signOut(auth);
        context.commit('SIGN_OUT', payload);
        await router.push('/login');
        window.location.reload();
        await context.dispatch('setMessage', payload);
        return;
      } catch (error) {
        console.log('Error: ', error);
        return;
      }
    },
  },
  modules: {
    user,
  },
})

// export the store
export default store;