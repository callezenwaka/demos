'use strict'

import { API_URL, request } from '@/config';

export default {
	async addUser(idToken, params) {
		return await request(`${API_URL}user`, 'post', idToken, params);
	},
	async getUsers(idToken) {
		return await request(`${API_URL}user`, 'get', idToken);
	},
	async getUser(idToken, id) {
		return await request(`${API_URL}user/${id}`, 'get', idToken);
	},
	async updateUser(idToken, params) {
		return await request(`${API_URL}user/${params.id}`, 'put', idToken, params);
	},
	async deleteUser(idToken, id) {
		return await request(`${API_URL}user/${id}`, 'delete', idToken);
	},
};