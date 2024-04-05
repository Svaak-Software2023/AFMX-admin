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
import { getServiceDepartment, updateServiceDepartment } from 'src/store/features/serviceDepartmentSlice'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  // border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden'
}))

const Model = props => {
  const { singleServiceDepartment, handleClose } = props
  const dispatch = useDispatch()

  // const serviceDepartmentData = useSelector(state => state.serviceDepartmentData.data)


  const [editedServiceDepartment, setEditedServiceDepartment] = useState({
    serviceDepartmentName: singleServiceDepartment?.serviceDepartmentName,
    isActive: singleServiceDepartment?.isActive
  })

  const handleUpdate = e => {
    e.preventDefault()
    try {
      dispatch(
        updateServiceDepartment({ id: singleServiceDepartment?.serviceDepartmentId, data: editedServiceDepartment })
      )
      handleClose()
      dispatch(getServiceDepartment())
    } catch (error) {
      throw error
    }
  }

  const handleTextFieldChange = (field, value) => {
    setEditedServiceDepartment(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Card>
        <CardHeader title='Service Department Detail' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <FormControl fullWidth>
            <Form onSubmit={handleUpdate}>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Service Department Name'
                    value={editedServiceDepartment?.serviceDepartmentName}
                    onChange={e => handleTextFieldChange('serviceDepartmentName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label='Status'
                      defaultValue={editedServiceDepartment?.isActive}
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

export default Model
