import store from "@/store";
import firebase from '@/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebase);

// TODO: Handle expired token that returns 401
onAuthStateChanged(auth, async(user) => {
  if (user && user.emailVerified) {
    const { claims: { entity, name, permissions } } = await user.getIdTokenResult();
    await store.dispatch('setProfile', { ...user, entity, name, permissions });
  }
});

/**
 * check user authorisation
 * @param {string} action 
 * @returns {boolean}  
 */
export const isAuhorised = (action) => {
  // TODO: get current user permissions
  const { permissions } = store.getters.profile;
  // TODO: verify if user has permission for the intended action
  return permissions.some(permission => permission.name === action && permission.value === true);
};