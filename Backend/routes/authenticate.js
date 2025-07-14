const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchUser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'harshisdon';
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// ROUTE 1: TO ADD ANY USER TO OUR DATABASE
router.post('/add', async (req, res) => {
  let success = false;
  try {
    const tempUser = await User.findOne({ email: req.body.email });
    if (tempUser) {
      return res.status(404).json({ success, error: 'USER ALREADY EXIST' });
    }
    const salt = await bcrypt.genSalt(10);
    const secretPass = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secretPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (err) {
    success = false;
    res.status(400).json({ success, error: 'INVALID CREDENTIALS' });
  }
});

// ROUTE 2: TO LOGIN IN OUR APP
router.post('/login', async (req, res) => {
  let success = false;
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: 'INVALID CREDENTIALS' });
    }
    const passCmp = await bcrypt.compare(password, user.password);
    if (!passCmp) {
      return res.status(400).json({ success, error: 'INVALID CREDENTIALS' });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (err) {
    res.status(500).send(err);
  }
});

// ROUTE 3: GET USER DETAILS
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select('-password');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;