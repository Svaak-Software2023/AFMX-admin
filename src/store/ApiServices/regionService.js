import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

///////////////////COUNTRY API////////////////
//Create New Country
export const postCounrtyData = async data => {
  try {
    const response = await axios.post('/register-country', data)

    return response.data
  } catch (error) {
    throw error
  }
}

// Get All Countries Details
export const getCountryData = async () => {
  try {
    const reponse = await axios.get('/all-country')
    const data = await reponse.data

    return data
  } catch (error) {
    throw error
  }
}

// Update country
export const updateCountryData = async (id, updatedCountry) => {
  try {
    console.log('Service Data', updatedCountry)

    const response = await axios.put(`/update-country/${id}`, updatedCountry)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

//////////////////STATE API //////////////////

//Create a new state

export const postStateData = async data => {
  try {
    const response = await axios.post('/register-state', data)

    return response.data
  } catch (error) {
    throw error
  }
}

//Get a state
export const getStateData = async () => {
  try {
    const response = await axios.get('/all-state')

    return response.data
  } catch (error) {
    throw error
  }
}

//Update State
export const updateStateData = async (id, updatedState) => {
  try {
    const response = await axios.put(`/update-state/${id}`, updatedState)

    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}

//Update a state

/////////////////City API //////////////////

//Create a new city
export const postCityData = async data => {
  try {
    const response = await axios.post('/register-city', data)
    const city = await response.data

    return city
  } catch (error) {
    throw error
  }
}

//Get a city

export const getCityData = async () => {
  try {
    const response = await axios.get('/all-city')

    return response.data
  } catch (error) {
    throw error
  }
}

// update City

export const updateCityData = async (id, updatedCity) => {
  try {
    const response = await axios.put(`/update-city/${id}`, updatedCity)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
}
