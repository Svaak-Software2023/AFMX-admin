import {
    Card,
    CardContent,
    TextField,
    InputLabel,
    Grid,
    Button,
    TextareaAutosize,
    Typography,
    Divider,
    CardActions,
    FormControl,
    MenuItem,
    Select
  } from '@mui/material'
  import React, { useEffect, useState } from 'react'
  
  import { useDispatch, useSelector } from 'react-redux'
  import { update_Product} from 'src/store/features/productAndcategorySlice'
  import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useRouter } from 'next/router'
  
  const ProductModel = ({ handleClose, getid, showSuccessMessage }) => {
    // --------------- Redux Store -----------------------
    const dispatch = useDispatch()
    const { allProducts:{productsList,status} } = useSelector(state => state.productAndcategoryData);
    const singleProduct = productsList?.find(i => i.productId === getid);
    const { allCategory } = useSelector(state => state.productAndcategoryData);

    console.log('//////////,,,,,,,,,,,,,,,',singleProduct?.productImage);

  
    // --------------------------- Use State -------------------------------
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);

    const [editedProduct, setEditedProduct] = useState({
        productName: singleProduct?.productName,
        productDescription: singleProduct?.productDescription,
        productCategoryName: allCategory.find(e => e?.productCategoryId === singleProduct?.productCategoryId)?.productCategoryName,
        productBrand: singleProduct?.productBrand,
        quantity: singleProduct?.quantity,
        productMRP: singleProduct?.productMRP,
        productPrice: singleProduct?.productPrice,
        upcCode: singleProduct?.upcCode,
        skuCode: singleProduct?.skuCode,
        discount: singleProduct?.discount,
        fragrances: singleProduct?.fragrances,
        containerType: singleProduct?.containerType,
        cleanerForm: singleProduct?.cleanerForm,
        containerSize: singleProduct?.containerSize
        })
  
        
    // -------------------------- Handle Change --------------------------------
    const handleTextFieldChange = (field, value) => {
        setEditedProduct(prev => ({
        ...prev,
        [field]: value
      }))
    }
  
    //------------------------------Update Action --------------------------------
    const handleUpdate = e => {
      e.preventDefault();
      dispatch(update_Product({ productId: getid, formData: editedProduct })).then((x)=>handleClose())
    }

    useEffect(()=>{
        setImageURLs([...singleProduct?.productImage])
    },[singleProduct?.productImage])

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs([...singleProduct?.productImage,...newImageUrls]);
      }, [images]);

    const onImageChange =(e) => {
        const productImage = [...e.target.files];
        setEditedProduct({...editedProduct,productImage})
        setImages([...e.target.files]);
      }
  
    //-----------------------------------//---------------------------------------------
    return (
      <>
       <Card>
        {editedProduct?.productName && (
          <>
            <form onSubmit={handleUpdate}>
              <CardContent>
                <Typography variant='h6' sx={{ textAlign: 'left', margin: 0 }}>
                  Update Product
                </Typography>
                <Divider />
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Product Name'
                        name='productName'
                        placeholder='Enter Product Name'
                        value={editedProduct?.productName}
                        onChange={e => handleTextFieldChange('productName', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                  
                       <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Category Name</InputLabel>
                        <Select label='Select Category Name' name='productCategoryName' value={editedProduct?.productCategoryName} onChange={e => handleTextFieldChange('productCategoryName', e.target.value)}>
                          {(allCategory.map(({_id,productCategoryName})=>(
                            <MenuItem value={productCategoryName} key={_id} >{productCategoryName}</MenuItem>
                          )))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Brand Name'
                        name='productBrand'
                        placeholder='Enter Brand Name'
                        value={editedProduct?.productBrand}
                        onChange={e => handleTextFieldChange('productBrand', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Quantity'
                        name='quantity'
                        placeholder='Enter Quantity'
                        value={editedProduct?.quantity}
                        onChange={e => handleTextFieldChange('quantity', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='MRP'
                        name='productMRP'
                        placeholder='Enter MRP'
                        value={editedProduct?.productMRP}
                        onChange={e => handleTextFieldChange('productMRP', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Price'
                        name='productPrice'
                        placeholder='Enter Price'
                        value={editedProduct?.productPrice}
                        onChange={e => handleTextFieldChange('productPrice', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='UPC Code'
                        name='upcCode'
                        placeholder='Enter UPC'
                        value={editedProduct?.upcCode}
                        onChange={e => handleTextFieldChange('upcCode', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='SKU Code'
                        name='skuCode'
                        placeholder='Enter SKU'
                        value={editedProduct?.skuCode}
                        onChange={e => handleTextFieldChange('skuCode', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Discount '
                        name='discount'
                        placeholder='Enter Discount'
                        value={editedProduct?.discount}
                        onChange={e => handleTextFieldChange('discount', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Fragrances '
                        name='fragrances'
                        placeholder='Enter Fragrances'
                        value={editedProduct?.fragrances}
                        onChange={e => handleTextFieldChange('fragrances', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Container Type '
                        name='containerType'
                        placeholder='Enter Container Type'
                        value={editedProduct?.containerType}
                        onChange={e => handleTextFieldChange('containerType', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Cleaner Form'
                        name='cleanerForm'
                        placeholder='Enter Cleaner Form'
                        value={editedProduct?.cleanerForm}
                        onChange={e => handleTextFieldChange('cleanerForm', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Container Size'
                        name='containerSize'
                        placeholder='Enter Container Size'
                        value={editedProduct?.containerSize}
                        onChange={e => handleTextFieldChange('containerSize', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Button
                    variant="contained"
                    component="label">
                      Upload File
                  <input type="file" hidden multiple accept="image/*" onChange={onImageChange} />
                    </Button>
                    </Grid>
                    {imageURLS.map((imageSrc,index) => (
                    <Grid item xs={3} sm={3} key={index}>
                    <img src={imageSrc} alt="not fount" width={"250px"} />
                    </Grid>
                      ))}

                    <Grid item xs={12} sm={12}>
                    <InputLabel>Product Description</InputLabel>
                      <TextareaAutosize
                        fullWidth
                        isRequired={true}
                        name='productDescription'
                        label='Product Description'
                        value={editedProduct?.productDescription}
                        onChange={e => handleTextFieldChange('productDescription', e.target.value)}
                        minRows={10}
                        cols={155}
                      /> 
                    </Grid>
                  </Grid>
                </DatePickerWrapper>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button size='medium' type='submit' variant='contained'>
                  {status === 'loading' ? 'Submitting...' : 'Submit'}
                </Button>
              </CardActions>
            </form>
          </>
        )}
      </Card>
      </>
    )
  }
  
  export default ProductModel
  