const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/Admin')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // GET TOKEN FROM HEADER 
      token = req.headers.authorization.split(' ')[1]

      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // GET ADMIN FROM THE TOKEN
      req.admin = await Admin.findById(decoded.id).select('-password')

      next()
      
    } catch(err) {
      console.log(err)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }