// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Card,
  Grid,
  Button,
  Divider,
  MenuItem,
  TextField,
  CardHeader,
  InputLabel,
  CardContent,
  CardActions,
  FormControl,
  Select,
  Box,
  InputAdornment,
  Typography,
  Modal,
  Alert,
  Snackbar
} from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'
import { alpha, styled } from '@mui/material/styles'

import DataTable from 'react-data-table-component'

import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { createCity, getCity, updateCity } from 'src/store/features/citySlice'
import { getState } from 'src/store/features/stateSlice'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import AddIcon from '@mui/icons-material/Add'
import CityModel from './CityModel'
import { StyledDeleteButton, StyledUpdateButton } from 'src/views/icons'
import Switch from '@mui/material/Switch'
import { pink } from '@mui/material/colors'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { customStyles } from 'src/Common'

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
  //----------------------------- Use State ------------------------------
  const [formData, setFormData] = useState({
    stateId: '',
    cityName: ''
  })
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [toggle, setToggle] = useState(true)

  // ------------------------------Redus Store -----------------------------
  const dispatch = useDispatch()
  const stateData = useSelector(state => state.stateData.data)
  const cityData = useSelector(city => city.cityData)

  const { data, loading, status } = cityData

  const singleCity = data?.find(i => i.cityId === getid)

  //---------------No. of Active & InActive---------------
  const activeCity = data.filter(item => item.isActive == true).length
  const inactiveCity = data.filter(item => item.isActive == false).length

  //--------------------------------Handle Change --------------------------------
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  //-------------------Handle Switch -------------------
  const handleSwitch = () => {
    setToggle(prevToggle => !prevToggle)
  }

  // ------------------------------- Open & Close Form --------------------------------
  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleAddForm = () => {
    setFormVisible(prev => !prev)
  }

  // -------------------------------------- Notifications --------------------------------
  const ShowSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  // -------------------------------------- Actions --------------------------------
  // Submit form
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch(createCity(formData))
      setFormData({
        stateId: '',
        cityName: ''
      })
      ShowSuccessMessage('Form submitted successfully')

      dispatch(getCity())
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  // Update
  const handleUpdate = async id => {
    try {
      const data = await data?.find(i => i.cityId === id)
      dispatch(updateCity({ id: id, data: { ...data, isActive: false } }))
      ShowSuccessMessage('City Inactived successfully')

      dispatch(getCity())
    } catch (error) {
      throw error
    }
  }

  // --------------------------------------Use Effects --------------------------------
  useEffect(() => {
    const result = data?.filter(item => {
      const cityId = item.cityName.toLowerCase().includes(search.toLowerCase())
      const cityName = item.cityName.toLowerCase().includes(search.toLowerCase())

      return cityId || cityName
    })
    setFilter(result)
  }, [search, data])

  useEffect(() => {
    dispatch(getState())
    dispatch(getCity())
  }, [dispatch])

  // ----------------------------------------React Data Table--------------------------------
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

        return state ? state.stateName?.toUpperCase() : 'N/A'
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
      name: 'Action',
      cell: row => (
        <>
          <StyledUpdateButton onClick={id => handleOpen(row.cityId)} /> &nbsp; &nbsp;
          <StyledDeleteButton onClick={id => handleUpdate(row.cityId)} />
        </>
      )
    }
  ]

  // ------------------------------------ Ecport to Excel --------------------------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'City_data.xlsx')
  }

  return (
    <>
      {/* ------------------------------Form------------------------------------------ */}
      <Card>
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                Add City
              </Typography>
              <Divider sx={{ marginBottom: '5px' }} />
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select State</InputLabel>
                    <Select label='State Name' name='stateId' onChange={handleChange}>
                      {stateData.map(item =>
                        item.isActive == true ? (
                          <MenuItem key={item.stateId} value={item.stateId}>
                            {item.stateName?.toUpperCase()}
                          </MenuItem>
                        ) : null
                      )}
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
              </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button size='medium' type='submit' sx={{ mr: 2 }} variant='contained'>
                Submit
              </Button>
            </CardActions>
          </form>
        )}
      </Card>
      {/* -------------------------------Table ---------------------------------------------- */}
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationCityIcon /> &nbsp; AFMX City List
      </Typography>
      <Grid item xs={12} mt={2}>
        <Card>
          <Divider sx={{ margin: '0' }} />

          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={filter === null ? data : filter}
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
                  <Box sx={{ display: 'flex', marginLeft: '10px' }}>
                    <LocationCityIcon sx={{ fontSize: '30px', marginTop: '5px', color: 'skyBlue' }} />
                    <Box>
                      <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>{data.length}</Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>City</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', marginLeft: '10px' }}>
                    <PinkSwitch {...label} onChange={handleSwitch} defaultChecked />
                    {toggle == true ? (
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>{activeCity}</Typography>
                        <Typography sx={{ fontSize: '0.7rem' }}>Active</Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>{inactiveCity}</Typography>
                        <Typography sx={{ fontSize: '0.7rem' }}>InActive</Typography>
                      </Box>
                    )}
                  </Box>
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

      {/*------------------------------------- Model to Update State------------------------------ */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          <CityModel singleCity={singleCity} handleClose={handleClose} ShowSuccessMessage={ShowSuccessMessage} />
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
