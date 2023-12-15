import React from 'react'
import Grid from '@mui/material/Grid'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import DoneIcon from '@mui/icons-material/Done'
import CachedIcon from '@mui/icons-material/Cached'
import TaskIcon from '@mui/icons-material/Task'
import ComplainPortalComponent from 'src/@core/components/complain-portal'
import Card from '@mui/material/Card'
import { CardHeader } from '@mui/material'

const index = () => {
  return (
    <>
      <Card>
        <CardHeader
          title='Complaint Portal'
          titleTypographyProps={{ variant: 'h6' }}
          sx={{ fontWeight: 'bolder', textAlign: 'center' }}
        />
      </Card>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={10} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <ComplainPortalComponent
                stats={54}
                icon={<QuestionAnswerIcon sx={{ fontSize: '5.2rem', color: '#3F63B945' }} />}
                title='Total Complaints'
                color='#0CB6DB;'
                moreInfoColor='#3F63B945'
              />
            </Grid>
            <Grid item xs={6}>
              <ComplainPortalComponent
                stats='0'
                title='Complaints Have Been Closed'
                color='#31E504;'
                icon={<DoneIcon sx={{ fontSize: '5.2rem', color: '#208B0652' }} />}
                moreInfoColor='#208B0652'
              />
            </Grid>
            <Grid item xs={6}>
              <ComplainPortalComponent
                stats='862'
                color='#FA9E1C'
                title='Complaints in progress'
                icon={<CachedIcon sx={{ fontSize: '5.2rem', color: '#F05E1666' }} />}
                moreInfoColor='#F05E1666'
              />
            </Grid>
            <Grid item xs={6}>
              <ComplainPortalComponent
                stats='15'
                color='#9F0E0E'
                title='Reports'
                icon={<TaskIcon sx={{ fontSize: '5.2rem', color: '#6D070766' }} />}
                moreInfoColor='#6D070766'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default index
