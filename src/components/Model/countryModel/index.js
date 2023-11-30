import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { updateCountry } from 'src/store/features/countrySlice'
import { getCountry } from 'src/store/features/countrySlice'
import { useRouter } from 'next/router'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  // border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden'
}))

const CountryModel = props => {
  const { singleCountry, handleClose } = props
  const dispatch = useDispatch()

  const countryId = singleCountry.countryId

  const [editedCountry, setEditedCountry] = useState({
    countryName: singleCountry.countryName,
    countryShortName: singleCountry.countryShortName,
    countryPhoneCode: singleCountry.countryPhoneCode,

    isActive: singleCountry.isActive
  })

  const handleTextFieldChange = (field, value) => {
    setEditedCountry(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdate = async e => {
    e.preventDefault()
    try {
      await dispatch(updateCountry({ id: countryId, data: editedCountry }))
      handleClose()
      await dispatch(getCountry())
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
                    label='Country Name'
                    value={editedCountry.countryName}
                    onChange={e => handleTextFieldChange('countryName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Country Short Name'
                    value={editedCountry.countryShortName}
                    onChange={e => handleTextFieldChange('countryShortName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Country Phone Code'
                    value={editedCountry.countryPhoneCode}
                    onChange={e => handleTextFieldChange('countryPhoneCode', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label='Status'
                      defaultValue={editedCountry.isActive}
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

export default CountryModel
