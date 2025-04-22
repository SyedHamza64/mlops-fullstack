const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require('./db'); // Database connection
const router = express.Router();

// JWT Secret key (you should keep this safe, ideally in an environment variable)
const JWT_SECRET = 'your_jwt_secret_key';

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert into database
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  client.query(query, [username, email, hashedPassword])
    .then(result => {
      const user = result.rows[0];
      res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, username: user.username, email: user.email },
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = $1';
  client.query(query, [email])
    .then(async result => {
      const user = result.rows[0];

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
