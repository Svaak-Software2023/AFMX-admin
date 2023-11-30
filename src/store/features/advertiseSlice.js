import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAllBannerData, updateBannerData } from '../ApiServices/bannerService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const fetchAdsdata = createAsyncThunk('data/fetchadsdata', async () => {
  try {
    const banner = await getAllBannerData()

    return banner.getResponse
  } catch (error) {
    throw error
  }
})

//Update Banner
export const updateBanner = createAsyncThunk('data/updateBannerData', async ({ id, data }, { rejectWithValue }) => {
  try {
    const country = await updateBannerData(id, data)

    return country
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const bannerSlice = createSlice({
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
  }
})

// export const { addbanner } = bannerSlice.actions

export default bannerSlice.reducer
