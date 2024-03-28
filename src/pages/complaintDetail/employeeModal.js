import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Modal, Button, Box, Card } from '@mui/material'

const EmployeeModal = ({ handleClose }) => {
  const [employee, setEmployee] = useState('')

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select Employee</InputLabel>
        <Select label='Select Employee' onChange={e => setEmployee(e.target.value)}>
          <MenuItem value='1'>Sachin</MenuItem>

          <MenuItem value='2'>Ritesh</MenuItem>
          <MenuItem value='3'>Alam</MenuItem>
          <MenuItem value='4'>Ram</MenuItem>
          <MenuItem value='5'>Vishnu</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '30px' }}>
        <Button variant='contained' color='secondary' sx={{ marginRight: 3 }} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' type='submit'>
          Send
        </Button>
      </Box>
    </>
  )
}

export default EmployeeModal
