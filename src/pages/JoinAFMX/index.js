// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { styled } from '@mui/material/styles'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import DataTable from 'react-data-table-component'
import TextField from '@mui/material/TextField'
import { StyledUpdateButton } from 'src/views/icons'

// ** Styled Component

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import InputLabel from '@mui/material/InputLabel'

import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import JoinAfmx from 'src/components/Model/joinAFMXModel'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

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

const Active = styled('p')(() => ({
  color: 'green'
}))

const InActive = styled('p')(() => ({
  color: 'red'
}))

const FormLayouts = () => {
  const [getid, setGetId] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const label = { inputProps: { 'aria-label': 'Size switch demo' } }

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#ccc'
      }
    }
  }

  const columns = [
    {
      name: 'Sr.No',
      selector: row => row.afmxJoinId,
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row.afmxJoinDescription
    },
    {
      name: 'No. of Slider',
      selector: row => row.afmxSlide
    },
    {
      name: 'Start Date',
      selector: row => (row.createdDate ? row.createdDate.split('T')[0] : 'N/A')
    },
    {
      name: 'End Date',
      selector: row => (row.updatedDate ? row.updatedDate.split('T')[0] : 'N/A')
    },
    {
      name: 'Status',
      selector: row => (row.isActive ? <Active>Active</Active> : <InActive>Inactive</InActive>)
    },
    {
      name: 'Update',
      cell: row => <StyledUpdateButton onClick={id => handleOpen(row.afmxJoinId)} />
    }
  ]

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Advertisement Report' titleTypographyProps={{ variant: 'h6' }} />

          <DataTable
            customStyles={tableHeaderstyle}
            columns={columns}
            data={filter === null ? data : filter}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                </Box>
              </Box>
            }
            subHeaderAlign='right'
          />
        </Card>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          <JoinAfmx />
        </Box>
      </Modal>
    </>
  )
}

export default FormLayouts
