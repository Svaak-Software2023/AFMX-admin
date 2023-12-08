import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getServiceDepartmentData,
  postServiceDepartmentData,
  updateServiceDepartmentData
} from '../ApiServices/serviceDepartmentService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

//create a new service department
export const createServiceDepartment = createAsyncThunk(
  'form/postServiceDepartment',
  async (formData, { rejectWithValue }) => {
    try {
      const newServiceDepartment = await postServiceDepartmentData(formData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

//Get the service department
export const getServiceDepartment = createAsyncThunk('form/getServiceDepartment', async () => {
  try {
    const department = await getServiceDepartmentData()

    return department
  } catch (error) {
    throw error
  }
})

//Update the service department
export const updateServiceDepartment = createAsyncThunk('form/updateServiceDepartment', async ({ id, data }) => {
  try {
    const department = await updateServiceDepartmentData({ id, data })
    const getServiceDepartment = await getServiceDepartmentData()

    return getServiceDepartment
  } catch (error) {
    throw error
  }
})

export const serviceDepartmentSlice = createSlice({
  name: 'serviceDepartment',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(createServiceDepartment.pending, state => {
        state.loading = true
      })
      .addCase(createServiceDepartment.fulfilled, state => {
        state.loading = false
      })
      .addCase(createServiceDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getServiceDepartment.pending, state => {
        state.loading = true
      })
      .addCase(getServiceDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getServiceDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateServiceDepartment.pending, state => {
        state.loading = true
      })
      .addCase(updateServiceDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateServiceDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default serviceDepartmentSlice.reducer
