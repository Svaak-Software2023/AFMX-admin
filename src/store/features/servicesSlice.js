import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getServicesData, postServiceData } from '../ApiServices/servicesService'

const initialState = {
  data: [],
  formData: [],
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

//Create New Service
export const createNewService = createAsyncThunk('form/postService', async (formData, { rejectWithValue }) => {
  try {
    const services = await postServiceData(formData)

    return services

    // const getservice = await getServicesData()
    // console.log(getservice)

    // return getservice
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const servicesSlice = createSlice({
  name: 'services',
  initialState,

  extraReducers: builder => {
    builder //Get All Services
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
      }) // Create New Service
      .addCase(createNewService.pending, state => {
        state.loading = true
      })
      .addCase(createNewService.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.formData = action.payload
      })
      .addCase(createNewService.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default servicesSlice.reducer
