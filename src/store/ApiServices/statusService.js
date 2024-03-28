import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

export const updateComplaintStatus = async (id, statusData) => {
  console.log('service>>>>Id:', id, 'Status:', statusData)
  try {
    const response = await axios.put(`/update-complaintStatus/${id}`, statusData)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}
