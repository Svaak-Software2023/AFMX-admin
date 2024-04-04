import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_baseURL;

//create a new Service Department
export const postServiceDepartmentData = async formData => {
  try {
    const response = await axios.post('/create-service-department', formData)

    const data = await response.data

    return data.serviceDepartmentResponse
  } catch (error) {
    throw error
  }
}

//Get a service department
export const getServiceDepartmentData = async () => {
  try {
    const reponse = await axios.get('/all-service-department')

    const data = await reponse.data

    return data.getResponse
  } catch (error) {
    throw error
  }
}

//Update a service department
export const updateServiceDepartmentData = async ({ id, data }) => {
  try {
    const response = await axios.put(`/update-service-deparment/${id}`, data)

    return response.data
  } catch (error) {
    throw error
  }
}
