import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProductCategory,addProductCategory, allProductByCategoryId, singleProductById } from '../ApiServices/productAndCategory'



//Get Country Details
export const getProductAndcategory = createAsyncThunk("/get/all-product-category", async () => {
    try {
        const response = await getProductCategory()
        return response
    } catch (err) {
        // console.log(err);
        return err.response
    }
});

//Add category
export const addProduct_Category = createAsyncThunk("/add/product-category", async (formData) => {
    try {
        const response = await addProductCategory(formData)
        return response
    } catch (err) {
        return err.response
    }
});


//allProductByCategoryId
export const allProduct_By_CategoryId = createAsyncThunk("/all-product/:CategoryId", async (categoryId) => {
    try {
        const response = await allProductByCategoryId(categoryId)
        return response
    } catch (err) {
        return err.response
    }
});


//single product by id
export const single_ProductBy_Id = createAsyncThunk("single/products/:productId", async (productId) => {
    try {
        const response = await singleProductById(productId)
        return response
    } catch (err) {
        return err.response
    }
});





const productAndCategorySlice = createSlice({
    name: "ProductAndCategory",
    initialState: {
        allProducts: {
            productsList:[],
            message: "",
            error: "",
            loading: false,
            status:""
        },
        singleProduct: {
            productDetails:{},
            loading:false,
            error: "",
            message: "",
            status:""
        },
        singleCategory: {},
        allCategory:[],
        message: "",
        error: "",
        loading: false,
        status:""
    },
    reducers: {},
    extraReducers: {
        [getProductAndcategory.pending]:(state,action)=>{
            state.loading=true
            state.status = 'loading'
        },
        [getProductAndcategory.fulfilled]:(state,action)=>{
            state.message = action.payload?.message
            state.loading=false
            state.allCategory=action.payload?.productCategoryResponse
            state.status = 'succeeded'
        },
        [getProductAndcategory.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
        [addProduct_Category.pending]:(state,action)=>{
            state.loading=true
            state.status = 'loading'
        },
        [addProduct_Category.fulfilled]:(state,action)=>{
            state.message = action.payload?.message
            state.loading=false
            state.allCategory.push(action.payload?.categoryResponse)
            state.status = 'succeeded'
        },
        [addProduct_Category.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
        [allProduct_By_CategoryId.pending]:(state,action)=>{
            state.allProducts.loading=true
            state.allProducts.status = 'loading'
        },
        [allProduct_By_CategoryId.fulfilled]:(state,action)=>{
            state.allProducts.message = action.payload?.message
            state.allProducts.loading=false
            state.allProducts.productsList = action.payload?.productResponse
            state.allProducts.status = 'succeeded'
        },
        [allProduct_By_CategoryId.rejected]:(state,action)=>{
            state.allProducts.loading=false
            state.allProducts.error=action.payload
            state.allProducts.status = 'failed'
        },
        [single_ProductBy_Id.pending]:(state,action)=>{
            state.singleProduct.loading=true
            state.singleProduct.status = 'loading'
        },
        [single_ProductBy_Id.fulfilled]:(state,action)=>{
            state.singleProduct.message = action.payload?.message
            state.singleProduct.loading=false
            state.singleProduct.productDetails = action.payload?.productSingleResponse
            state.singleProduct.status = 'succeeded'
        },
        [single_ProductBy_Id.rejected]:(state,action)=>{
            state.singleProduct.loading=false
            state.singleProduct.error=action.payload
            state.singleProduct.status = 'failed'
        },
    }
})

// Export The reducer
export default productAndCategorySlice.reducer
