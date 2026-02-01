const express = require('express');
const router = express.Router();

const Listing = require('../models/Listing');
const auth = require('../middleware/auth')

// Get Listing
router.get('/', async (req , res) => {
    try {
     const {location, minPrice, maxPrice} = req.query;
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
