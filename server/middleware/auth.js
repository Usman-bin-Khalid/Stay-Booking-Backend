const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Look for the header
    const authHeader = req.header('Authorization');
    
    // Split by space and take the second part (the actual token)
    const token = authHeader?.split(' ')[1]; 

    if(!token) return res.status(401).json({message : 'No token'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(401).json({message : 'Invalid token'});
    }
}