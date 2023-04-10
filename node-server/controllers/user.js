'use strict';

// Import packages and dependencies
const { getAuth } = require('firebase-admin/auth');

/**
 * [START GET USERS]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * @return {object} json items
 * Retrieve items.
 */
exports.getUsers = async (req, res, next) => {
	// TODO: Fix query params and pagination (priority medium)
	try {
    // TODO: list users
		const listUsers = await getAuth().listUsers();
    const users = listUsers.users.filter(user => user.customClaims.entity === 'isUser')
		.map(user => {
			
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
				phoneNumber: user.phoneNumber,
				photoURL: user.photoURL,
				emailVerified: user.emailVerified,
				disabled: user.disabled,
        entity: user.customClaims.entity,
        name: user.customClaims.name,
        permissions: user.customClaims.permissions,
        createdAt: new Date(user.metadata.creationTime).getTime(),
        lastLoginAt: new Date(user.metadata.lastSignInTime).getTime(),
      };
    });
    
		return res.status(200).json(users);
	} catch (error) {
		// next(error);
		console.log('error: ', error);
		return res.status(500).json('Internal Server Error!');
	}
};
// [END GET USERS]

/**
 * [START GET]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * @return {object} json items
 * Retrieve item.
 */
exports.getUser = async (req, res, next) => {
	try {
		// Todo: get id from query param
    const { id } = req.params;
    if (!id) return res.status(400).json('Bad parameter!');

		// Todo: get user with id
    const user = await getAuth().getUser(id)

		if (!user) return res.status(200).json({});

		return res.status(200).json({
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			phoneNumber: user.phoneNumber,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			disabled: user.disabled,
			entity: user.customClaims.entity,
			name: user.customClaims.name,
			permissions: user.customClaims.permissions,
			createdAt: new Date(user.metadata.creationTime).getTime(),
			lastLoginAt: new Date(user.metadata.lastSignInTime).getTime(),
		});
	} catch (error) {
		// next(error);
		return res.status(500).json('Internal Server Error!');
	}
};
// [END GET]

/**
 * [START POST]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * Add item
 */
exports.addUser = async (req, res, next) => {
	try {
		// TODO: get and validate user details
    const { email, emailVerified, phoneNumber, password, displayName, photoURL, disabled, role } = req.body;
    if (!email || !emailVerified || !phoneNumber || !password || !displayName || !photoURL || !disabled || !role) 
      return res.status(400).json('Bad parameters!');

    // TODO: create a new account
    await getAuth().createUser({
      email,
      emailVerified,
      phoneNumber,
      password,
      displayName,
      photoURL,
      disabled,
    });
    
		return res.status(200).json('Success');
	} catch (error) {
		// next(error);
		console.log('error: ', error)
		return res.status(500).json('Internal Server Error!');
	}
};
// [END POST]

/**
 * [START PUT]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * @return {object} json item
 * Update item.
 */
exports.updateUser = async (req, res, next) => {
	try {
		// TODO: get and validate user details
    const { uid, email, emailVerified, phoneNumber, password, displayName, photoURL, disabled } = req.body;
    if (!uid || !email || !emailVerified || !phoneNumber || !password || !displayName || !photoURL || !disabled) 
      return res.status(400).json('Bad parameters!');

    // TODO: update an account
    await getAuth().updateUser(uid, {
      email,
      emailVerified,
      phoneNumber,
      password,
      displayName,
      photoURL,
      disabled,
    });

		res.status(201).json('Created!');
	} catch (error) {
		// next(error);
		res.status(500).json('Internal Server Error!');
	}
};
// [END PUT]

/**
 * [START DELETE]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * Delete item
 */
exports.deleteUser = async (req, res, next) => {
	try {
		// TODO: create a provider and update a document
    const { id } = req.params;
    if (!id) return res.status(400).json('Bad parameter!');

    // TODO: validate deleteUser
    await getAuth().deleteUser(id);

		return res.status(200).json('Success');
	} catch (error) {
		// next(error);
		return res.status(500).json('Internal Server Error!');
	}
};
// [END DELETE]