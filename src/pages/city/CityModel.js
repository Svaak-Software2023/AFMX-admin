import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { getCity, updateCity } from 'src/store/features/citySlice'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  overflow: 'hidden'
}))

const CityModel = ({ singleCity, handleClose, ShowSuccessMessage }) => {
  // --------------------------------------Redux Store -------------------------
  const dispatch = useDispatch()
  const stateData = useSelector(state => state.stateData.data)

  const stateName = () => {
    const data = stateData?.find(i => i?.stateId === singleCity?.stateId)

    return data?.stateName
  }

  //-------------------------------------- Use State ----------------------------
  const [editedCity, setEditedCity] = useState({
    stateId: singleCity?.stateId,
    cityName: singleCity?.cityName,

    isActive: singleCity?.isActive
  })

  const handleTextFieldChange = (field, value) => {
    setEditedCity(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdate = e => {
    e.preventDefault()
    try {
      dispatch(updateCity({ id: singleCity.cityId, data: editedCity }))
      handleClose()
      dispatch(getCity())
      ShowSuccessMessage('City updated successfully')
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Country Detail' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <FormControl fullWidth>
            <Form onSubmit={handleUpdate}>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='State Name'
                    value={stateName()}
                    disabled
                    onChange={e => handleTextFieldChange('stateId', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='City Name'
                    value={editedCity?.cityName}
                    onChange={e => handleTextFieldChange('cityName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label='Status'
                      defaultValue={editedCity.isActive}
                      onChange={e => handleTextFieldChange('isActive', e.target.value)}
                    >
                      <MenuItem value={true}>Active</MenuItem>

                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleUpdate}>
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

export default CityModel
