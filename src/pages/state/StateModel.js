import React, { useEffect, useState } from 'react'
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
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getState, updateState } from 'src/store/features/stateSlice'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  // border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden'
}))

const StateModel = props => {
  const { singleState, handleClose } = props
  const dispatch = useDispatch()
  const countryData = useSelector(state => state.countryData.data)

  const stateId = singleState?.stateId

  const countryName = () => {
    const data = countryData.find(i => i?.countryId == singleState?.countryId)
    console.log(data?.countryName)

    return data?.countryName
  }

  const [editedState, setEditedState] = useState({
    countryId: singleState?.countryId,
    stateName: singleState?.stateName,

    isActive: singleState?.isActive
  })

  console.log(editedState)

  const handleTextFieldChange = (field, value) => {
    setEditedState(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdate = e => {
    e.preventDefault()
    try {
      dispatch(updateState({ id: stateId, data: editedState }))
      handleClose()
      dispatch(getState())
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
                    value={countryName()}
                    disabled
                    onChange={e => handleTextFieldChange('countryId', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='State Name'
                    value={editedState?.stateName}
                    onChange={e => handleTextFieldChange('stateName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label='Status'
                      defaultValue={editedState?.isActive}
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

export default StateModel
