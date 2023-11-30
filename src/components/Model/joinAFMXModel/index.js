import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

const Form = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,

  // border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden'
}))

const JoinAfmx = () => {
  return (
    <>
      <Card>
        <CardHeader title='Advertisement Form' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <FormControl fullWidth>
            <Form onSubmit={e => e.preventDefault()}>
              <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
                {itemData.map(item => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                      loading='lazy'
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Page</InputLabel>
                    <Select label='Page' defaultValue='Select Page' onChange={e => setPage(e.target.value)}>
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
                    <Select label='Position' defaultValue='Select Position' onChange={e => setPosition(e.target.value)}>
                      <MenuItem value='top'>Top</MenuItem>
                      <MenuItem value='right'>Right</MenuItem>
                      <MenuItem value='bottom'>Bottom</MenuItem>
                      <MenuItem value='left'>Left</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Business Name' placeholder='Enter Business Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Business URL' placeholder='Enter Business URL' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Country Name' placeholder='Enter Country Name' />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Country code' placeholder='Enter Country code' />
                  </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Phone No.' placeholder='Enter Phone No.' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type='date' label='Select Start Data' defaultValue={today} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type='date' label='Select End Date' defaultValue={today} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Client Name' placeholder='Client Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label='Description'
                    placeholder='Description'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    s
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label='Status' defaultValue='active'>
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }}>
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

export default JoinAfmx
