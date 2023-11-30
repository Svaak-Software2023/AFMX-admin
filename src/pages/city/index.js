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
import InputLabel from '@mui/material/InputLabel'

import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import DataTable from 'react-data-table-component'

import Typography from '@mui/material/Typography'

import 'react-datepicker/dist/react-datepicker.css'
import { StyledUpdateButton, StyledDeleteButton } from 'src/views/icons'
import { useDispatch, useSelector } from 'react-redux'
import { createCity, getCity, updateCity } from 'src/store/features/citySlice'
import { getState } from 'src/store/features/stateSlice'
import Modal from '@mui/material/Modal'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CityModel from 'src/components/Model/cityModel'

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
  const [formData, setFormData] = useState({
    stateId: '',
    cityName: '',
    isActive: 'true'
  })

  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const [getid, setGetId] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const dispatch = useDispatch()
  const stateData = useSelector(state => state.stateData.data)
  const cityData = useSelector(city => city.cityData.data)

  const singleCity = cityData?.find(i => i.cityId === getid)

  // const [editedCity, setEditedCity] = useState({
  //   stateId: singleCity.stateId,
  //   cityName: singleCity.cityName,

  //   isActive: singleCity.isActive
  // })

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
      await dispatch(createCity(formData))
      setFormData({
        stateId: '',
        cityName: '',
        isActive: true
      })
      ShowSuccessMessage('Form submitted successfully')

      await dispatch(getCity())
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const result = cityData.filter(item => {
      const cityId = item.cityName.toLowerCase().includes(search.toLowerCase())
      const cityName = item.cityName.toLowerCase().includes(search.toLowerCase())

      return cityId || cityName
    })
    setFilter(result)
  }, [search, cityData])

  useEffect(() => {
    dispatch(getState())
    dispatch(getCity())
  }, [dispatch])

  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.cityId,
      sortable: true
    },
    {
      name: 'State',
      selector: row => {
        const state = stateData.find(i => row.stateId === i.stateId)

        return state ? state.stateName.toUpperCase() : 'N/A'
      },
      sortable: true
    },
    {
      name: 'City',
      selector: row => row.cityName.toUpperCase(),
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
      cell: row => <StyledUpdateButton onClick={id => handleOpen(row.cityId)} />
    },
    {
      name: 'Delete',
      cell: row => <StyledDeleteButton onClick={id => handleUpdate(row.cityId)} />
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
      const data = await cityData.find(i => i.cityId === id)
      await dispatch(updateCity({ id: id, data: { ...data, isActive: false } }))
      ShowSuccessMessage('City Inactived successfully')

      await dispatch(getCity())
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      {/* Form */}
      <Card>
        <CardHeader title='AFMX Cites' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />

        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  --Add City
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select State</InputLabel>
                  <Select label='State Name' name='stateId' onChange={handleChange}>
                    {stateData.map(item => (
                      <MenuItem key={item.stateId} value={item.stateId}>
                        {item.stateName?.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='City'
                  name='cityName'
                  placeholder=' Enter City Name'
                  value={formData.cityName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label='Status' defaultValue={formData.isActive} name='isActive' onChange={handleChange}>
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

      {/*City Table */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='city List' titleTypographyProps={{ variant: 'h6' }} />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? cityData : filter}
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
          <CityModel singleCity={singleCity} handleClose={handleClose} />
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
