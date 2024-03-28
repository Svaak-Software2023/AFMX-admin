import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllComplaints, updateComplaint } from '../ApiServices/complaintService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

//get all complaints
export const getComplaints = createAsyncThunk('data/fetchComplaintsData', async () => {
  try {
    const complaints = await getAllComplaints()
    const data = complaints.getResponse

    return data
  } catch (error) {
    throw error
  }
})

//update Complaint
export const updateComplaints = createAsyncThunk(
  'data/updateComplaintData',
  async ({ id, data }, { rejectWithValue }) => {
    console.log('ID: ', id, ' data: ', data)

    try {
      const complaint = await updateComplaint(id, data)

      const complaints = await getAllComplaints()

      return complaints.getResponse
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const complaintSlice = createSlice({
  name: 'Complaints',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getComplaints.pending, state => {
        state.loading = true
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateComplaints.pending, state => {
        state.loading = true
      })
      .addCase(updateComplaints.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateComplaints.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default complaintSlice.reducer
