// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  // ** Hook
  const [admin, setAdmin] = useState('')
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  useEffect(() => {
    const storedData = sessionStorage.getItem('adminData')

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setAdmin(parsedData)
    }
  }, [])

  return (
    <Card sx={{ position: 'relative', height: '100%' }}>
      <CardContent>
        <Typography variant='h6'>Welcome ! 🥳</Typography>
        <Typography variant='h6' sx={{ my: 0, color: 'primary.main' }}>
          {admin.adminName}
        </Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Best seller of the month
        </Typography>
        <Button size='small' variant='contained'>
          View Profile
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
