// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'

import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Trophy from 'src/views/dashboard/Trophy'

import { useDispatch, useSelector } from 'react-redux'
import { fetchClientData } from 'src/store/features/clientSlice'
import { useEffect } from 'react'

const Dashboard = () => {
  const dispatch = useDispatch()

  const clientData = useSelector(state => state.clientData.data)

  useEffect(() => {
    dispatch(fetchClientData())
  }, [dispatch])

  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={4} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={8} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={clientData.length}
                icon={<AccountOutline />}
                title='Clients'
                subtitle='Total Client'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='0'
                title='Complain Portal'
                color='secondary'
                subtitle='Pending'
                icon={<ReportGmailerrorredIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
