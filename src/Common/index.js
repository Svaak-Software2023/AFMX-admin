import { styled } from '@mui/material/styles'

export const Active = styled('p')(() => ({
  color: 'green'
}))

export const InActive = styled('p')(() => ({
  color: 'red'
}))

//Table styles

export const customStyles = {
  rows: {
    style: {
      backgroundColor: '#3D3759'
    }
  },
  headCells: {
    style: {
      backgroundColor: '#28243D',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px'
    }
  },
  cells: {
    style: {
      color: '#CFCCE4',
      backgroundColor: '#3D3759'
    }
  },
  subHeader: {
    style: {
      backgroundColor: '#312D4B'
    }
  },
  pagination: {
    style: {
      color: '#CFCCE4',
      backgroundColor: '#312D4B'
    },
    button: {
      style: {
        color: 'white'
      }
    }
  }
}
