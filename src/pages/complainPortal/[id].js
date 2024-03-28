import React from 'react'
import { useRouter } from 'next/router'
import TotalComplaints from './TotalComplaints'
import ClosedComplaints from './ClosedComplaints'
import ProgressComplaints from './ProgressComplaints'
import Report from './Report'
import Error404 from '../404'

const Index = () => {
  const router = useRouter()

  const { id } = router.query

  let componentToRender

  switch (id) {
    case '1':
      componentToRender = <TotalComplaints />

      break
    case '2':
      componentToRender = <ClosedComplaints />
      break
    case '3':
      componentToRender = <ProgressComplaints />
      break
    case '4':
      componentToRender = <Report />
      break

    default:
      componentToRender = <Error404 />
      break
  }

  return <>{componentToRender}</>
}

export default Index
