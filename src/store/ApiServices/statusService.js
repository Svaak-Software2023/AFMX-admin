import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_baseURL;

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
