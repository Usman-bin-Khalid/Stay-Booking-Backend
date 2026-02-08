const express = require('express');
const router = express.Router();

const Listing = require('../models/Listing');
const auth = require('../middleware/auth')

// Get Listing
router.get('/', async (req , res) => {
    try {
     const {location, minPrice, maxPrice} = req.query;
     // req.query ka mtlb hy k hum params waly tab mai query parameters mai data pass kryn gai
     const filter = {};
     if (location) filter.location = {$regex : location , $options : 'i' }
     if(minPrice || maxPrice) filter.price = {};
     if (minPrice) filter.price.$gte = +minPrice;
     if(maxPrice) filter.price.$lte = +maxPrice;
    
     const listings = await Listing.find(filter);
     res.json(listings);
      
    } catch (err) {
      res.status(500).json({message : "Error fetching listings"}) 
    }
})





router.get('/', async (req, res) => {
  try { 
   const {location, minPrice, maxPrice} = req.query;
   const filter = {};
   if(location) filter.location = {$regex : location, $options : 'i'}
  } catch (err) {
    res.status(500).json({message : "Error fetching listings"});
  }
})


// Get Listings by Id
router.get('/:id' , async (req, res) => {
  try {
   const listing = await Listing.findById(req.params.id);
   if (!listing) return res.status(404).json({message : 'Listing not found'});
   res.json(listing);
  } catch (err) {
   res.status(500).json({message : 'Error Fetching Listing'});
  }
})

// Post Listings by Host
router.post('/', auth, async (req, res) => {
  try {
   if (!req.user.isHost) {
    return res.status(403).json({message : 'Only host can add listings'});
   }
   const listing = new Listing({...req.body , hostId : req.user.id});
   await listing.save();
   res.status(201).json(listing);
  } catch (err) {
   res.status(500).json({message : "Error creating listings"});
  }
});


// Put by Host
router.put("/:id" , auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return res.status(404).json({message : 'Listing not found'});
    if(listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({messaage : "Unauthorized"});
    }

    const updated = await Listing.findByIdAndUpdate(req.params.id , req.body, {
      new : true
    });
    res.json(updated);
  } catch (err) {
   res.status(500).json({message : 'Error updating listing'});
  }
})


// Delete Listing by Host
router.delete('/:id' , auth, async (req, res) => {
 try {
    const listing = await Listing.findById(req.params.id);
  if(!listing) return res.status(404).json({message : "Listing not found"});
  if(listing.hostId.toString() !== req.user.id) {
    return res.status(403).json({message : "Unauthorized"});
  }
  await listing.deleteOne();
  res.json({message : "Deleted Successfully"});
 } catch (err) {
   res.status(500).json({message : "Error in deleting listings"});
 }
})

// My Booking
router.get('/my-listings' , auth , async (req, res) => {
  try {
   if(!req.user.isHost) {
    return res.status(403).json({message : 'Only host can view their listings'});
   }
   const listing = await Listing.find({hostId : req.user.id});
   res.json(listing);
  } catch (err) {
    res.status(500).json({message : 'Error in fetching the listing'});
  }
})

module.exports = router;