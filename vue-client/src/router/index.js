import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import firebase from '@/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from '@/views/Dashboard.vue';
const auth = getAuth(firebase);
// route.query.mode

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
		meta: { requiresAuth: true }
  },
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false },
		beforeEnter: async(to, from, next) => {
			// TODO: Prevent login page if authenticated
			if(store.getters.isAuthenticated) return next({ name: 'Dashboard' });
			else next();
		},
	},
	{
		path: '/404',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: "/:catchAll(.*)*", // Unrecognized path automatically matches 404
		redirect: { name: 'NotFound' },
		meta: { requiresAuth: false },
	}
]

const router = createRouter({
	history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
	onAuthStateChanged(auth, async(user) => {
		if (user && user.emailVerified) {
			await store.dispatch('setIsAuthenticated', true);
		}
		if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
			// TODO: Add message
			return next({
				name: "Login",
				query: { redirect: to.fullPath }
			});
		}
		else return next();
	});
});

export default router