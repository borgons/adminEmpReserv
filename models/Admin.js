const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// CREATE SCHEMA

const adminSchema = new Schema({
  adminName: {
    type: String,
    required: true
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true
  },
  adminPassword: {
    type: String,
    required: true
  },
  adminRegister_Date: {
    type: Date,
    default: Date.now
  }
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
