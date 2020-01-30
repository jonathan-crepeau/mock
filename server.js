// EXTERNAL MODULES ============================= //
const express = require('express');
const app = express();

// INTERNAL MODULES ============================= //

// CONFIGURATION VARIABLES ============================= //
const PORT = process.env.PORT || 4000;

// MIDDLEWARE ============================= //

// HTML ROUTES ============================= //

app.get('/', (request, response) => {
    response.send(`
    <h1>HoodScoop Root Route</h1>
    `)
})

// API ROUTES ============================= //

// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});