import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postCityData, getCityData, updateCityData } from '../apiServices'

const initialState = {
  data: [],
  loading: false,
  error: null,
  status: 'idle'
}

// Create a New Country
export const createCity = createAsyncThunk('form/postCityData', async (data, { rejectWithValue }) => {
  try {
    const newCity = await postCityData(data)

    return newCity
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

//Get City Details
export const getCity = createAsyncThunk('form/getCityData', async () => {
  try {
    const city = await getCityData()

    return city.getResponse
  } catch (error) {
    throw error.message
  }
})

//Update city
export const updateCity = createAsyncThunk('form/updateCityData', async ({ id, data }, rejectWithValue) => {
  try {
    console.log(`City Slice: ${JSON.stringify(data)}`)
    const city = await updateCityData(id, data)

    return city
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const citySlice = createSlice({
  name: 'city',
  initialState,

  extraReducers: builder => {
    builder // create new City
      .addCase(createCity.pending, state => {
        state.status = 'loading'
      })
      .addCase(createCity.fulfilled, state => {
        state.status = 'succeeded'
      })
      .addCase(createCity.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }) // Get All City
      .addCase(getCity.pending, state => {
        state.loading = true
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getCity.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateCity.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default citySlice.reducer
