import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './employeeService'

const initialState = {
  employees: [],
  isError: false,
  isSuccess: false, 
  isLoading: false
}

export const getEmployees = createAsyncThunk(
  'routes/api/employee/getEmployees',
  async(empLicensedNo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await employeeService.getEmployees(empLicensedNo, token)
    } catch (error) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }  
)

export const addEmployee = createAsyncThunk(
  'routes/api/employee/addEmployee',
  async(addEmployee, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await employeeService.addEmployee(addEmployee, token)
    } catch (error) {
      const message = (error.response &&
        error.response.data && 
        error.response.data.message) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const editEmployee = createAsyncThunk(
  'routes/api/employee/editEmployee/:id',
  async(updateEmployee, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await employeeService.editEmployee(updateEmployee, token)
    } catch (error) {
      const message = (error.response && 
        error.response.data &&
        error.response.data.message) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'routes/api/employee/deleteEmployee/:id',
  async(employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await employeeService.deleteEmployee(employeeData, token)
    } catch (error) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const employeeSlice = createSlice({
  name: 'employees',
  initialState, 
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getEmployees.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getEmployees.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.employees = action.payload
    })

    .addCase(addEmployee.pending, (state) => {
      state.isLoading = true
    })
    .addCase(addEmployee.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.employees = action.payload
    })
    .addCase(addEmployee.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.employees = action.payload
    })

    .addCase(editEmployee.pending, (state) => {
      state.isLoading = true
    })
    .addCase(editEmployee.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      const updateItem = action.payload
      const index = Object.values(state.employees).findIndex(
        (employee) => employee._id === updateItem.id  
      )
      state[index] = {
        ...state[index],
        ...action.payload
      }

    })
    .addCase(editEmployee.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.employees = action.payload
    })

    .addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteEmployee.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.employees = state.employees.filter(
        (employee) => employee._id !== action.payload.id  
      )
    })
    .addCase(deleteEmployee.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.employees = action.payload
    })
  }
})

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer