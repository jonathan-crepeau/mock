// EXTERNAL MODULES ============================= //
const express = require('express');
const app = express();

// INTERNAL MODULES ============================= //

// CONFIGURATION VARIABLES ============================= //
const PORT = process.env.PORT || 4000;

// MIDDLEWARE ============================= //

// HTML ROUTES ============================= //

app.get('/', (request, response) => {
    response.sendFile(
      __dirname + '/views/login.html'
    )
})

app.get('/login', (req, res) => {
  res.sendFile(
    __dirname + '/views/profile'
  )
})

app.get('/signup', (req, res) => {
  res.sendFile(
    __dirname + '/views/signup'
  )
})


// API ROUTES ============================= //




// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
