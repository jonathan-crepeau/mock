// EXTERNAL MODULES ============================= //
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const db = require('./models');
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


// ANCHOR - Register (Create) Single User

app.post('/api/register', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  let hash;

  // TODO - Add code to hash password after login api route below is succcessful

  db.User.create(userData, (err, newUser) => {
    if (err) return res.status(200).json({
      status: 400,
      error: 'Bad Request',
    });
    res.status(200).json(newUser);
  });
});

// SECTION - Login Authentication

/* GAME PLAN
1. Create
*/

// ANCHOR - LOGIN API Route

app.post('/api/login', (req, res) => {
  const { email, password} = req.body;

  db.User.findOne({email}, async (err, foundUser) => {
    let passwordsMatch;
    if (err) res.status(500).json({status: 500, error: 'Bad request(A)'});
    
    if(!foundUser) {
      return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});
    }

    try {
      passwordsMatch = password === foundUser.password;      
      console.log(req.body);
      console.log('Found User ===>', foundUser);
    } catch (err) {
      res.status(400).json({status: 400, message: 'Bad request(B).'});
    }

    if (passwordsMatch) { 
      res.status(200).json({status: 200, message: 'Success!'});
    } else {
      res.status(400).json({status: 400, error: 'Invalid credentials.'});
    }

  });
});





// ANCHOR Delete Single User

app.delete('/api/users/:id', (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deleteUser) => {
    if (err) res.status(400).json({status: 400, error: 'Bad request, please try again.'});
    res.status(200).json(deleteUser);
  });
});




// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
