// ** React Imports
import { forwardRef, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Box from '@mui/material/Box'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import DataTable from 'react-data-table-component'

import 'react-datepicker/dist/react-datepicker.css'
import { StyledUpdateButton, StyledDeleteButton } from 'src/views/icons'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'

import Modal from '@mui/material/Modal'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import {
  createServiceDepartment,
  getServiceDepartment,
  updateServiceDepartment
} from 'src/store/features/serviceDepartmentSlice'
import Model from './model'

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

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const FormLayoutsSeparator = () => {
  const [formData, setFormData] = useState({
    serviceDepartmentName: ''
  })

  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const [getid, setGetId] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)

  const dispatch = useDispatch()
  const serviceDepartmentData = useSelector(state => state.serviceDepartmentData.data)

  const singleServiceDepartment = serviceDepartmentData?.find(i => i.serviceDepartmentId === getid)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }

  const ShowSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch(createServiceDepartment(formData))
      setFormData({
        serviceDepartmentName: ''
      })
      setFormVisible(false)
      ShowSuccessMessage('submitted successfully')
      dispatch(getServiceDepartment())
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const result = serviceDepartmentData.filter(item => {
      const department = item.serviceDepartmentName.toLowerCase().includes(search.toLowerCase())

      return department
    })
    setFilter(result)
  }, [search, serviceDepartmentData])

  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.serviceDepartmentId,
      sortable: true
    },

    {
      name: 'Service Department Name',
      selector: row => row.serviceDepartmentName,
      sortable: true,
      wrap: true
    },

    {
      name: 'Created Date',
      selector: row => (row.createdDate ? row.createdDate.split('T')[0] : 'N/A')
    },
    {
      name: 'Updated Date',
      selector: row => (row.updatedDate ? row.updatedDate.split('T')[0] : 'N/A')
    },

    {
      name: 'Status',
      selector: row => (row.isActive ? <Active>Active</Active> : <InActive>Inactive</InActive>)
    },
    {
      name: 'Update',
      cell: row => <StyledUpdateButton onClick={id => handleOpen(row.serviceDepartmentId)} />
    },
    {
      name: 'Delete',
      cell: row => <StyledDeleteButton onClick={id => handleUpdate(row.serviceDepartmentId)} />
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

  const handleUpdate = async id => {
    try {
      const data = await serviceDepartmentData.find(i => i.serviceDepartmentId === id)
      dispatch(updateServiceDepartment({ id: id, data: { ...data, isActive: false } }))
      ShowSuccessMessage('Data Updated successfully')
      dispatch(getServiceDepartment())
    } catch (error) {
      throw error
    }
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'Service_Department_data.xlsx')
  }

  useEffect(() => {
    dispatch(getServiceDepartment())
  }, [dispatch])

  const handleAddForm = () => {
    setFormVisible(prev => !prev)
  }

  return (
    <>
      {/* Form */}
      <Card>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardHeader title='AFMX Service Department' titleTypographyProps={{ variant: 'h6' }} />
          <Box>
            <ButtonStyled onClick={handleAddForm} sx={{ mr: 1 }} variant='outlined'>
              <AddIcon /> Add Services
            </ButtonStyled>
          </Box>
        </Grid>
        <Divider sx={{ margin: 0 }} />
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label='Department Name'
                    name='serviceDepartmentName'
                    placeholder=' Enter Department Name'
                    onChange={handleChange}
                  />
                </Grid>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button size='medium' type='submit' sx={{ mr: 2 }} variant='contained'>
                    Add Department
                  </Button>
                </CardActions>
              </Grid>
            </CardContent>
          </form>
        )}
      </Card>

      {/*City Table */}
      <Grid item xs={12} mt={2}>
        <Card>
          <CardHeader
            title='Service Department List'
            titleTypographyProps={{ variant: 'h6' }}
            sx={{ fontWeight: 'bolder', textAlign: 'center' }}
          />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? serviceDepartmentData : filter}
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
        <Box sx={{ ...style }}>
          <Model singleServiceDepartment={singleServiceDepartment} handleClose={handleClose} />
        </Box>
      </Modal>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default FormLayoutsSeparator
