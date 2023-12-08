// ** React Imports
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import Modal from '@mui/material/Modal'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { StyledUpdateButton, StyledDeleteButton } from 'src/views/icons'

import Typography from '@mui/material/Typography'
import DataTable from 'react-data-table-component'

import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { createState, getState, updateState } from 'src/store/features/stateSlice'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import { getServiceDepartment } from 'src/store/features/serviceDepartmentSlice'
import { getAllServices } from 'src/store/features/servicesSlice'
import { useRef } from 'react'

const Active = styled('p')(() => ({
  color: 'green'
}))

const InActive = styled('p')(() => ({
  color: 'red'
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
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

const FormLayoutsSeparator = () => {
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const serviceDepartmentData = useSelector(state => state.serviceDepartmentData.data)
  const servicesData = useSelector(state => state.servicesData.data)

  console.log(servicesData)

  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')

  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }

  const [successMessage, setSuccessMessage] = useState('')

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState({
    serviceDepartmentId: '',
    serviceName: '',
    serviceImage: [],
    serviceDescription: '',
    isActive: true
  })

  console.log('Form data: ', formData)

  useEffect(() => {
    dispatch(getAllServices())
    dispatch(getServiceDepartment())
  }, [dispatch])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onChange = async event => {
    const { files } = event.target

    if (files && files.length !== 0) {
      const readImage = async file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()

          reader.onload = () => {
            resolve(reader.result)
          }

          reader.onerror = error => {
            reject(error)
          }

          reader.readAsDataURL(file)
        })
      }

      try {
        const dataURLs = await Promise.all(Array.from(files, readImage))

        setFormData(prevFormData => ({
          ...prevFormData,
          serviceImage: [...prevFormData.serviceImage, ...dataURLs]
        }))
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } catch (error) {
        console.error('Error reading files:', error)
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(createState(formData))
      setFormData({})
      showSuccessMessage('Form submitted successfully')
      dispatch(getAllServices())
    } catch (error) {
      console.error('Error While submitting Form.', error)
    }
  }

  useEffect(() => {
    const result = servicesData.filter(item => {
      const serviceDepartmentId = item.serviceName.toLowerCase().includes(search.toLowerCase())
      const serviceName = item.serviceName.toLowerCase().includes(search.toLowerCase())

      return serviceDepartmentId || serviceName
    })
    setFilter(result)
  }, [search, servicesData])

  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.serviceId,
      sortable: true
    },
    {
      name: 'Service Department',
      selector: row => {
        const serviceDepartment = serviceDepartmentData.find(i => i.serviceDepartmentId === row.serviceDepartmentId)

        return serviceDepartment ? serviceDepartment.serviceDepartmentName.toUpperCase() : 'N/A'
      },
      sortable: true
    },
    {
      name: 'Services',
      selector: row => row.serviceName.toUpperCase(),
      sortable: true
    },
    {
      name: 'Service Description',
      selector: row => row.serviceDescription.toUpperCase(),
      sortable: true
    },
    {
      name: 'Service Images',
      selector: row => <p>View</p>,
      sortable: true
    },

    {
      name: 'Status',
      selector: row => (row.isActive ? <Active>Active</Active> : <InActive>Inactive</InActive>)
    },
    {
      name: 'Update',
      cell: row => <StyledUpdateButton onClick={id => handleOpen(row.serviceId)} />
    },
    {
      name: 'Delete',
      cell: row => <StyledDeleteButton onClick={id => handleUpdate(row.serviceId)} />
    }
  ]

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#ccc'
      }
    }
  }

  //   const singleState = stateData?.find(i => i.stateId === getid)

  //   const handleUpdate = async id => {
  //     try {
  //       const data = await stateData.find(i => i.stateId === id)
  //       await dispatch(updateState({ id: id, data: { ...data, isActive: false } }))
  //       await dispatch(getState())
  //     } catch (error) {
  //       throw error
  //     }
  //   }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'State_data.xlsx')
  }

  return (
    <>
      {/* Form */}
      <Card>
        <CardHeader title='AFMX State' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />

        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Service Department</InputLabel>
                  <Select
                    label='Select Service Department'
                    name='serviceDepartmentId'
                    value={formData.serviceDepartmentId}
                    onChange={handleChange}
                  >
                    {serviceDepartmentData.map(item => (
                      <MenuItem key={item.serviceDepartmentId} value={item.serviceDepartmentId}>
                        {item.serviceDepartmentName?.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label=' Service Name'
                  placeholder='Enter  Service Name'
                  name='serviceName'
                  value={formData.serviceName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label=' Service Description'
                  placeholder='Enter  Service Description'
                  name='serviceDescription'
                  value={formData.serviceDescription}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {formData.serviceImage?.map((item, index) => (
                    <ImgStyled key={index} src={item} alt={item} />
                  ))}
                  <Box>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload Image
                      <input
                        hidden
                        type='file'
                        onChange={onChange}
                        name='serviceImage'
                        accept='image/png, image/jpeg'
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>
                    <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('')}>
                      Reset
                    </ResetButtonStyled>
                    <Typography variant='body2' sx={{ marginTop: 5 }}>
                      Allowed PNG or JPEG.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label='Status' defaultValue={true} name='isActive' onChange={handleChange}>
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>

      {/* Table */}
      <Grid item xs={12} sx={{ marginTop: '10px' }}>
        <Card>
          <CardHeader title='State List' titleTypographyProps={{ variant: 'h6' }} />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? servicesData : filter}
            pagination
            selectableRows
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
            }
            subHeaderAlign='right'
          />
        </Card>
      </Grid>

      {/* Model to Update State */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>{/* <StateModel singleState={singleState} handleClose={handleClose} /> */}</Box>
      </Modal>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          State Created successfully
        </Alert>
      </Snackbar>
    </>
  )
}

export default FormLayoutsSeparator
