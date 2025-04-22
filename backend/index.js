const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth'); // Import auth routes

const app = express();
const port = 5000;

app.use(bodyParser.json()); // For parsing JSON bodies

// Use authentication routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
