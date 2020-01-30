// EXTERNAL MODULES ============================= //
const express = require('express');
const app = express();

// INTERNAL MODULES ============================= //

// CONFIGURATION VARIABLES ============================= //
const PORT = process.env.PORT || 4000;

// MIDDLEWARE ============================= //
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


// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
