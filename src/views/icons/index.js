import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { styled } from '@mui/material/styles'

export const StyledUpdateButton = styled(BorderColorOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary.light,

  ' &:hover': {
    color: theme.palette.primary.dark,
    cursor: 'pointer'
  }
}))

export const StyledDeleteButton = styled(DeleteIcon)(({ theme }) => ({
  color: theme.palette.error.main,

  ' &:hover': {
    color: theme.palette.error.main,
    cursor: 'pointer'
  }
}))

export const StyledViewButton = styled(VisibilityIcon)(({ theme }) => ({
  color: theme.palette.info.dark,

  ' &:hover': {
    color: theme.palette.secondary.main,
    cursor: 'pointer'
  }
}))
