import { useState, useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles'

// ** MUI Imports
import {
  Card,
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
import { CreateCountry, getCountry, updateCountry } from 'src/store/features/countrySlice'

import DataTable from 'react-data-table-component'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import AddIcon from '@mui/icons-material/Add'
import CountryModel from './CountryModel'
import PublicIcon from '@mui/icons-material/Public'
import Switch from '@mui/material/Switch'
import { pink } from '@mui/material/colors'
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
  // -----------------------------------REDUX STORE ------------------------------------
  const dispatch = useDispatch()
  const { data, loading, status } = useSelector(state => state.countryData)

  // --------------------------------------UseState --------------------------------
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [toggle, setToggle] = useState(true)

  const [formData, setFormData] = useState({
    countryName: '',
    countryShortName: '',
    countryPhoneCode: ''
  })

  //---------------No. of Active & InActive---------------
  const activeCountry = data.filter(item => item.isActive == true).length
  const inactiveCountry = data.filter(item => item.isActive == false).length

  //------------------------------------Open & Close Modal ---------------------------
  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleAddForm = () => {
    setFormVisible(prev => !prev)
  }

  // ----------------------------------------- Handle Changes --------------------------------
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

  // ------------------------------------------ React Data Table --------------------------------
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
      name: 'Action',
      cell: row => (
        <>
          <StyledUpdateButton onClick={id => handleOpen(row.countryId)} /> &nbsp; &nbsp;
          <StyledDeleteButton onClick={id => handleDelete(row.countryId)} />
        </>
      )
    }
  ]

  //-----------------------------------------------Actions -------------------------------------------
  //------------------Submit form-------
  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(CreateCountry(formData))
      setFormData({
        countryName: '',
        countryShortName: '',
        countryPhoneCode: ''
      })
      showSuccessMessage('Form submitted successfully')
      setFormVisible(false)
      dispatch(getCountry())
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  // ----------------Delete ----------
  const handleDelete = async id => {
    try {
      const data = await data?.find(i => i.countryId === id)
      dispatch(updateCountry({ id: id, data: { ...data, isActive: false } }))
      dispatch(getCountry())
    } catch (error) {
      throw error
    }
  }

  //----------------------------Use Effects --------------------------------
  useEffect(() => {
    dispatch(getCountry())
  }, [dispatch])

  useEffect(() => {
    const result = data?.filter(item => {
      const country = item.countryName.toLowerCase().includes(search.toLowerCase());
      const countryShortName = item.countryShortName.toLowerCase().includes(search.toLowerCase());
      const countryPhoneCode = item.countryPhoneCode.toLowerCase().includes(search.toLowerCase());

      return country || countryShortName || countryPhoneCode
    })
    setFilter(result)
  }, [search, data])

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
                <Typography variant='h6' sx={{ textAlign: 'center', margin: 0 }}>
                  Add Country
                </Typography>
                <Divider />
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Select Continent</InputLabel>
                        <Select label='Select Continent' name='continentId' onChange={handleChange}>
                          <MenuItem value='South America'>South America</MenuItem>
                          <MenuItem value='North America'>North America</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Country'
                        name='countryName'
                        placeholder='Enter Country Name'
                        value={data.countryName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='countryShortName'
                        label='Country Short Name'
                        placeholder='Enter Country Short Name'
                        value={data.countryShortName}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='countryPhoneCode'
                        label='Country Phone Code'
                        placeholder='Enter Country Phone Code'
                        value={data.countryPhoneCode}
                        onChange={handleChange}
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
        <PublicIcon /> &nbsp; AFMX Country List
      </Typography>
      <Grid item xs={12} sx={{ marginTop: '5px' }}>
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
                    <PublicIcon sx={{ fontSize: '30px', marginTop: '5px', color: 'skyBlue' }} />
                    <Box>
                      <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>{data.length}</Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>Countries</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', marginLeft: '10px' }}>
                    <PinkSwitch {...label} onChange={handleSwitch} defaultChecked />
                    {toggle == true ? (
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>{activeCountry}</Typography>
                        <Typography sx={{ fontSize: '0.7rem' }}>Active</Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>{inactiveCountry}</Typography>
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

      {/* Model to Update Country */}
      {/* ------------------------------------------------------------------------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          {<CountryModel getid={getid} handleClose={handleClose} showSuccessMessage={showSuccessMessage} />}
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
          Country Created successfully
        </Alert>
      </Snackbar>
    </>
  )
}

export default FormLayoutsSeparator
