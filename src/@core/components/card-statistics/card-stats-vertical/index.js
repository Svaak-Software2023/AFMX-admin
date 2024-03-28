// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'

const cardStyle = {
  cursor: 'pointer',
  transition: ' 0.3s ease',
  '&:hover': {
    backgroundColor: '#28243D'
  }
}

const CardStatsVertical = props => {
  // ** Props
  const { title, subtitle, color, icon, stats, link } = props

  return (
    <Link href={`/${link}`} passHref>
      <Card sx={{ ...cardStyle }}>
        <CardContent>
          <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'center', justifyContent: 'center' }}>
            <Avatar
              sx={{
                boxShadow: 3,

                color: 'common.white',
                backgroundColor: `${color}.main`
              }}
            >
              {icon}
            </Avatar>
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.975rem', textAlign: 'center' }}>{title}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h6'>{stats}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='caption'>{subtitle}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardStatsVertical

CardStatsVertical.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
