import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import empReducer from '../features/employees/employeeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    employees: empReducer
  }
})
