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

app.get('/profile', (req, res) => {
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

// app.post('/api/test', (req, res) => {
//   res.json({status: 200, message: 'Test Success'})
// });

// app.post('/api/submitForm', (req, res) => {

//      console.log("in submit form")

//      db.User.create(req.body, (err, savedUser) => {
//        if (err) {
//         return res.json({lol})
//        }
//        console.log(`saved new user: ${savedUser}`)
//        res.json({savedUser});
//      })
//   })

// ANCHOR - Index All Users

app.get('/api/users', (request, response) => {
  db.User.find({}, (error, allUsers) => {
    if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});
    response.status(200).json(allUsers);
  });
});


// ANCHOR - Create User Route

app.post('/api/submitForm', (request, response) => {
  db.User.create(request.body, (error, createUser) => {
    if (error) response.status(500).json({message: 'Something went wrong here. Try again'});
    response.status(200).json(createUser);
  })
})

// SECTION - Login Authentication

/* GAME PLAN
1. 
*/

// ANCHOR - API Route

// app.post('/login', (request, response) => {

//   })






// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
