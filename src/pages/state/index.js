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
import StateModel from 'src/components/Model/stateModel'

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
  const stateData = useSelector(state => state.stateData.data)
  const countryData = useSelector(state => state.countryData.data)

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
    countryId: '',
    stateName: '',

    isActive: 'true'
  })

  useEffect(() => {
    dispatch(getCountry())
    dispatch(getState())
  }, [dispatch])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await dispatch(createState(formData))
      setFormData({
        countryId: '',
        stateName: '',
        isActive: true
      })
      showSuccessMessage('Form submitted successfully')
      await dispatch(getState())
    } catch (error) {
      console.error('Error While submitting Form.', error)
    }
  }

  useEffect(() => {
    const result = stateData.filter(item => {
      const countryId = item.stateName.toLowerCase().includes(search.toLowerCase())
      const stateName = item.stateName.toLowerCase().includes(search.toLowerCase())

      return countryId || stateName
    })
    setFilter(result)
  }, [search, stateData])

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
      name: 'Update',
      cell: row => <StyledUpdateButton onClick={id => handleOpen(row.stateId)} />
    },
    {
      name: 'Delete',
      cell: row => <StyledDeleteButton onClick={id => handleUpdate(row.stateId)} />
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

  const singleState = stateData?.find(i => i.stateId === getid)

  const handleUpdate = async id => {
    try {
      const data = await stateData.find(i => i.stateId === id)
      await dispatch(updateState({ id: id, data: { ...data, isActive: false } }))
      await dispatch(getState())
    } catch (error) {
      throw error
    }
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
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  -- Add State
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Country</InputLabel>
                  <Select label='Select Country' name='countryId' onChange={handleChange}>
                    {countryData.map(item => (
                      <MenuItem key={item.countryId} value={item.countryId}>
                        {item.countryName?.toUpperCase()}
                      </MenuItem>
                    ))}
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

      {/*Country Table */}
      <Grid item xs={12} sx={{ marginTop: '10px' }}>
        <Card>
          <CardHeader title='State List' titleTypographyProps={{ variant: 'h6' }} />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? stateData : filter}
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
          State Created successfully
        </Alert>
      </Snackbar>
    </>
  )
}

export default FormLayoutsSeparator
