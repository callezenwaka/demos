'use strict'

import userApi from '@/service';
import { isAuhorised } from '@/utils';

const state = {
  users: [],
  user: {},
};

const getters = {
	users: state => state.users,
	user: state => state.user,
	userById: state => id => {
		return state.users.find(user => user.id === id)
	},
};

const actions = {
  async addUser(context, payload) {
    try {
      if(!isAuhorised('create')) return;
      // TODO: api call
      await context.dispatch('setLoading', true);
      const { data } = await userApi.addUser(context.rootGetters.idToken, payload);
      if (typeof data !== 'object') return;
      await context.dispatch('setLoading', false);
      context.commit('ADD_USER', data);
      return data;
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
  },
  async getUsers(context, payload) {
    try {
      if(!isAuhorised('readAll')) return;
      // TODO: api call
      await context.dispatch('setLoading', true);
      if (!payload && context.state.users && !!context.state.users.length) {
        await context.dispatch('setLoading', false);
        return context.state.users;
      }
      const { data } = await userApi.getUsers(context.rootGetters.idToken);
      if (!Array.isArray(data)) return;
      await context.dispatch('setLoading', false);
      context.commit('SET_USERS', data);
      return data;
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
  },
  async getUser(context, payload) {
    try {
      if(!isAuhorised('read')) return;
      // TODO: Check vuex store for data
      await context.dispatch('setLoading', true);
      if (payload === context.state.user.uid) {
        await context.dispatch('setLoading', false);
        return context.state.user;
      };
      // TODO: Use getter to filter state variable
      const user = context.getters.userById(payload);
      if (user) {
        await context.dispatch('setLoading', false);
        return context.commit('SET_USER', user);
      }
      // TODO: api call
      const { data } = await userApi.getUser(context.rootGetters.idToken, payload);
      if (typeof data !== 'object') return;
      await context.dispatch('setLoading', false);
      context.commit('SET_USER', data);
      return data;
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
  },
  async updateUser(context, payload) {
    try {
      if(!isAuhorised('update')) return;
      // TODO: api call
      await context.dispatch('setLoading', true);
      const { data } = await userApi.updateUser(context.rootGetters.idToken, payload);
      if (typeof data !== 'object') return;
      await context.dispatch('setLoading', false);
      context.commit('UPDATE_USER', data);
      return data;
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
  },
  async deleteUser(context, payload) {
    try {
      if(!isAuhorised('delete')) return;
      // TODO: api call
      await context.dispatch('setLoading', true);
      const { data } = await userApi.deleteUser(context.rootGetters.idToken, payload);
      context.commit('DELETE_USER', payload);
      await context.dispatch('setLoading', false);
      return data;
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
  },
};

const mutations = {
  ADD_USER(state, payload) {
    state.users.push(...payload.users);
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  UPDATE_USER(state, payload) {
    const index = state.users.findIndex(user => user.id === payload.id);
    if (index !== -1) {
      state.users.splice(index, 1, payload);
    }
  },
  DELETE_USER(state, payload) {
    state.users = state.users.filter(user => user.id !== payload);
  },
};

export default {
	state,
	getters,
	actions,
	mutations
};