import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

export const adminLoginData = async data => {
  try {
    const response = await axios.post('/admin-login', data)

    return response.data
  } catch (error) {
    throw error
  }
}
