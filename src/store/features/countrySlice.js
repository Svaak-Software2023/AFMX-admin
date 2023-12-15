import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postCounrtyData, getCountryData, updateCountryData } from '../ApiServices/regionService'

const initialState = {
  data: [],
  loading: false,
  error: null,
  status: 'idle'
}

//Get Country Details
export const getCountry = createAsyncThunk('get/getCountryData', async () => {
  try {
    const country = await getCountryData()

    return country.getResponse
  } catch (error) {
    throw error.message
  }
})

// Create a New Country
export const CreateCountry = createAsyncThunk('form/postCountryData', async (data, { rejectWithValue }) => {
  try {
    const newCoutry = await postCounrtyData(data)
    const country = await getCountryData()

    return country.getResponse
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

//Update country
export const updateCountry = createAsyncThunk('update/updateCountries', async ({ id, data }, { rejectWithValue }) => {
  try {
    const updateCountry = await updateCountryData(id, data)
    const country = await getCountryData()

    return country.getResponse
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Slice
export const countrySlice = createSlice({
  name: 'country',
  initialState,

  // reducers: {
  //   submitForm: (state, action) => {
  //     state.formData = action.payload
  //   }
  // },

  extraReducers: builder => {
    builder
      .addCase(getCountry.pending, state => {
        state.loading = true
      }) //Get All Country
      .addCase(getCountry.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      }) //Create New Country
      .addCase(CreateCountry.pending, state => {
        state.loading = true
        state.status = 'loading'
      })
      .addCase(CreateCountry.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.status = 'succeeded'
      })
      .addCase(CreateCountry.rejected, (state, action) => {
        state.loading = false
        state.status = 'failed'
        state.error = action.error.message
      }) // Update Country
      .addCase(updateCountry.pending, state => {
        state.loading = true
        state.status = 'loading'
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.loading = false
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// Export The reducer
export default countrySlice.reducer
