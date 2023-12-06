import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

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
    console.log(`id: ${id}, data: ${JSON.stringify(changedAdvertise)}`)

    const response = await axios.patch(`advertise-delete/${id}`, changedAdvertise)
    const data = await response.data
    console.log(data)

    return data
  } catch (error) {
    throw error
  }
}
