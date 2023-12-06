// ** React Imports
import { useState } from 'react'
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
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { StyledUpdateButton, StyledDeleteButton } from 'src/views/icons'
import Modal from '@mui/material/Modal'

// ** Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import { CreateCountry, getCountry, updateCountry } from 'src/store/features/countrySlice'
import { useEffect } from 'react'

import DataTable from 'react-data-table-component'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import CountryModel from 'src/components/Model/countryModel'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'

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

const FormLayoutsSeparator = () => {
  const dispatch = useDispatch()
  const formStatus = useSelector(state => state.countryData.status)
  const countryData = useSelector(state => state.countryData.data)

  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')

  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState({
    countryName: '',
    countryShortName: '',
    countryPhoneCode: '',
    isActive: true
  })

  const [successMessage, setSuccessMessage] = useState('')

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.countryId,
      sortable: true
    },
    {
      name: 'Country',
      selector: row => row.countryName.toUpperCase(),
      sortable: true
    },
    {
      name: 'Country Short Name',
      selector: row => row.countryShortName.toUpperCase(),
      sortable: true
    },
    {
      name: 'Phone Code',
      selector: row => row.countryPhoneCode,
      sortable: true
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
      cell: row => <StyledUpdateButton onClick={id => handleOpen(row.countryId)} />
    },
    {
      name: 'Delete',
      cell: row => <StyledDeleteButton onClick={id => handleDelete(row.countryId)} />
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

  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(CreateCountry(formData))
      setFormData({
        countryName: '',
        countryShortName: '',
        countryPhoneCode: '',
        isActive: true
      })
      showSuccessMessage('Form submitted successfully')
      dispatch(getCountry())
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  const singleCountry = countryData?.find(i => i.countryId === getid)
  useEffect(() => {
    dispatch(getCountry())
  }, [dispatch])

  useEffect(() => {
    const result = countryData?.filter(item => {
      const country = item.countryName.toLowerCase().includes(search.toLowerCase())
      const countryShortName = item.countryShortName.toLowerCase().includes(search.toLowerCase())
      const countryPhoneCode = item.countryPhoneCode.toLowerCase().includes(search.toLowerCase())

      return country || countryShortName || countryPhoneCode
    })
    setFilter(result)
  }, [search, countryData])

  const handleDelete = async id => {
    try {
      const data = await countryData.find(i => i.countryId === id)
      dispatch(updateCountry({ id: id, data: { ...data, isActive: false } }))
      dispatch(getCountry())
    } catch (error) {
      throw error
    }
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'Country_data.xlsx')
  }

  // const singleCountry = countryData && Array.isArray(countryData) ? countryData.find(i => i.countryId === getid) : null

  return (
    <>
      {/* Form */}
      <Card>
        <CardHeader title='AFMX Country' titleTypographyProps={{ variant: 'h6' }} />

        <Divider sx={{ margin: 0 }} />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <DatePickerWrapper>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Country'
                    name='countryName'
                    placeholder='Enter Country Name'
                    value={formData.countryName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='countryShortName'
                    label='Country Short Name'
                    placeholder='Enter Country Short Name'
                    value={formData.countryShortName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='countryPhoneCode'
                    label='Country Phone Code'
                    placeholder='Enter Country Phone Code'
                    value={formData.countryPhoneCode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label='Status' name='isActive' defaultValue={true} onChange={handleChange}>
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DatePickerWrapper>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              {formStatus === 'loading' ? 'Submitting...' : 'Submit'}
            </Button>
          </CardActions>
        </form>
      </Card>

      {/*Country Table */}
      <Grid item xs={12} sx={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Country List'
            titleTypographyProps={{ variant: 'h6' }}
            sx={{ fontWeight: 'bolder', textAlign: 'center' }}
          />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? countryData : filter}
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

      {/* Model to Update Country */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>{<CountryModel getid={getid} handleClose={handleClose} />}</Box>
      </Modal>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Country Created successfully
        </Alert>
      </Snackbar>
    </>
  )
}

export default FormLayoutsSeparator
