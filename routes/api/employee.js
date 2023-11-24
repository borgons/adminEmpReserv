const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const {
  getEmployees, 
  // addEmployee, 
  editEmployee,
  deleteEmployee
} = require('../../controller/employeeController')

const path = require('path')

const { protect } = require('../../middleware/authMddleware')

const Employee = require('../../models/Employee')

const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const DIR = './public/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR)
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-')
      cb(null, uuidv4() + '-' + fileName)
    }
})

let upload = multer({
  storage: storage, 
  fileFilter: (req, file, cb) => {
    if(file.mimetype == "image/png" || 
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error("Only .png .jpg .jpeg format allowed"))
    }
  }
})


router.get('/getEmployees', getEmployees)

router.post('/addEmployee', protect, upload.single("file"), asyncHandler(async (req,res) => {

  // const url = req.protocol + '://' + req.get('host')

  const { 
    empFirstName, 
    empLastName, 
    empLicensedNo
  } = req.body

  const notInput =  !empFirstName || !empLastName || !empLicensedNo     
  if(notInput) {
    res.status(422)
    throw new Error('Please enter all fields')
  }
  
  const ifEmpLicExist = await Employee.findOne({ empLicensedNo })
  if(ifEmpLicExist) {
    res.status(422)
    throw new Error('The Employee LicensedNo has been exist')
  }


  const newEmployee = new Employee({
    empFirstName, 
    empLastName, 
    empLicensedNo
  });
  
  newEmployee.save().then(res.status(201).json(
    {
      msg: "Employee record has been Added"
    }
  ))

}))
router.put('/editEmployee/:id', protect, editEmployee)
router.delete('/deleteEmployee/:id', protect, deleteEmployee)

module.exports = router


