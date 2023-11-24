import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const API_URLADMIN = 'https://admin-emp-reserv-be.vercel.app/routes/api/admin'

const register = async (adminData) => {

  try {
    const res = await axios.post(API_URLADMIN + '/register', adminData)

    // STORE IN LOCALSTORAGE
    if(res.data) {
      localStorage.setItem('admin', JSON.stringify(res.data))
    }

    toast.success("You are now registered", {
      theme: 'dark',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progress: undefined
    })

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
        case 401:
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
          break;
      }

  }
}


const login = async (adminData) => {

  try {
    const res = await axios.post(API_URLADMIN + '/login', adminData)

    // STORE IN LOCALSTORAGE
    if(res.data) {
      localStorage.setItem('admin', JSON.stringify(res.data))
    }

    toast.success("You are now login", {
      theme: 'dark',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true, 
      draggable: false,
      progress: undefined
    })

    return res.data

  } catch (err) {
      switch (err.response.status) {
        case 400:
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
          break;
      }
  }
}

const logout = () => {
  localStorage.removeItem('admin')

  toast.success("You are now logout", {
    theme: 'dark',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true, 
    draggable: false,
    progress: undefined
  })
}

const authService = {
  register, 
  login,
  logout
}

export default authService


