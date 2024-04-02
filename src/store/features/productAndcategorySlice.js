import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProductCategory,addProductCategory, allProductByCategoryId, singleProductById, addProduct,updateCategory,updateCategoryStatus, updateProductStatus, updateProduct } from '../ApiServices/productAndCategory'



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



////////////------------product---------------------------/////////////////////////////

export const add_new_Product = createAsyncThunk("/new/add-product", async (formData) => {
    try {
        const response = await addProduct(formData);
        return response
    } catch (err) {
        return err.response
    }
});


export const update_Category = createAsyncThunk('/update/product-category/', async ({ id, categoryData }, { rejectWithValue }) => {
    try {
        const response = await updateCategory(id, categoryData)
        return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })

export const updateCategory_Status = createAsyncThunk('/delete/product-category/', async ({ id, isTrue }, { rejectWithValue }) => {
    try {
        const response = await updateCategoryStatus(id, isTrue)
        return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  });


export const updateProduct_Status = createAsyncThunk('/delete/-product/', async ({ productId, isTrue }, { rejectWithValue }) => {
    try {
        const response = await updateProductStatus(productId, isTrue)
        return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  });


  export const update_Product = createAsyncThunk('/update/product/', async ({ productId,formData }, { rejectWithValue }) => {
    try {
        const response = await updateProduct(productId, formData)
        return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })





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
        [add_new_Product.pending]:(state,action)=>{
            state.allProducts.loading=true
            state.allProducts.status = 'loading'
        },
        [add_new_Product.fulfilled]:(state,action)=>{
            state.allProducts.message = action.payload?.message
            state.allProducts.loading=false
            state.allProducts.productsList.push(action.payload?.productResponse)
            state.allProducts.status = 'succeeded' // action.payload?.productResponse
        },
        [add_new_Product.rejected]:(state,action)=>{
            state.allProducts.loading=false
            state.allProducts.error=action.payload
            state.allProducts.status = 'failed'
        },
        [update_Category.pending]:(state,action)=>{
            state.loading=true
            state.status = 'loading'
        },
        [update_Category.fulfilled]:(state,action)=>{
            state.message = action.payload?.message
            state.loading=false
            state.allCategory = state.allCategory.map((x)=>{
                if(x.productCategoryId === action.payload?.categoryUpdateResponse.productCategoryId){
                    x.productCategoryName = action.payload?.categoryUpdateResponse.productCategoryName,
                    x.productCategoryDescription = action.payload?.categoryUpdateResponse.productCategoryDescription
                }
                return x
            })
            state.status = 'succeeded'
        },
        [update_Category.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
        [updateCategory_Status.pending]:(state,action)=>{
            state.loading=true
            state.status = 'loading'
        },
        [updateCategory_Status.fulfilled]:(state,action)=>{
            state.message = action.payload?.message
            state.loading=false
            state.allCategory = state.allCategory.map((x)=>{
                if(x.productCategoryId === action.payload?.categoryDeleteResponse.productCategoryId){
                    x.isActive = action.payload?.categoryDeleteResponse.isActive
                }
                return x
            })
            state.status = 'succeeded'
        },
        [updateCategory_Status.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
        [updateProduct_Status.pending]:(state,action)=>{
            state.allProducts.loading=true
            state.allProducts.status = 'loading'
        },
        [updateProduct_Status.fulfilled]:(state,action)=>{
            state.allProducts.message = action.payload?.message
            state.allProducts.loading=false
            state.allProducts.productsList = state.allProducts.productsList.map((x)=>{
                if(x.productId === action.payload?.productDeleteResponse.productId){
                    x.isActive = action.payload?.productDeleteResponse.isActive
                }
                return x
            })
            state.allProducts.status = 'succeeded'
        },
        [updateProduct_Status.rejected]:(state,action)=>{
            state.allProducts.loading=false
            state.allProducts.error=action.payload
            state.allProducts.status = 'failed'
        },
        [update_Product.pending]:(state,action)=>{
            state.allProducts.loading=true
            state.allProducts.status = 'loading'
        },
        [update_Product.fulfilled]:(state,action)=>{
            state.allProducts.message = action.payload?.message
            state.allProducts.loading=false
            state.allProducts.productsList = state.allProducts.productsList.map((x)=>{
                if(x.productId === action.payload?.productUpdateResponse.productId){
                    x.productName = action.payload?.productUpdateResponse.productName
                    x.productDescription = action.payload?.productUpdateResponse.productDescription
                    x.productCategoryName = action.payload?.productUpdateResponse.productCategoryName
                    x.productBrand = action.payload?.productUpdateResponse.productBrand
                    x.quantity = action.payload?.productUpdateResponse.quantity
                    x.productMRP = action.payload?.productUpdateResponse.productMRP
                    x.productPrice = action.payload?.productUpdateResponse.productPrice
                    x.upcCode = action.payload?.productUpdateResponse.upcCode
                    x.skuCode = action.payload?.productUpdateResponse.skuCode
                    x.discount = action.payload?.productUpdateResponse.discount
                    x.fragrances = action.payload?.productUpdateResponse.fragrances
                    x.containerType = action.payload?.productUpdateResponse.containerType
                    x.cleanerForm = action.payload?.productUpdateResponse.cleanerForm
                    x.containerSize = action.payload?.productUpdateResponse.containerSize
                    x.productImage = action.payload?.productUpdateResponse.productImage
                    x.isActive = action.payload?.productUpdateResponse.isActive
                }
                return x
            })
            state.allProducts.status = 'succeeded'
        },
        [update_Product.rejected]:(state,action)=>{
            state.allProducts.loading=false
            state.allProducts.error=action.payload
            state.allProducts.status = 'failed'
        },
    }
})

// Export The reducer
export default productAndCategorySlice.reducer
