import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_baseURL;

export const adminLoginData = async data => {
  try {
    const response = await axios.post('/admin-login', data)

    return response.data
  } catch (error) {
    throw error
  }
}
