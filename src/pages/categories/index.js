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
import VisibilityIcon from '@mui/icons-material/Visibility';

import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { StyledUpdateButton, StyledDeleteButton } from 'src/views/icons'

// ** Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import { getProductAndcategory,addProduct_Category,updateCategory_Status } from 'src/store/features/productAndcategorySlice'

import DataTable from 'react-data-table-component'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import AddIcon from '@mui/icons-material/Add'
import CategoriesModel from './categoriesModel'
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
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 'auto',
  width: '80%'
}

const Index = () => {
  // -----------------------------------REDUX STORE ------------------------------------
  const dispatch = useDispatch();
  const { allCategory, loading, status } = useSelector(state => state.productAndcategoryData)
console.log('allProducts----------------',allCategory);
  // --------------------------------------UseState --------------------------------
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [toggle, setToggle] = useState(true)

  const [formData, setFormData] = useState({
    productCategoryName: '',
    productCategoryDescription: '',
    isActive: true
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

  const updateStatus = (id,isTrue) => {
    console.log('/////////////////////',isTrue);
    dispatch(updateCategory_Status({id, isTrue})).then((x)=>showSuccessMessage('Status updated successfully'));
  }

  //-------------------Handle Switch ------------------- 
  const handleSwitch = () => {
    setToggle(prevToggle => !prevToggle)
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
      selector: row => row.productCategoryName.toUpperCase(),
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: 'Description',
      selector: row => row.productCategoryDescription.toUpperCase(),
      sortable: true,
      wrap: true,
      grow:2
    },

    {
      name: 'Created',
      selector: row => (row.updatedDate ? row.updatedDate.split('T')[0] : 'N/A')
    },
    {
      name: 'Updated',
      selector: row => (row.updatedDate ? row.updatedDate.split('T')[0] : 'N/A')
    },

    {
      name: 'Status',
      selector: row => (row.isActive ? <Button onClick={()=>updateStatus(row.productCategoryId,false)}><Active>Active</Active></Button> : <Button onClick={()=>updateStatus(row.productCategoryId,true)}><InActive>Inactive</InActive></Button>)
    },
    {
      name: 'Actions',
      cell: row => (
        <>
        <Link href={`/categories/${row.productCategoryId}/products`} color='success'>View</Link>  &nbsp; &nbsp;
        <StyledUpdateButton onClick={id => handleOpen(row.productCategoryId)} titleAccess='edit category' />
        </>
      )
    }
  ];

<Button sx={{ mr: 1 }} variant='contained' size='small' color='success'></Button>
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
      if(!formData.productCategoryName && !formData.productCategoryDescription) return
      dispatch(addProduct_Category(formData)).then((x)=>showSuccessMessage('Category Created successfully'));
      setFormData({
        productCategoryName: '',
        productCategoryDescription: '',
        isActive: true
      })
      setFormVisible(false)
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
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

  //----------------------------Use Effects --------------------------------
  useEffect(() => {
    dispatch(getProductAndcategory())
  }, [dispatch])



  useEffect(() => {
    const result = allCategory?.filter(item => {
      const productCategoryName = item.productCategoryName.toLowerCase().includes(search.toLowerCase())
      const productCategoryDescription = item.productCategoryDescription.toLowerCase().includes(search.toLowerCase())
      console.log('productCategoryName || productCategoryDescription',productCategoryName);
      return productCategoryName || productCategoryDescription
    })
    setFilter(result)
    console.log('ffffffffffffff',filter);
  }, [search,allCategory])
  // ----------------------------------Export To Excel Data --------------------------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : allCategory)
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
                  Add Category
                </Typography>
                <Divider />
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Category Name'
                        name='productCategoryName'
                        placeholder='Enter Category Name'
                        value={formData.productCategoryName}
                        onChange={handleChange}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Active</InputLabel>
                        <Select label='Select Continent' name='isActive' value={formData.isActive} onChange={handleChange}>
                          <MenuItem value='true'>True</MenuItem>
                          <MenuItem value='false'>False</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Category Description</InputLabel>
                      <TextareaAutosize
                        fullWidth
                        isRequired={true}
                        name='productCategoryDescription'
                        label='Category Description'
                        value={formData.productCategoryDescription}
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
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
         &nbsp; Categories List
      </Typography>
      <Grid item xs={12} sx={{ marginTop: '5px' }}>
        <Card>
          <Divider sx={{ margin: '0' }} />
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={filter === null ? allCategory : filter}
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
          {<CategoriesModel getid={getid} handleClose={handleClose} showSuccessMessage={showSuccessMessage} />}
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

export default Index
