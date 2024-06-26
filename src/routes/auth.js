// src/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM signup1 WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ msg: 'Account does not exist. Please sign up first.' });
    } else {
      const user = result[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (passwordIsValid) {
        res.status(200).json({ msg: 'Login successful', user });
      } else {
        res.status(400).json({ msg: 'Invalid email or password' });
      }
    }
  });
});

module.exports = router;
