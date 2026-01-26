const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');


router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const user = new User({
        name, email, password : hashedPassword
     });
      await user.save();
    } catch (err) {

    }
})