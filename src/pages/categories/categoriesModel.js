import {
    Card,
    CardContent,
    TextField,
    InputLabel,
    Grid,
    Button,
    TextareaAutosize,
    Typography,
    Divider,
    CardActions
  } from '@mui/material'
  import React, { useState } from 'react'
  
  import { useDispatch, useSelector } from 'react-redux'
  import { update_Category} from 'src/store/features/productAndcategorySlice'
  import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
  
  const categoriesModel = ({ handleClose, getid, showSuccessMessage }) => {
    // --------------- Redux Store -----------------------
    const dispatch = useDispatch()
    const { allCategory, loading, status } = useSelector(state => state.productAndcategoryData)
  
    const singleCategory = allCategory?.find(i => i.productCategoryId === getid);
  
    // --------------------------- Use State -------------------------------
    const [editedCategory, setEditedCategory] = useState({
      productCategoryName: singleCategory.productCategoryName,
      productCategoryDescription: singleCategory.productCategoryDescription
    })
  
    // -------------------------- Handle Change --------------------------------
    const handleTextFieldChange = (field, value) => {
      setEditedCategory(prev => ({
        ...prev,
        [field]: value
      }))
    }
  
    //------------------------------Update Action --------------------------------
    const handleUpdate = e => {
      e.preventDefault();
      dispatch(update_Category({ id: singleCategory.productCategoryId, categoryData: editedCategory })).then((x)=>handleClose()).then((x)=>showSuccessMessage('Category updated successfully'));
    }
  
    //-----------------------------------//---------------------------------------------
    return (
      <>
        <Card>
        {editedCategory.productCategoryName && (
          <>
            <form onSubmit={handleUpdate}>
              <CardContent>
                <Typography variant='h6' sx={{ textAlign: 'left', margin: 0 }}>
                  Update Category
                </Typography>
                <Divider />
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Category Name</InputLabel>
                      <TextField
                        fullWidth
                        // label='Category Name'
                        name='productCategoryName'
                        // placeholder='Enter Category Name'
                        value={editedCategory.productCategoryName}
                        onChange={e => handleTextFieldChange('productCategoryName', e.target.value)}
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Category Description</InputLabel>
                      <TextareaAutosize
                        fullWidth
                        isRequired={true}
                        name='productCategoryDescription'
                        label='Category Description'
                        value={editedCategory.productCategoryDescription}
                        onChange={e => handleTextFieldChange('productCategoryDescription', e.target.value)}
                        minRows={10}
                        cols={155}
                      /> 
                    </Grid>
                  </Grid>
                </DatePickerWrapper>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button size='medium' type='submit' variant='contained'>
                  {status === 'loading' ? 'Updating...' : 'Update'}
                </Button>
              </CardActions>
            </form>
          </>
        )}
      </Card>
      </>
    )
  }
  
  export default categoriesModel
  