const mongoose = require('mongoose')
const mongoosePagination = require('mongoose-paginate-v2')
const Schema = mongoose.Schema;

// CREATE SCHEMA 

const employeeSchema = new Schema({
  empFirstName: {
    type: String,
    required: true
  },
  empLastName: {
    type: String,
    required: true
  },
  empLicensedNo: {
    type: Number, 
    required: true
  },
  empImage: {
    type: String,
  },
  empRate: {
    type: Number, 
    required: true,
    default: 0.0
  },
  empRegDate: {
    type: Date, 
    default: Date.now()
  },
  empStatus:{
    type: String,
    enum: ['AV', 'NAV'], // available or not available
    required: true,
    default: 'NAV'
  }

})

employeeSchema.plugin(mongoosePagination)

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee