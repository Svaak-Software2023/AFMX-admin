// ** React Imports
import { useEffect, useState } from 'react'
import { alpha, styled } from '@mui/material/styles'

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
import { getCountry } from 'src/store/features/countrySlice'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import AddIcon from '@mui/icons-material/Add'
import StateModel from './StateModel'
import Switch from '@mui/material/Switch'
import { pink } from '@mui/material/colors'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { Active, InActive, customStyles } from 'src/Common'

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
  //---------------------------Redux Store ------------------------
  const dispatch = useDispatch()
  const stateData = useSelector(state => state.stateData)
  const countryData = useSelector(state => state.countryData.data)

  const { data, loading, status } = stateData

  // ------------------------Use State ------------------------
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [toggle, setToggle] = useState(true)

  const [formData, setFormData] = useState({
    countryId: '',
    stateName: '',

    isActive: 'true'
  })

  //---------------No. of Active & InActive---------------
  const activeCountry = data.filter(item => item.isActive == true).length
  const inactiveCountry = data.filter(item => item.isActive == false).length

  //-------------------------------Open & Close Form----------------------------------------------------
  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleAddForm = () => {
    setFormVisible(prev => !prev)
  }

  // ---------------------------------- Notifications -------------------------------------------------------
  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  //-------------------Handle Switch -------------------
  const handleSwitch = () => {
    setToggle(prevToggle => !prevToggle)
  }

  // ------------------------------------Handle Change --------------------------------------
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // -------------------------------------Actions ----------------------------------------------------
  //-----------Submit form---------
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch(createState(formData))
      setFormData({
        countryId: '',
        stateName: '',
        isActive: true
      })
      showSuccessMessage('Form submitted successfully')
      dispatch(getState())
    } catch (error) {
      console.error('Error While submitting Form.', error)
    }
  }

  //------------Update----------
  const handleUpdate = async id => {
    try {
      const data = await data?.find(i => i.stateId === id)
      dispatch(updateState({ id: id, data: { ...data, isActive: false } }))
      dispatch(getState())
    } catch (error) {
      throw error
    }
  }

  //-----------------------------Use Effects ---------------------------------
  useEffect(() => {
    const result = data.filter(item => {
      const countryId = item.stateName.toLowerCase().includes(search.toLowerCase())
      const stateName = item.stateName.toLowerCase().includes(search.toLowerCase())

      return countryId || stateName
    })
    setFilter(result)
  }, [search, data])

  useEffect(() => {
    dispatch(getCountry())
    dispatch(getState())
  }, [dispatch])

  //--------------------------------React Data Table----------------------------------------------------
  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.stateId,
      sortable: true
    },
    {
      name: 'Country',
      selector: row => {
        const country = countryData.find(i => i.countryId === row.countryId)

        return country ? country.countryName.toUpperCase() : 'N/A'
      },
      sortable: true
    },
    {
      name: 'State Name',
      selector: row => row.stateName.toUpperCase(),
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
          <StyledUpdateButton onClick={id => handleOpen(row.stateId)} /> &nbsp; &nbsp;
          <StyledDeleteButton onClick={id => handleUpdate(row.stateId)} />
        </>
      )
    }
  ]

  const singleState = data?.find(i => i.stateId === getid)

  //------------------------------------Export Table into Excel ------------------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'State_data.xlsx')
  }

  return (
    <>
      {/*------------------------- Form---------------------------- */}
      <Card>
        {isFormVisible && (
          <>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Typography variant='h6' sx={{ textAlign: 'center' }}>
                  Add State
                </Typography>
                <Divider sx={{ marginBottom: '5px' }} />
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Select Country</InputLabel>
                      <Select label='Select Country' name='countryId' onChange={handleChange}>
                        {countryData.map(item =>
                          item.isActive == true ? (
                            <MenuItem key={item.countryId} value={item.countryId}>
                              {item.countryName?.toUpperCase()}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label=' State Name'
                      placeholder='Enter  State Name'
                      name='stateName'
                      value={formData.stateName}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button size='medium' type='submit' sx={{ mr: 2 }} variant='contained'>
                  Submit
                </Button>
              </CardActions>
            </form>
          </>
        )}
      </Card>

      {/*------------------------------Country Table-------------------------------- */}
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
        <ApartmentIcon /> &nbsp; AFMX State List
      </Typography>
      <Grid item xs={12} sx={{ marginTop: '5px' }}>
        <Card>
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
                    <ApartmentIcon sx={{ fontSize: '30px', marginTop: '5px', color: 'skyBlue' }} />
                    <Box>
                      <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>{data.length}</Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>States</Typography>
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

      {/*------------------------- Model to Update State ------------------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          <StateModel singleState={singleState} handleClose={handleClose} />
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
