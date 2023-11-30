import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postStateData, getStateData, updateStateData } from '../apiServices'

const initialState = {
  data: [],
  formData: [],
  loading: false,
  error: null,
  status: 'idle'
}

// Create a new state
export const createState = createAsyncThunk('form/postStateData', async (data, { rejectWithValue }) => {
  try {
    const newState = await postStateData(data)

    return newState
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

//Get State Details
export const getState = createAsyncThunk('get/getStateData', async () => {
  try {
    const state = await getStateData()

    return state.getResponse
  } catch (error) {
    throw error.message
  }
})

//update State
export const updateState = createAsyncThunk('update/updateState', async ({ id, data }, { rejectWithValue }) => {
  try {
    const state = await updateStateData(id, data)

    return state
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const stateSlice = createSlice({
  name: 'state',
  initialState,

  extraReducers: builder => {
    builder ///////////////////////Get All State ////////////////////////
      .addCase(getState.pending, state => {
        state.loading = true
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getState.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      }) //////////////////////////Create New State///////////////////////////
      .addCase(createState.pending, state => {
        state.status = 'loading'
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.formData = action.payload
      })
      .addCase(createState.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }) ///////////////////Update State//////////////////
      .addCase(updateState.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.formData = action.payload
      })
      .addCase(updateState.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default stateSlice.reducer
