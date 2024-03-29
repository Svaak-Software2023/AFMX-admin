import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'


// Get All categories Details
export const getProductCategory = async () => {
  try {
    const reponse = await axios.get('/all-product-category');
    const data = await reponse.data
    return data
  } catch (error) {
    throw error
  }
};


export const addProductCategory = async data => {
  try {
    const response = await axios.post('/add-product-category', data)
    return response.data
  } catch (error) {
    throw error
  }
};


export const allProductByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(`/all-product/${categoryId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const singleProductById = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

