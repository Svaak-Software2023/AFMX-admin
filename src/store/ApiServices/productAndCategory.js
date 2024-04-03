import { Alert } from '@mui/material';
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



// ///////------------------------  product -------------///////////////

export const addProduct = async (form_Data) => {
  try {
    const formData = new FormData();
    for (const [key, val] of Object.entries(form_Data)){
      if(key === 'productImage'){
        for(const img of val){
          formData.append(key, img);
        }
      }else{
        formData.append(key, val);
      }
    }
    
    const response = await axios.post('/add-product', formData)
    return response.data
  } catch (error) {
    throw error
  }
};


export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`/update-product-category/${id}`, categoryData)
    return response.data
  } catch (error) {
    throw error
  }
}


export const updateCategoryStatus = async (id, isTrue) => {
  try {
    const response = await axios.patch(`/delete-product-category/${id}`, {"isActive":isTrue})
    return response.data
  } catch (error) {
    throw error
  }
};

export const updateProductStatus = async (productId, isTrue) => {
  try {
    const response = await axios.patch(`/delete-product/${productId}`, {"isActive":isTrue})
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateProduct = async (productId,form_Data) => {
  try {
    const formData = new FormData();
    for (const [key, val] of Object.entries(form_Data)){
      if(key === 'productImage'){
        for(const img of val){
          formData.append(key, img);
        }
      }else{
        formData.append(key, val);
      }
    };
    formData = Object.fromEntries(formData.entries());

    const response = await axios.put(`/update-product/${productId}`, formData)
    return response.data
  } catch (error) {
    throw error
  }
}
