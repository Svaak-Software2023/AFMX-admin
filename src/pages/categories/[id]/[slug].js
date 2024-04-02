import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles'

// ** MUI Imports
import {
  Card,TextareaAutosize,
  Grid,
  Button,
  Divider,
  TextField,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Alert,
  Snackbar,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { StyledUpdateButton, StyledDeleteButton } from 'src/views/icons'

// ** Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import {addProduct_Category,allProduct_By_CategoryId, getProductAndcategory,add_new_Product,updateProduct_Status } from 'src/store/features/productAndcategorySlice'

import DataTable from 'react-data-table-component'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import AddIcon from '@mui/icons-material/Add'
import ProductModel from './productModel'
import PublicIcon from '@mui/icons-material/Public'
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import Switch from '@mui/material/Switch'
import { pink } from '@mui/material/colors'
import { customStyles } from 'src/Common'
import Link from 'next/link'

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600]
  }
}))

const label = { inputProps: { 'aria-label': 'Color switch demo' } }

// table funtion
const Active = styled('p')(() => ({
  color: 'green'
}))

const InActive = styled('p')(() => ({
  color: 'red'
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  overflow: 'scroll',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '98%',
  width: '80%'
}

const Products = () => {
  const router = useRouter();
  const categoryId = router.query.id;
  const slug = router.query.slug;
  // -----------------------------------REDUX STORE ------------------------------------
  const dispatch = useDispatch();
  const { allProducts:{productsList, loading, status,message} } = useSelector(state => state.productAndcategoryData)
  let { allCategory } = useSelector(state => state.productAndcategoryData)
  allCategory = allCategory.filter(e => e.productCategoryId == categoryId);
  // --------------------------------------UseState --------------------------------
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [toggle, setToggle] = useState(true)
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productCategoryName: "",
    productBrand: "",
    quantity: "",
    productMRP: "",
    productPrice: "",
    upcCode: "",
    skuCode: "",
    discount: "",
    fragrances: "",
    containerType: "",
    cleanerForm: "",
    containerSize: "",
    productDescription: '',
    productImage: []
  })


  //------------------------------------Open & Close Modal ---------------------------
  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleAddForm = () => {
    setFormVisible(prev => !prev)
  }


  useEffect(() => {
    if(categoryId){
      dispatch(allProduct_By_CategoryId(categoryId))
    }
   
  }, [categoryId])

  useEffect(() => {
    dispatch(getProductAndcategory())
  }, [dispatch])

  //-------------------Handle Switch -------------------
  const handleSwitch = () => {
    setToggle(prevToggle => !prevToggle)
  }

  const updateStatus = (productId,isTrue) => {
    console.log('/////////////////////',isTrue);
    dispatch(updateProduct_Status({productId, isTrue})).then((x)=>showSuccessMessage('Status updated successfully'));
  }

  // ------------------------------------------ React Data Table --------------------------------
  const columns = [
    {
      name: 'Sr.No',
      selector: (_,index) => index+1,
      sortable: true
    },
    {
      name: 'Name',
      selector: row => row.productName?.toUpperCase(),
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: 'Brand',
      selector: row => row.productBrand?.toUpperCase(),
      sortable: true,
      wrap: true,
      grow:2
    },
    {
      name: 'Price',
      selector: row => row.productPrice,
      sortable: true
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => (row.isActive ? <Button onClick={()=>updateStatus(row.productId,false)}><Active>Active</Active></Button> : <Button onClick={()=>updateStatus(row.productId,true)}><InActive>Inactive</InActive></Button>)
    },
    {
      name: 'Product',
      cell: row => (
        <>
        <Link href={`/categories/${categoryId}/product/${row.productId}`}   color='success'>View</Link> &nbsp; &nbsp;
        <StyledUpdateButton onClick={id => handleOpen(row.productId)} titleAccess='edit product' />
        </>
      )
    }
  ];

  // ----------------------------------------- Handle Changes for multiple images or single image--------------------------------

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const onImageChange =(e) => {
    const productImage = [...e.target.files]
    setFormData({...formData,productImage})
    setImages([...e.target.files]);
  }



    // ----------------------------------------- Handle Changes --------------------------------
    const handleChange = e => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value,isActive:( name == 'isActive') ? value : formData.isActive
      })
    }

  //-----------------------------------------------Actions -------------------------------------------
  //------------------Submit form-------
  const handleSubmit = e => {
    e.preventDefault()
    try {
      if(checkProperties(formData)) return
      dispatch(add_new_Product(formData)).then((x)=>showSuccessMessage('Product Created successfully'));
      setFormData({
        productName: "",
        productCategoryName: "",
        productBrand: "",
        quantity: "",
        productMRP: "",
        productPrice: "",
        upcCode: "",
        skuCode: "",
        discount: "",
        fragrances: "",
        containerType: "",
        cleanerForm: "",
        containerSize: "",
        productDescription: '',
        productImage: []
      })
      setFormVisible(false)
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  function checkProperties(obj) {
    if(!obj.productName && !obj.productCategoryName && !obj.productBrand && !obj.quantity && !obj.productMRP && !obj.productPrice && !obj.upcCode && !obj.skuCode && !obj.discount && !obj.fragrances && !obj.containerType && !obj.cleanerForm && !obj.containerSize && !obj.productDescription && !obj.productImage.length){
      return true
    }
    return false
    }

  // ----------------Delete ----------
  const handleDelete = async id => {
    // try {
    //   const data = await data?.find(i => i.countryId === id)
    //   dispatch(updateCountry({ id: id, data: { ...data, isActive: false } }))
    //   dispatch(getCountry())
    // } catch (error) {
    //   throw error
    // }
  }

 


  // ----------------------------------Export To Excel Data --------------------------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'Country_data.xlsx')
  }

  // -------------------------------------- Notifications -----------------------------

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  //-----------------------------------------//--------------------------------------------------

  return (
    <>
      {/* Form */}
      <Card>
        {isFormVisible && (
          <>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Typography variant='h6' sx={{ textAlign: 'left', margin: 0 }}>
                  Add Product
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
                        value={formData.productName}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                  
                       <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Category Name</InputLabel>
                        <Select label='Select Category Name' name='productCategoryName' value={formData.productCategoryName} onChange={handleChange}>
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
                        value={formData.productBrand}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Quantity'
                        name='quantity'
                        placeholder='Enter Quantity'
                        value={formData.quantity}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='MRP'
                        name='productMRP'
                        placeholder='Enter MRP'
                        value={formData.productMRP}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Price'
                        name='productPrice'
                        placeholder='Enter Price'
                        value={formData.productPrice}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='UPC Code'
                        name='upcCode'
                        placeholder='Enter UPC'
                        value={formData.upcCode}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='SKU Code'
                        name='skuCode'
                        placeholder='Enter SKU'
                        value={formData.skuCode}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Discount '
                        name='discount'
                        placeholder='Enter Discount'
                        value={formData.discount}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Fragrances '
                        name='fragrances'
                        placeholder='Enter Fragrances'
                        value={formData.fragrances}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Container Type '
                        name='containerType'
                        placeholder='Enter Container Type'
                        value={formData.containerType}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Cleaner Form'
                        name='cleanerForm'
                        placeholder='Enter Cleaner Form'
                        value={formData.cleanerForm}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Container Size'
                        name='containerSize'
                        placeholder='Enter Container Size'
                        value={formData.containerSize}
                        onChange={handleChange}
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
                    <Grid item xs={12} sm={12}>
                    {imageURLS.map((imageSrc,index) => (
                    <img key={index} src={imageSrc} alt="not fount" width={"250px"} />
                      ))}
                    </Grid>

                    <Grid item xs={12} sm={12}>
                    <InputLabel>Product Description</InputLabel>
                      <TextareaAutosize
                        fullWidth
                        isRequired={true}
                        name='productDescription'
                        label='Product Description'
                        value={formData.productDescription}
                        onChange={handleChange}
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

      {/*Country Table */}

      {/* ---------------------------------------------------------------------------- */}
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }} >
        <span style={{cursor:"pointer"}} onClick={() => router.back()} title="go back"><TurnLeftIcon /> &nbsp; Products List</span>
      </Typography>
      <Grid item xs={12} sx={{ marginTop: '5px' }}>
        <Card>
          <Divider sx={{ margin: '0' }} />
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={productsList}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box className='actions-right' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <TextField
                    size='small'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Magnify fontSize='small' />
                        </InputAdornment>
                      )
                    }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Button onClick={handleAddForm} sx={{ mr: 1 }} variant='contained' size='small' color='success'>
                    <AddIcon /> Add
                  </Button>

                  <Button
                    variant='contained'
                    size='small'
                    onClick={exportToExcel}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Export to Excel &nbsp;
                    <SiMicrosoftexcel style={{ fontSize: '1.3rem' }} />
                  </Button>
                </Box>
              </Box>
            }
            subHeaderAlign='right'
          />
        </Card>
      </Grid>

      {/* Model to Update Country */}
      {/* ------------------------------------------------------------------------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          {<ProductModel getid={getid} handleClose={handleClose} showSuccessMessage={showSuccessMessage} />}
        </Box>
      </Modal>
      {/* ----------------------------------------------------------------------------------------- */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Products

