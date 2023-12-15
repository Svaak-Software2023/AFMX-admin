// ** MUI Imports
import { Grid, Card, CardHeader, Modal, Box, Button, TextField, InputAdornment } from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'
import { styled } from '@mui/material/styles'

import { StyledDeleteButton, StyledUpdateButton } from 'src/views/icons'

import 'react-datepicker/dist/react-datepicker.css'
import * as XLSX from 'xlsx'

import DataTable from 'react-data-table-component'

import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ChangeAdvertiseStatus, fetchAdsdata } from 'src/store/features/advertiseSlice'
import { fetchClientData } from 'src/store/features/clientSlice'

import { SiMicrosoftexcel } from 'react-icons/si'
import AdsForm from './AdsForm'

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

const Advertisement = () => {
  // ----------------------Redux Store --------------------
  const dispatch = useDispatch()
  const data = useSelector(state => state.advertiseData.data)
  const clientData = useSelector(state => state.clientData)

  // const { data, loading, error } = advertiseData

  // ---------------------- Use State --------------------
  const [getid, setGetId] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])

  //--------------------- Open & Close From --------------------
  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const singleAds = data && data?.find(i => i.advertiseId === getid)

  // const label = { inputProps: { 'aria-label': 'Size switch demo' } }

  const findUserName = id => {
    const user = clientData.data.find(item => item.clientId == id)

    if (user) {
      return user.clientFirstName + ' ' + user.clientLastName
    } else {
      return 'N/A'
    }
  }

  //------------------------React Data Table -------------------------
  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.advertiseId,
      sortable: true
    },
    {
      name: 'Client Name',
      selector: row => findUserName(row.clientId),
      wrap: true
    },
    {
      name: 'Phone No.',
      selector: row => row.phoneNumber
    },
    {
      name: 'Business Name',
      selector: row => row.businessName,
      wrap: true
    },
    {
      name: 'URL',
      selector: row => row.businessURL,
      wrap: true
    },
    {
      name: 'Page',
      selector: row => row.advertisePage
    },
    {
      name: 'Location',
      selector: row => row.advertiseLocation
    },
    {
      name: 'Start Date',
      selector: row => (row.startDate ? row.startDate.split('T')[0] : 'N/A')
    },
    {
      name: 'End Date',
      selector: row => (row.endDate ? row.endDate.split('T')[0] : 'N/A')
    },

    {
      name: 'Status',
      selector: row => (row.isActive ? <Active>Active</Active> : <InActive>Inactive</InActive>)
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <StyledUpdateButton onClick={id => handleOpen(row.advertiseId)} /> &nbsp; &nbsp;{' '}
          <StyledDeleteButton onClick={id => handleDelete(row.advertiseId)} />
        </>
      )
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

  //--------------------------------- Use Effects --------------------
  useEffect(() => {
    dispatch(fetchClientData())
    dispatch(fetchAdsdata())
  }, [dispatch])

  useEffect(() => {
    const result = data.filter(item => {
      const businessName = item.businessName.toLowerCase().includes(search.toLocaleLowerCase())
      const businessURL = item.businessURL.toLowerCase().includes(search.toLocaleLowerCase())

      const phoneNumber = item.phoneNumber.toLowerCase().includes(search.toLocaleLowerCase())

      return businessName || businessURL || phoneNumber
    })
    setFilter(result)
  }, [search, data])

  const handleDelete = async id => {
    const ads = await data.find(i => i.advertiseId === id)
    dispatch(ChangeAdvertiseStatus({ id: id, data: { isActive: false } }))
    dispatch(fetchAdsdata())
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'Advertise_data.xlsx')
  }

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Advertisements Report'
            titleTypographyProps={{ variant: 'h6' }}
            sx={{ textAlign: 'center' }}
          />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? data : filter}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          <AdsForm singleAds={singleAds} handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  )
}

export default Advertisement
