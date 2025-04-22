const { Client } = require('pg');

const client = new Client({
  user: 'user', // Your PostgreSQL user
  host: 'localhost',
  database: 'auth_db',
  password: 'password', // Your PostgreSQL password
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
