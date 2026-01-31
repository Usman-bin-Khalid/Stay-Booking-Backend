const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');


router.get('/' , auth, async (req, res) => {
    try { 
     const profile = await Profile.findOne({user : req.user.id});
     if(!profile) return res.status(404).json({message : 'Profile not found'});
     res.json(profile);
    } catch (err) {
        res.status(500).json({message : 'Server Error', err});
    }
})


router.post('/', auth, async (req, res) => {
  try {
    const profileData = {...req.body, user : req.user.id}
    const existingProfile = await Profile.findOne({user : req.user.id});
    if(existingProfile) 
        return res.status(400).json({message : 'Profile already exists'});
     const profile = new Profile(profileData);
     await profile.save();
     res.status(201).json(profile);
  } catch(err) {
    res.status(500).json({message : 'Server Error', err});
  }
})

module.exports = router;