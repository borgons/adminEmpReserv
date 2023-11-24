const asyncHandler = require('express-async-handler')
const Employee = require('../models/Employee')


const getEmployees = asyncHandler(async(req, res) => {

  // PAGINATION

  //const limit = parseInt(req.query.limit, 4) || 4
  const page = parseInt(req.query.page, 10) || 1

  const PAGE_SIZE = 10
  const skip = (page - 1) * PAGE_SIZE

  Employee.paginate(req.query.empLicensedNo ? {'empLicensedNo' : req.query.empLicensedNo } : {}, { page, skip})
    // .populate('employees', '-_id -__v')
    .then(messages => res.json(messages))
})

// const addEmployee = asyncHandler(async (req, res) => {

// })
    
const editEmployee = asyncHandler(async (req, res) => {
  

  const { empFirstName, empLastName, empLicensedNo, empRate, empStatus } = req.body

  try {

    let rate = 450.00
  
    isSucceeded = rate / empRate
    isNotSucceeded = rate
  
    let updateEmployee = {
      empFirstName: empFirstName, 
      empLastName: empLastName, 
      empLicensedNo: empLicensedNo, 
      empRate: empRate >= 8 ? isSucceeded : isNotSucceeded,
      empStatus: empStatus
    }
  
    // console.log(updateEmployee)

    Employee.findByIdAndUpdate(req.params.id, updateEmployee).then(
      () => {
        res.status(200).send({
          success: true,
          msg: 'Employee data has been updated'
        })
      }
    ).catch (
      (error) => {
        res.status(400).json({
          error: error
        })
      }
    )
  } catch (err) {
    res.status(500).send(err)
  }


})
  

const deleteEmployee = asyncHandler(async  (req,res) => {
    Employee.findById(req.params.id)
    .then(message => message.deleteOne().then(() => res.json({success:true}) ))
    .catch(err => res.status(404).json( {success:false} )) 
})

module.exports = {
  getEmployees,
  // addEmployee, 
  editEmployee,
  deleteEmployee
}