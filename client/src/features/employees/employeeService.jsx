import axios from 'axios'

import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

const API_URLEMPLOYEES = 'https://admin-emp-reserv-be.vercel.app/routes/api/employee'

const getEmployees = async(empLicensedNo = '', token) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axios.get(API_URLEMPLOYEES + `/getEmployees?empLicensedNo=${empLicensedNo}`, config)
    
    return res.data

  } catch(err) {
    console.log(err)
  }

}


const addEmployee = async(addEmpData, token) => {

  try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
    
    const res = await axios.post(API_URLEMPLOYEES + '/addEmployee', addEmpData, config)

    switch (res.status) {
      case 201:
        toast.success(res.data.msg, {
          theme: 'dark',
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
          progress: undefined
        })
        break;

      case 200:
        toast.warn(res.data.message, {
          theme: 'dark',
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
          progress: undefined
        })
        break;
      default:
        break;
    }

    return res.data

  } catch (err) {
      switch (err.response.status) {
        case 422:
          toast.error(err.response.data.message ,{
            theme: 'dark',
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
            progress: undefined
          })
          break;
        default:
          console.log(err)
          break;
      }
    }
  }

const editEmployee =  async(empUpdData, token) => {

  try{
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    
    const empID = empUpdData.id.id
    const empData = empUpdData.updateEmp
    
    const res = await axios.put(API_URLEMPLOYEES + `/editEmployee/${empID}`, empData, config)
    
    console.log(res.data)
    
    switch (res.status) {
      case 200:
        toast.success(res.data.msg, {
          theme: 'dark',
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
          progress: undefined
        })
        setTimeout(function(){ window.location = '/dashboard' }, 4000);        
        break;
      default:
        return res.data
      }

    
  } catch (err) {
      console.log(err)
    }
  }





const deleteEmployee = async(id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axios.delete(API_URLEMPLOYEES + `/deleteEmployee/${id}`, config)
      
    setTimeout(function(){ window.location = '/dashboard' },2000);        
    
    return res.data


  } catch (err) {
    console.log(err)
  }
}

const employeeService = {
  getEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee
}

export default employeeService

