import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

const serviceApi = 'http://localhost:5000/api/create-service'

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

// Create new Service with file uploads
// export const postServiceData = async Data => {
//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   }

//   try {
//     const response = await axios.post('/create-service', Data, config)

//     // Get the response data
//     const responseData = response.data

//     return responseData
//   } catch (error) {
//     throw error
//   }
// }

export const postServiceData = async formData => {
  console.log('Service Data: ', formData)

  const requestOptions = {
    method: 'POST',
    body: formData
  }

  try {
    await fetch(serviceApi, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return response.json()
      })
      .then(data => {
        console.log('File Upload Response:', data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  } catch (error) {}
}
