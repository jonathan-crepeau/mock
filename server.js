// EXTERNAL MODULES ============================= //
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

const db = require('./models');
// INTERNAL MODULES ============================= //

// CONFIGURATION VARIABLES ============================= //
const PORT = process.env.PORT || 4000;

// MIDDLEWARE ============================= //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// HTML ROUTES ============================= //

app.get('/', (request, response) => {
    response.sendFile(
      __dirname + '/views/login.html'
    )
})

app.get('/login', (req, res) => {
  res.sendFile(
    __dirname + '/views/profile.html'
  )
})

app.get('/signup', (req, res) => {
  res.sendFile(
    __dirname + '/views/signup.html'
  )
})


// API ROUTES ============================= //

app.post('/api/test', (req, res) => {
  res.json({status: 200, message: 'Test Success'})
});

app.post('/api/submitForm', (req, res) => {

     console.log("in submit form")

     db.User.create(req.body, (err, savedUser) => {
       if (err) {
        return res.json({lol})
       }
       console.log(`saved new user: ${savedUser}`)
       res.json({savedUser});
     })
  })

  // app.get('api/submitForm', (req, res) => {
  //
  // })


// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
