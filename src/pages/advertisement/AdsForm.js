import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { styled } from '@mui/material/styles'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdsdata, updateAdvertise } from 'src/store/features/advertiseSlice'
import { useEffect } from 'react'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  // border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden'
}))

const AdsForm = ({ singleAds, handleClose }) => {
  const clientData = useSelector(state => state.clientData)
  const dispatch = useDispatch()


  const [editedAds, setEditedAds] = useState({
    advertiseImage: singleAds?.advertiseImage,
    advertisePage: singleAds?.advertisePage,
    advertiseLocation: singleAds?.advertiseLocation,
    businessName: singleAds?.businessName,
    businessURL: singleAds?.businessURL,
    advertiseImageAltText: singleAds?.advertiseImageAltText,
    phoneNumber: singleAds?.phoneNumber,
    startDate: singleAds?.startDate,
    endDate: singleAds?.endDate,
    clientId: singleAds?.clientId,
    description: singleAds?.description,
    isActive: singleAds?.isActive
  })

  const findUserName = id => {
    const user = clientData.data.find(item => item?.clientId == id)

    if (user) {
      return user?.clientFirstName + ' ' + user?.clientLastName
    } else {
      return 'N/A'
    }
  }

  const handleChange = (field, value) => {
    setEditedAds(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdate = e => {
    e.preventDefault()
    dispatch(updateAdvertise({ id: singleAds?.advertiseId, data: editedAds }))
    handleClose()
  }

  useEffect(() => {
    dispatch(fetchAdsdata())
  }, [dispatch])

  return (
    <>
      <Card>
        <CardHeader title='Update Advertisement' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <FormControl fullWidth>
            <Form onSubmit={handleUpdate}>
              <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
                <ImageListItem>
                  <img src={editedAds?.advertiseImage} alt={editedAds?.advertiseImageAltText} loading='lazy' />
                </ImageListItem>
              </ImageList>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Page</InputLabel>
                    <Select
                      label='Page'
                      value={editedAds.advertisePage}
                      onChange={e => handleChange('advertisePage', e.target.value)}
                    >
                      <MenuItem value='Home '>Home Page</MenuItem>
                      <MenuItem value='Service '>Service Page</MenuItem>
                      <MenuItem value='Department '>Department Page</MenuItem>
                      <MenuItem value='Product'>Product</MenuItem>
                      <MenuItem value='Footer'>Footer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Position</InputLabel>
                    <Select
                      label='Position'
                      value={editedAds.advertiseLocation}
                      onChange={e => handleChange('advertiseLocation', e.target.value)}
                    >
                      <MenuItem value='top'>Top</MenuItem>
                      <MenuItem value='right'>Right</MenuItem>
                      <MenuItem value='bottom'>Bottom</MenuItem>
                      <MenuItem value='left'>Left</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Business Name'
                    placeholder='Enter Business Name'
                    value={editedAds.businessName}
                    onChange={e => handleChange('businessName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Business URL'
                    placeholder='Enter Business URL'
                    value={editedAds.businessURL}
                    onChange={e => handleChange('businessURL', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Advertise Name'
                    placeholder='Enter Country Name'
                    value={editedAds?.advertiseImageAltText}
                    onChange={e => handleChange('advertiseImageAltText', e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Country code' placeholder='Enter Country code' />
                  </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Phone No.'
                    placeholder='Enter Phone No.'
                    value={editedAds.phoneNumber}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='date'
                    label='Select Start Data'
                    value={editedAds.startDate?.split('T')[0]}
                    onChange={e => handleChange('startDate', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='date'
                    label='Select End Date'
                    value={editedAds.endDate?.split('T')[0]}
                    onChange={e => handleChange('endDate', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Client Name'
                    placeholder='Client Name'
                    value={findUserName(editedAds.clientId)}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label='Description'
                    placeholder='Description'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    value={editedAds.description}
                    onChange={e => handleChange('description', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label='Status'
                      defaultValue={editedAds.isActive}
                      onChange={e => handleChange('isActive', e.target.value)}
                    >
                      <MenuItem value={true}>Active</MenuItem>

                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormControl>
        </CardContent>
      </Card>
    </>
  )
}

export default AdsForm
