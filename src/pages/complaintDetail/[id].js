import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal
} from '@mui/material'
import Phone from 'mdi-material-ui/Phone'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import { MessageOutline, EmailOutline } from 'mdi-material-ui'
import HomeIcon from '@mui/icons-material/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaints, updateComplaints } from 'src/store/features/complaintsSlice'
import { Grid, Box } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { useTheme } from '@mui/material/styles'

import EmployeeModal from './employeeModal'
import { getAllRemark } from 'src/store/features/remarkSlice'
import moment from 'moment'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 10,
  width: '80%',
  maxWidth: '600px',
  maxHeight: '80%'
}

const SingleComplaint = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  const timer = date => {
    return moment(date).format('llll')
  }

  const complaintData = useSelector(state => state.complaintsData.data)
  const remarkData = useSelector(state => state.remarkData.data)

  const complaint = complaintData.find(i => i?.complaintId === Number(id))


  const singleComplaintRemarks = remarkData?.find(item => item?.complaintId == Number(id))

  // const allRemarks = singleComplaintRemarks.remarks

  // console.log('All Remarks:', allRemarks)

  // ---------------------States------------------------

  const [allRmarks, setAllRmarks] = useState([])

  const [remark, setRemark] = useState('')

  const [status, setStatus] = useState()

  const [open, setOpen] = useState(false)
  const [view, setView] = useState(false)

  //------------------------Open & Close Modal------------------------
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleOpenDetails = () => {
    setView(prev => !prev)
  }
  console.log('Use Fff')

  // ------------------------Actions------------------------
  const handleReturnToClient = e => {
    e.preventDefault()

    let formData = {}
    formData.complaintStatusId = status
    formData.remarks = {
      complaintAssigneeId: complaint?.complaineeId,
      remarks: remark,
      roleId: 1
    }

    dispatch(updateComplaints({ id: complaint?.complaintId, data: formData }))
    router.back()
  }

  useEffect(() => {
    console.log('Test console')
    dispatch(getAllRemark(complaint?.complaineeId))
  }, [dispatch, complaint?.complaineeId])

  useEffect(() => {
    singleComplaintRemarks && setAllRmarks(singleComplaintRemarks.remarks)
  }, [singleComplaintRemarks])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <PersonAddAltIcon /> &nbsp;{complaint?.complaineeId == null ? 'Non Existing Client' : 'Existing Client'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {complaint?.complaineeId == null ? (
            ''
          ) : (
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleOpenDetails}
              sx={{ marginBottom: '10px' }}
            >
              View Details
            </Button>
          )}
          &nbsp; &nbsp;
          <Typography variant='body2' sx={{ marginRight: '10px' }}>
            Complaint Code:
          </Typography>
          <Typography variant='h5' sx={{ marginRight: '10px' }}>
            {complaint?.complaintId}
          </Typography>
        </Box>
      </Box>

      {view && (
        <Box fullWidth>
          <Card>
            <Paper elevation={0} style={{ padding: '20px' }}>
              <Grid container spacing={4}>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Name'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountOutline style={{ color: '#3F63B9' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.customerName}
                  />
                  {/* <Typography variant='h6'>Name : </Typography>&nbsp;
              <Typography variant='body1'> {customerName}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Phone'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Phone style={{ color: 'green' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.customerPhone}
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Email'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline style={{ color: 'green' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.customerEmail}
                  />

                  {/* <Typography variant='h6'>Email : </Typography>
              <Typography variant='body1'>{customerEmail}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Service Name'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline style={{ color: '#3F63B9' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.complaintServiceName}
                  />

                  {/* <Typography variant='h6'>Service Name : </Typography>
              <Typography variant='body1'>{complaintServiceName}</Typography> */}
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Complaint Type'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline style={{ color: '#FF5656' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.complaintType}
                  />

                  {/* <Typography variant='h6'>Complaint Type : </Typography>
              <Typography variant='body1'>{complaintType}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Address'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <HomeIcon style={{ color: '#3A5776' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.complaintAddress}
                  />

                  {/* <Typography variant='h6'>Address : </Typography>
              <Typography variant='body1'>{complaintAddress}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Date'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <CalendarMonthRoundedIcon style={{ color: '#FF5656' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.dateOfIncedent?.split('T')[0]}
                  />

                  {/* <Typography variant='h6'>Date : </Typography>
              <Typography variant='body1'>{dateOfIncedent.split('T')[0]}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Created By'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountOutline style={{ color: '#3F63B9' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.createdBy}
                  />

                  {/* <Typography variant='h6'>Date : </Typography>
              <Typography variant='body1'>{dateOfIncedent.split('T')[0]}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Desired Outcome'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <ExitToAppRoundedIcon style={{ color: '#208B06' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.desireOutcome}
                  />

                  {/* <Typography variant='h6'>Date : </Typography>
              <Typography variant='body1'>{dateOfIncedent.split('T')[0]}</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MessageOutline style={{ color: 'red' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    multiline
                    minRows={3}
                    label='Complaint Message'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    defaultValue={complaint?.complaintMessage}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Card>
        </Box>
      )}

      {complaint?.complaineeId == null && (
        <Box fullWidth>
          <Card>
            <Paper elevation={0} style={{ padding: '20px' }}>
              <Grid container spacing={4}>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Name'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountOutline style={{ color: '#3F63B9' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.customerName}
                  />
                  {/* <Typography variant='h6'>Name : </Typography>&nbsp;
              <Typography variant='body1'> {customerName}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Phone'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Phone style={{ color: 'green' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.customerPhone}
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Email'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline style={{ color: 'green' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.customerEmail}
                  />

                  {/* <Typography variant='h6'>Email : </Typography>
              <Typography variant='body1'>{customerEmail}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Service Name'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline style={{ color: '#3F63B9' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.complaintServiceName}
                  />

                  {/* <Typography variant='h6'>Service Name : </Typography>
              <Typography variant='body1'>{complaintServiceName}</Typography> */}
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Complaint Type'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline style={{ color: '#FF5656' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.complaintType}
                  />

                  {/* <Typography variant='h6'>Complaint Type : </Typography>
              <Typography variant='body1'>{complaintType}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Address'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <HomeIcon style={{ color: '#3A5776' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.complaintAddress}
                  />

                  {/* <Typography variant='h6'>Address : </Typography>
              <Typography variant='body1'>{complaintAddress}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Date'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <CalendarMonthRoundedIcon style={{ color: '#FF5656' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.dateOfIncedent?.split('T')[0]}
                  />

                  {/* <Typography variant='h6'>Date : </Typography>
              <Typography variant='body1'>{dateOfIncedent.split('T')[0]}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Created By'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountOutline style={{ color: '#3F63B9' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.createdBy}
                  />

                  {/* <Typography variant='h6'>Date : </Typography>
              <Typography variant='body1'>{dateOfIncedent.split('T')[0]}</Typography> */}
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    disabled
                    label='Desired Outcome'
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <ExitToAppRoundedIcon style={{ color: '#208B06' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    defaultValue={complaint?.desireOutcome}
                  />

                  {/* <Typography variant='h6'>Date : </Typography>
              <Typography variant='body1'>{dateOfIncedent.split('T')[0]}</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MessageOutline style={{ color: 'red' }} />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                    multiline
                    minRows={3}
                    label='Complaint Message'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    defaultValue={complaint?.complaintMessage}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Card>
        </Box>
      )}

      {/* ------------------------------Update Complaint-------------------------------------- */}
      {complaint?.complaineeId == null ? (
        ''
      ) : (
        <Box fullWidth>
          <Card>
            <Box sx={{ paddingLeft: '100px', paddingRight: '100px' }}>
              <Card sx={{ backgroundColor: '#28243D', height: '250px', overflow: 'auto', marginTop: '5px' }}>
                <Card sx={{ backgroundColor: '#28243D' }}>
                  {allRmarks?.map(item =>
                    item?.remarksCreatedBy === 'Client' ? (
                      <Grid container spacing={3} key={item.id}>
                        <Grid item xs={6}>
                          <Card sx={{ background: '#323152', marginLeft: '8px', marginBottom: '4px' }}>
                            <Typography variant='caption' sx={{ marginLeft: '10px', fontSize: '0.7rem' }}>
                              Client
                            </Typography>
                            <Typography
                              sx={{
                                width: 'max-content',
                                borderRadius: '20px',
                                marginLeft: '10px',
                                float: 'center',
                                color: '#fff'
                              }}
                              variant='body2'
                            >
                              {item.remarks}
                            </Typography>
                            <Typography
                              variant='body2'
                              sx={{ float: 'right', fontSize: '0.6rem', marginRight: '10px' }}
                            >
                              {timer(item.createdDate)}
                            </Typography>
                          </Card>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container key={item._id} spacing={3} justifyContent='flex-end' alignItems='flex-end'>
                        <Grid item xs={6}>
                          <Card
                            sx={{ background: '#403e4b', marginRight: '8px', borderRadius: '5px', marginBottom: '4px' }}
                          >
                            <Typography variant='caption' sx={{ marginLeft: '10px', fontSize: '0.7rem' }}>
                              You
                            </Typography>
                            <Typography
                              sx={{
                                width: 'max-content',
                                borderRadius: '20px',
                                marginLeft: '10px',
                                color: '#fff'
                              }}
                              variant='body2'
                            >
                              {item.remarks}
                            </Typography>
                            <Typography
                              variant='caption'
                              sx={{ float: 'right', fontSize: '0.6rem', marginRight: '10px' }}
                            >
                              {timer(item.createdDate)}
                            </Typography>
                          </Card>
                        </Grid>
                      </Grid>
                    )
                  )}
                </Card>
              </Card>
            </Box>
            <Paper elevation={0} style={{ padding: '30px 100px' }}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label='Remark'
                    onChange={e => setRemark(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MessageOutline />
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { color: '#fff' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'center', justifyContent: 'space-between' }}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select label='Status' onChange={e => setStatus(e.target.value)}>
                        <MenuItem value='1'>Open</MenuItem>

                        <MenuItem value='2'>Not Yet Started</MenuItem>
                        <MenuItem value='3'>In Review</MenuItem>
                        <MenuItem value='4'>In Progress</MenuItem>
                        <MenuItem value='5'>On Hold</MenuItem>
                        <MenuItem value='6'>Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <Button variant='contained' color='primary' onClick={handleReturnToClient}>
                      Return to Client
                    </Button>
                    &nbsp;
                    <Button variant='contained' color='warning' onClick={handleOpen}>
                      Forward to Employee
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Card>
        </Box>
      )}
      {/* Model to Update Country */}
      {/* ------------------------------------------------------------------------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>{<EmployeeModal handleClose={handleClose} />}</Box>
      </Modal>
    </>
  )
}

export default SingleComplaint
