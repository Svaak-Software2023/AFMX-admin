import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, Modal, Button, Box, Card } from '@mui/material'
import { fetchClientData } from 'src/store/features/clientSlice';

const EmployeeModal = ({ handleClose }) => {

  const dispatch = useDispatch();

  const [employee, setEmployee] = useState('');

  const clientData = useSelector(state => state.clientData.data);

  console.log('...................cccccc',clientData);

  useEffect(() => {
    dispatch(fetchClientData())
  }, [dispatch])

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select Employee</InputLabel>
        <Select label='Select Employee' onChange={e => setEmployee(e.target.value)}>
          {(clientData || []).map((client)=>(<MenuItem value={client?.clientId}>{client?.clientFirstName} {client?.clientLastName}</MenuItem>))}
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
