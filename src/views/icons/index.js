import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'

export const StyledUpdateButton = styled(BorderColorOutlinedIcon)(({ theme }) => ({
  ' &:hover': {
    color: theme.palette.primary.dark,
    cursor: 'pointer'
  }
}))

export const StyledDeleteButton = styled(DeleteIcon)(({ theme }) => ({
  ' &:hover': {
    color: theme.palette.error.main,
    cursor: 'pointer'
  }
}))
