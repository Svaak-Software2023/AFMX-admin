import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

//Get All Banner
export const getAllBannerData = async () => {
  try {
    const response = await axios.get('/all-banner')
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

// Update Banner data
export const updateBannerData = async (id, updatedBanner) => {
  try {
    const response = await axios.put(`banner-update/${id}`, updatedBannner)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}
