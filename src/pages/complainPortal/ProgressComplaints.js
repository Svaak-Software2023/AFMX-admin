import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card, Grid, Button, Divider, TextField, Box, InputAdornment, Typography, styled, alpha } from '@mui/material'
import { SiMicrosoftexcel } from 'react-icons/si'
import Magnify from 'mdi-material-ui/Magnify'
import * as XLSX from 'xlsx'

import DataTable from 'react-data-table-component'
import { getComplaints } from 'src/store/features/complaintsSlice'
import { StyledDeleteButton, StyledUpdateButton, exportToExcel } from 'src/views/icons'
import { useDispatch, useSelector } from 'react-redux'
import Switch from '@mui/material/Switch'
import { pink } from '@mui/material/colors'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import Link from 'next/link'
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

const ProgressComplaints = () => {
  //-----------------------------Use States ------------------------------
  const [search, setSearch] = useState('')
  const [toggle, setToggle] = useState(true)
  const [filter, setFilter] = useState([])
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')

  //-------------------------------Redux Store -------------------------------

  const dispatch = useDispatch()

  const complaintData = useSelector(state => state.complaintsData.data)

  const inprogressComplaints = complaintData?.filter(item => item.complaintStatusId === 4)

  //---------------No. of Active & InActive---------------
  // const existing = complaintData.filter(item => item.complaineeId == null).length
  const nonExisting = inprogressComplaints.filter(item => item.complaineeId == null)

  const existingClient = inprogressComplaints.filter(item => {
    if (item.complaineeId) {
      return item
    }
  })
  console.log(existingClient)

  const existing = inprogressComplaints.length - nonExisting.length

  //-------------------------------------Use Effects -----------------------
  useEffect(() => {
    const result = inprogressComplaints.filter(item => {
      const customerName = item.customerName.toLowerCase().includes(search.toLowerCase())

      return customerName
    })
    setFilter(result)
  }, [search, inprogressComplaints])

  useEffect(() => {
    dispatch(getComplaints())
  }, [dispatch])

  //--------------------------------React Data Table -------------------------------
  const columns = [
    {
      name: 'Sr. No.',
      selector: (_, index) => index + 1,
      sortable: true
    },
    {
      name: 'Client Name  ',
      selector: row => row.customerName,
      sortable: true
    },
    {
      name: 'Complaint Type',
      selector: row => row.complaintType,

      sortable: true
    },
    {
      name: 'Phone',
      selector: row => row.customerPhone,
      sortable: true
    },

    {
      name: 'Email',
      selector: row => row.customerEmail
    },
    {
      name: 'Message',
      selector: row => row.complaintMessage
    },

    {
      name: 'Date',
      selector: row => row?.dateOfIncedent?.split('T')[0]
    },
    {
      name: 'Status',
      selector: row => {
        switch (row.complaintStatusId) {
          case 1:
            return (
              <Typography variant='caption' color='#fff'>
                Open
              </Typography>
            )
          case 2:
            return (
              <Typography variant='caption' color='#FCE4D6'>
                Not Yet Started
              </Typography>
            )
          case 3:
            return (
              <Typography variant='caption' color='#F8CBAD'>
                In Review
              </Typography>
            )
          case 4:
            return (
              <Typography variant='caption' color='#FFC000'>
                In Progress
              </Typography>
            )
          case 5:
            return (
              <Typography variant='caption' color='#FF5050'>
                On Hold
              </Typography>
            )
          case 6:
            return (
              <Typography variant='caption' color='#A9D08E'>
                Closed
              </Typography>
            )
          default:
            return ''
        }
      }
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Link href='/complaintDetail/[id]' as={`/complaintDetail/${row.complaintId}`} passHref>
            <StyledUpdateButton />
          </Link>
        </>
      )
    }
  ]

  //-------------------Handle Switch -------------------
  const handleSwitch = () => {
    setToggle(prevToggle => !prevToggle)
  }

  // ---------------------------------Filter Data --------------------------------

  //------------------------------------Export Table into Excel ------------------------
  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
  //   const wb = XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
  //   XLSX.writeFile(wb, 'Complaint_data.xlsx')
  // }

  return (
    <>
      <Grid item xs={12} mt={2}>
        <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          Complaint Portal &gt; Total Complaint
        </Typography>
        <Card>
          <Divider sx={{ margin: '0' }} />

          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={toggle == true ? existingClient || filter : nonExisting || filter}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
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
                    <QuestionAnswerIcon sx={{ fontSize: '30px', marginTop: '5px', color: 'skyBlue' }} />
                    <Box>
                      <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>
                        {inprogressComplaints.length}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>Total Complaints</Typography>
                    </Box>
                  </Box>

                  <Card sx={{ display: 'flex', marginLeft: '10px' }}>
                    <PinkSwitch {...label} onChange={handleSwitch} defaultChecked />
                    {toggle == true ? (
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>{existing}</Typography>

                        <Typography sx={{ fontSize: '0.7rem' }}>Existing</Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>{nonExisting.length}</Typography>

                        <Typography sx={{ fontSize: '0.7rem' }}>Not Existing</Typography>
                      </Box>
                    )}
                  </Card>
                </Box>

                <Box sx={{ display: 'flex' }}>
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
            subHeaderAlign='left'
          />
        </Card>
      </Grid>
    </>
  )
}

export default ProgressComplaints
