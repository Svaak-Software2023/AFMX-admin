import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getServicesData } from '../ApiServices/servicesService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

// Get All Services Data
export const getAllServices = createAsyncThunk('form/getServiceData', async () => {
  try {
    const services = await getServicesData()

    return services
  } catch (error) {
    throw error
  }
})

export const servicesSlice = createSlice({
  name: 'services',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getAllServices.pending, state => {
        state.loading = true
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default servicesSlice.reducer
