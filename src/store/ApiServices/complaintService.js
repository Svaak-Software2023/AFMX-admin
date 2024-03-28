import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

//Get All Complaints
export const getAllComplaints = async () => {
  try {
    const response = await axios.get('/all-complaints')
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

//Update Complaints
export const updateComplaint = async (id, data) => {
  try {
    const response = await axios.put(`/update-complaint/${id}`, data)
    const responseData = await response.data

    return responseData
  } catch (error) {
    throw error
  }
}
