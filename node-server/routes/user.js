'use strict';

// import packages and dependencies
const user = require('../controllers/user');
const { isUser } = require('../lib/auth');
const express = require('express');
const router = express();

router.get('/', isUser('readAll'), user.getUsers); 

router.get('/:id', isUser('read'), user.getUser);

router.post('/', isUser('create'), user.addUser);

router.put('/', isUser('update'), user.updateUser);
 
router.delete('/:id', isUser('delete'), user.deleteUser);
 
module.exports = router;