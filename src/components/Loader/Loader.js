import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { styled } from '@mui/material/styles'

const LoaderContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const Loader = () => {
  return (
    <LoaderContainer>
      <RotatingLines strokeColor='grey' strokeWidth='5' animationDuration='0.75' width='96' visible={true} />
    </LoaderContainer>
  )
}

export default Loader
