import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateComplaintStatus } from '../ApiServices/statusService'

const initialState = {
  data: [],
  loading: false,
  error: null
}

//Upadte Remark
export const updateStatus = createAsyncThunk('data/updateRemarkData', async ({ complaintStatusId, status }) => {
  console.log('Slice>>>>>>ID:', complaintStatusId, 'Status:', status)
  try {
    const remark = await updateComplaintStatus(complaintStatusId, status)

    return remark
  } catch (error) {
    throw error
  }
})
