'use strict'

const { getAuth } = require('firebase-admin/auth');

/**
 * [START GET TOKEN]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 */
const getAuthToken = (req, res, next) => {
	// console.log(req.headers.authorization)
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		req.authToken = req.headers.authorization.split(' ')[1];
	} else {
		req.authToken = null;
	}
	next();
};
// [END GET TOKEN]

/**
 * [START CHECK AUTH]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * Define auth middleware.
 */
exports.isAuthenticated = (req, res, next) => {
	getAuthToken(req, res, async () => {
		try {
			const { authToken } = req;
			req.user = await getAuth().verifyIdToken(authToken);
			// console.log(req.user.isUser)
			return next();
		} catch (error) {
			return res.status(401).json('Unauthorized access!');
		}
	});
}
// [END CHECK AUTH]

/**
 * [START CHECK USER]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 */
exports.isUser = (action) => (req, res, next) => {
	getAuthToken(req, res, async () => {
		try {
			// TODO: get and verify authToken
			const { authToken } = req;
			const userInfo = await getAuth().verifyIdToken(authToken);
			// TODO: user has permission required to perform action on any API method
			const allow = userInfo.permissions.some(permission => permission.name === action && permission.value === true);
			// TODO: user not allowed to take action
			if (!allow) return res.status(403).json('Forbidden access!!');
			// TODO: user allowed to take action
			req.user = userInfo;
			return next();
		}
		catch (error) {
			return res.status(401).json('Unauthorized access!');
		}
	});
}
// [END CHECK USER]

// module.exports = {
// 	isAuthenticated,
// };