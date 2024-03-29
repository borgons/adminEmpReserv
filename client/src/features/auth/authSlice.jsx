import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
  admin: admin ? admin : null,
  isError: false, 
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const register = createAsyncThunk(
  'routes/api/admin/register',
  async(admin, thunkAPI) => {
    try {
      return await authService.register(admin)
    } catch (err) {
      (err.response && 
        err.response.data &&
        err.response.data.message) ||
        err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'routes/api/admin/login',
  async(admin, thunkAPI) => {
    try {
      return await authService.login(admin)
    } catch (error) {
        const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk(
  'admin/logout', async  () => {
    await authService.logout()
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false,
      state.isSuccess = false, 
      state.isError = false,
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.admin = action.payload
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.admin = null
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.admin = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.admin = null
    })
    .addCase(logout.fulfilled, (state) => {
      state.admin = null
    })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer





