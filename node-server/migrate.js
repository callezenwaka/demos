'use strict'

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { users } = require('./database');

// Initialize firebase admin sdk config
initializeApp({
  credential: applicationDefault(),
});

const migrate = async(user) => {
  try {
    // TODO: get and validate user details
    const { email, emailVerified, phoneNumber, password, displayName, photoURL, disabled, role } = user;
    if (!email || !emailVerified || !phoneNumber || !password || !displayName || !photoURL || !role) 
      return console.log('Message: Warning - Bad parameters!');

    // TODO: create a new account
    const { uid } = await getAuth().createUser({
      email,
      emailVerified,
      phoneNumber,
      password,
      displayName,
      photoURL,
      disabled,
    });

    await getAuth().setCustomUserClaims(uid, role);

    return console.log('Message: Success - Migration completed!');
  } catch (error) {
    return console.log('Message: Error - ', error);
  }
};

(async() => {
  for (const user of users) {
    // console.log('User: ', user);
    if(process.argv[2] === 'up') await migrate(user);
    else if(process.argv[2] === 'down') await rollback(user);
    else return console.log('Message: Warning - No argument passed!');
  }
})();