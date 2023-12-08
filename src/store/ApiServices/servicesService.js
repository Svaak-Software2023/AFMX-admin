import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

// Get All Services Data
export const getServicesData = async () => {
  try {
    const response = await axios.get('/all-services')
    const servicesData = response.data

    return servicesData.getResponse
  } catch (error) {
    throw error
  }
}
