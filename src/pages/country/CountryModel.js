import {
  Card,
  CardContent,
  TextField,
  InputLabel,
  Grid,
  CardHeader,
  FormControl,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import React, { useState } from 'react'

import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { updateCountry, getCountry } from 'src/store/features/countrySlice'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  overflow: 'hidden'
}))

const CountryModel = ({ handleClose, getid, showSuccessMessage }) => {
  // --------------- Redux Store -----------------------
  const dispatch = useDispatch()
  const countryData = useSelector(state => state.countryData.data)

  const singleCountry = countryData?.find(i => i?.countryId == getid);
  
  console.log('singleCountry----------->>>>>>>>>>>>>>>>>',singleCountry);


  // --------------------------- Use State -------------------------------
  const [editedCountry, setEditedCountry] = useState({
    countryName: singleCountry?.countryName,
    countryShortName: singleCountry?.countryShortName,
    countryPhoneCode: singleCountry?.countryPhoneCode,

    isActive: singleCountry?.isActive
  })

  // -------------------------- Handle Change --------------------------------
  const handleTextFieldChange = (field, value) => {
    setEditedCountry(prev => ({
      ...prev,
      [field]: value
    }))
  }

  //------------------------------Update Action --------------------------------
  const handleUpdate = e => {
    e.preventDefault()

    dispatch(updateCountry({ id: singleCountry?.countryId, data: editedCountry }))
    dispatch(getCountry())
    handleClose()
    showSuccessMessage('Country updated successfully')
  }

  //-----------------------------------//---------------------------------------------
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
                    label='Country Name'
                    value={editedCountry?.countryName}
                    onChange={e => handleTextFieldChange('countryName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Country Short Name'
                    value={editedCountry?.countryShortName}
                    onChange={e => handleTextFieldChange('countryShortName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Country Phone Code'
                    value={editedCountry?.countryPhoneCode}
                    onChange={e => handleTextFieldChange('countryPhoneCode', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label='Status'
                      defaultValue={editedCountry?.isActive}
                      onChange={e => handleTextFieldChange('isActive', e.target.value)}
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

export default CountryModel
