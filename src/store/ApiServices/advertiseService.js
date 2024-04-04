import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_baseURL;

//Get All Banner
export const getAllAdvertiseData = async () => {
  try {
    const response = await axios.get('/all-advertise')
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

// Update Banner data
export const updateAdvertiseData = async (id, updatedAdvertise) => {
  try {
    const response = await axios.put(`advertise-update/${id}`, updatedAdvertise)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

//Change Advertise Status
export const ChangeAdvertiseData = async (id, changedAdvertise) => {
  try {
    const response = await axios.patch(`advertise-delete/${id}`, changedAdvertise)
    const data = await response.data
    console.log(data)

    return data
  } catch (error) {
    throw error
  }
}
