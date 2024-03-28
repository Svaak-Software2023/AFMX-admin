// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'

const cardStyle = {
  cursor: 'pointer'
}

const ComplainPortalComponent = props => {
  const { id, title, color, icon, stats, moreInfoColor } = props

  return (
    <Link href='/complainPortal/[id]' as={`/complainPortal/${id}`} passHref>
      <Card sx={{ ...cardStyle, background: `${color}` }}>
        <CardContent style={{ padding: '0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', margin: '30px' }}>
            <Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant='h4'>{stats}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: '0.975rem' }}>{title}...</Typography>
            </Box>

            <Box>{icon}</Box>
          </Box>
          <Box sx={{ backgroundColor: `${moreInfoColor}`, padding: '5px' }}>
            <Typography
              variant='p'
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}
            >
              More Info &nbsp; <ArrowCircleDownIcon sx={{ rotate: '-90deg' }} />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ComplainPortalComponent

ComplainPortalComponent.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
