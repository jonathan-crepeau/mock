// EXTERNAL MODULES ============================= //
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const db = require('./models');
const PORT = process.env.PORT || 4000;

// MIDDLEWARE ============================= //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// ANCHOR Express Session 
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost:27017/user-info',
  }),
  secret: process.env.SESSION_SECRET || "jdugifjk24u994u8tk32ngi3u",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
  },
}));

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

// ANCHOR - GET Index All Users

app.get('/api/users', (request, response) => {
  db.User.find({}, (error, allUsers) => {
    if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});
    response.status(200).json(allUsers);
  });
});


// ANCHOR - POST Register (Create) Single User

app.post('/api/register', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  let hash;

  // TODO - Add code to hash password after login api route below is succcessful

  try {
    hash = await bcrypt.hashSync(req.body.password, 10);
    userData.password = hash;
  } catch (err) {
    res.status(400).json({status: 400, error: 'Bad Request(C)'});
  }

  db.User.create(userData, (err, newUser) => {
    if (err) return res.status(200).json({
      status: 400,
      error: 'Bad Request',
    });
    res.status(200).json(newUser);
  });
});


// ANCHOR - POST Login API Route

app.post('/api/login', (req, res) => {
  const { firstName, lastName, email, password} = req.body;

  db.User.findOne({email}, async (err, foundUser) => {
    let passwordsMatch;
    if (err) res.status(400).json({status: 540, error: 'Bad request(A)'});
    
    if(!foundUser) {
      return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});
    }

    try {
      passwordsMatch = await bcrypt.compare(password, foundUser.password); 
      console.log(passwordsMatch);
    } catch (err) {
      res.status(400).json({status: 400, message: 'Bad request(B).'});
    }

    req.session.currentUser = foundUser._id;
    req.session.createdAt = new Date().toDateString();
    req.session.user = foundUser;

    console.log(req.session);



    if (passwordsMatch) { 
      res.status(200).json({status: 200, message: 'Success!'});
    } else {
      res.status(400).json({status: 400, error: 'Invalid credentials.'});
    }

  });
});


// ANCHOR GET Verify Single User 

app.get('/api/verify', (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again.'})
  }
  res.status(200).json(req.session.user);
});


// ANCHOR DELETE Destroy Single User

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
