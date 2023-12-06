import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ChangeAdvertiseData, getAllAdvertiseData, updateAdvertiseData } from '../ApiServices/advertiseService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const fetchAdsdata = createAsyncThunk('data/fetchadsdata', async () => {
  try {
    const advertise = await getAllAdvertiseData()

    return advertise.getResponse
  } catch (error) {
    throw error
  }
})

//Update advertise
export const updateAdvertise = createAsyncThunk(
  'data/updateadvertiseData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateAdvertiseData(id, data)
      const advertise = await getAllAdvertiseData()

      return advertise.getResponse
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

//Change Advertise Status
export const ChangeAdvertiseStatus = createAsyncThunk(
  'data/changeAdvertiseData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(`id: ${id}, data: ${JSON.stringify(data)}`)
      const response = await ChangeAdvertiseData(id, data)

      const advertise = await getAllAdvertiseData()

      return advertise.getResponse
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const advertiseSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdsdata.pending, state => {
        state.loading = true
      })
      .addCase(fetchAdsdata.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchAdsdata.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateAdvertise.pending, state => {
        state.loading = true
      })
      .addCase(updateAdvertise.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateAdvertise.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(ChangeAdvertiseStatus.pending, state => {
        state.loading = true
      })
      .addCase(ChangeAdvertiseStatus.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(ChangeAdvertiseStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

// export const { addadvertise } = advertiseSlice.actions

export default advertiseSlice.reducer
