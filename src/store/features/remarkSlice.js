import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllRemarks, updateRemarks } from '../ApiServices/remarkService'
import { fabClasses } from '@mui/material'

const initialState = {
  data: [],
  loading: false,
  error: null
}

//Upadte Remark
export const updateRemark = createAsyncThunk('data/updateRemarkData', async (remarkData, { rejectWithValue }) => {
  try {
    const remark = await updateRemarks(remarkData)

    return remark
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

//All Remarks of Complainee

export const getAllRemark = createAsyncThunk('data/allRemarkData', async id => {
  console.log('Slice PAge')
  console.log('Id:', id)
  try {
    const remark = await getAllRemarks(id)
    const data = await remark.getResponse

    return data
  } catch (error) {
    return error
  }
})

export const remarkSlice = createSlice({
  name: 'remark',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getAllRemark.pending, state => {
        state.loading = true
      })
      .addCase(getAllRemark.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getAllRemark.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default remarkSlice.reducer
