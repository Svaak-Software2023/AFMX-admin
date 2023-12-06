import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminLoginData } from '../ApiServices/adminLoginService'

const initialState = {
  data: [],
  loading: false,
  error: null,
  loggedIn: false
}

export const adminSignIn = createAsyncThunk('form/loginData', async ({ formData, router }) => {
  try {
    const adminLogin = await adminLoginData(formData)
    sessionStorage.setItem('adminData', JSON.stringify(adminLogin.adminResponse))

    const getAdminData = sessionStorage.getItem('adminData')
    if (getAdminData) {
      router.push('/')
    }

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
        state.loggedIn = true
      })
      .addCase(adminSignIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default adminSlice.reducer
