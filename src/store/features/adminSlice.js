import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminLoginData } from '../ApiServices/adminLoginService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const adminSignIn = createAsyncThunk('form/loginData', async data => {
  try {
    const adminLogin = await adminLoginData(data)
    localStorage.setItem('adminData', JSON.stringify(adminLogin.adminResponse))

    return adminLogin.adminResponse
  } catch (error) {
    throw error
  }
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(adminSignIn.pending, state => {
        state.loading = true
      })
      .addCase(adminSignIn.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(adminSignIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default adminSlice.reducer
