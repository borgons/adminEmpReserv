const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')

const registerAdmin = asyncHandler(async (req, res) => {

    let { adminName, adminEmail, adminPassword } = req.body;

    // console.log(adminName)
    // console.log(adminEmail)
    // console.log(adminPassword)

    const notInput = !adminName || !adminEmail || !adminPassword;

    //FRONTEND
    // const isEmail =  adminEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(notInput) {
      res.status(422)
      throw new Error('Please add all fields')
    }

    // if(isEmail) {
    //   res.status(422)
    //   throw new Error('Please input a valid email address')
    // }

    // CHECK IF adminEmail EXISTS
    const adminExists = await Admin.findOne({ adminEmail })

    if(adminExists) {
      res.status(401)
      throw new Error('Admin email already exists')
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(adminPassword, salt)

    // CREATE ADMIN 
    const admin = await Admin.create({
      adminName, 
      adminEmail,
      adminPassword: hashedPassword, 
    })

    // DISPLAY DATA
    if (admin) {
      res.status(201).json({
        _id: admin.id,
        adminName: admin.adminName, 
        adminEmail: admin.adminEmail, 
        adminRegisterDate: admin.adminRegister_Date
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }

})


const loginAdmin = asyncHandler (async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  // CHECK FOR USER EMAIL
  const admin = await Admin.findOne({ adminEmail })

  // CHECK PASSWORD

  // ISVALID
  if(admin && (await bcrypt.compare(adminPassword, admin.adminPassword))) {
    res.json({
      _id: admin.id, 
      name: admin.adminName, 
      email: admin.adminEmail, 
      token: generateToken(admin._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
  
})

// GENERATE JWT 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerAdmin, 
  loginAdmin
}




