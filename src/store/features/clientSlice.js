import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const fetchClientData = createAsyncThunk('data/fetchclientdata', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/all-signup')
    const data = await response.data

    return data.getResponse
  } catch (error) {
    throw error
  }
})

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchClientData.pending, state => {
        state.loading = true
      })
      .addCase(fetchClientData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchClientData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default clientSlice.reducer
