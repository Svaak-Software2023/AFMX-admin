import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

export const updateRemarks = async remarkData => {
  try {
    const response = await axios.post('/create-complaint-remarks', remarkData)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

export const getAllRemarks = async id => {
  try {
    const response = await axios.get(`/all-complaint-portal/${id}`)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}
