'use strict'

import axios from 'axios';
import store from "@/store";
import firebase from '@/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebase);

// TODO: Handle expired token that returns 401
onAuthStateChanged(auth, async(user) => {
  if (user && user.emailVerified) {
    const idTokenResult = await user.getIdTokenResult();
    await store.dispatch('setIdToken', idTokenResult.token);
  }
});

export const request = async (url, method, token, payload, query) => {
  return await axios({
    method: method,
    url: `${url}`,
    data: payload,
    params: query,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${store.getters.idToken}`,
    },
    json: true,
  });
};

export const API_URL = 'http://localhost:8080/api/v1/';