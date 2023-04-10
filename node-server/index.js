'use strict';

// Import packages
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { isAuthenticated } = require('./lib/auth');
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const server = require("http").createServer(app);

// import routes
const user = require("./routes/user");

// Initialize firebase admin sdk config
initializeApp({
  credential: applicationDefault(),
});

// (async() => {
//   const claim = await getAuth().getUser('brVwqs6T9wMT9dNYKLPhIOavqdm2');
//   console.log('claim: ', claim);
// })();



// Route middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ping health route
app.get('/health', async(req, res) => {
  try {
    return res.status(200).json('Ok');
  } catch (error) {
    return res.status(500).json('Internal Server Error!');
  }
});

// Public routes
// Verify request middleware
// app.use('/', isAuthenticated);
// Private routes
app.use('/api/v1/user', user);

// Ping home route
app.get('/', (req, res) => {
  try {
    res.status(200).json('Ok');
  } catch (error) {
    next(error)
  }
});

// notfound route handler
app.use((req, res, next) => {
  const error = {
    statusText: new Error('Not Found'),
    status: 404
  };
  next(error);
})

// error handler
app.use((error, req, res, next) => {
  res.json({
    message: error.message,
    status: error.status || 500
  });
});

// Set up port and start the server
server.listen( process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}.`);
});

module.exports = app;