import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles';


// ** MUI Imports
import {
  Card,
  Grid,
  Button,
  Divider,
  TextField,
  CardContent,
  CardActions,
  Box,
  Alert,
  Snackbar,
  Typography,
  InputLabel,
  Modal
} from '@mui/material'

import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import {addMini_Tv_Media,getAll_MiniTv_Media,updateMini_TvMedia_Status } from 'src/store/features/miniTvSlice'

import DataTable from 'react-data-table-component'
import Magnify from 'mdi-material-ui/Magnify'
import InputAdornment from '@mui/material/InputAdornment'
import { SiMicrosoftexcel } from 'react-icons/si'
import * as XLSX from 'xlsx'
import AddIcon from '@mui/icons-material/Add'
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { customStyles } from 'src/Common'
import CloseIcon from '@mui/icons-material/Close';
import { StyledUpdateButton } from 'src/views/icons';
import MiniTvModel from './miniTvModel';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import DeleteIcon from '@mui/icons-material/Delete';


// table funtion
const Active = styled('p')(() => ({
  color: 'green'
}))

const InActive = styled('p')(() => ({
  color: 'red'
}))


const MiniTv = () => {
  const router = useRouter();
  // -----------------------------------REDUX STORE ------------------------------------
  const dispatch = useDispatch();
  const { miniTvList, loading, status,message } = useSelector(state => state.miniTvData);

  // --------------------------------------UseState --------------------------------
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [getid, setGetId] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [toggle, setToggle] = useState(true)
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState({isVideo:false,list:[]});

  const [formData, setFormData] = useState({
    mediaUrl: "",
    miniTvMedia: []
  })


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: 'auto'
  }


  useEffect(() => {
    dispatch(getAll_MiniTv_Media())
  }, []);

  //------------------------------------Open & Close Modal ---------------------------

  const handleOpen = id => {
    setGetId(id)
    setOpen(true)
  };

  const handleClose = () => setOpen(false)

  const handleAddForm = () => {
    setFormVisible(prev => !prev)
  };


  const updateStatus = (miniTvId,isActive) => {
    dispatch(updateMini_TvMedia_Status({miniTvId, formData:{isActive}})).then((x)=>showSuccessMessage('Status updated successfully')).then((x)=>dispatch(getAll_MiniTv_Media()));
  };

  
  // ------------------------------------------ React Data Table --------------------------------
  const columns = [
    {
      name: 'Sr.No',
      selector: (_,index) => index+1,
      sortable: true
    },
    {
      name: 'Url',
      selector: row => row.mediaUrl,
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: 'Media',
      selector: row => row.miniTvMedia,
      sortable: true,
      wrap: true,
      grow:2
    },
    {
      name: 'Status',
      selector: row => (row.isActive ? <Button onClick={()=>updateStatus(row.miniTvId,false)}><Active>Active</Active></Button> : <Button onClick={()=>updateStatus(row.miniTvId,true)}><InActive>Inactive</InActive></Button>)
    },
    {
      name: 'Action',
      cell: row => (
        <>
        <VisibilitySharpIcon onClick={() => router.push(`/minitv/${row.miniTvId}`)} titleAccess='view details' style={{cursor:"pointer"}} /> &nbsp; &nbsp;
        <StyledUpdateButton onClick={() => handleOpen(row.miniTvId)} titleAccess='edit Mini Tv' /> &nbsp; &nbsp;
        <DeleteIcon titleAccess='delete Mini Tv' style={{cursor:"pointer"}} />
        </>
      )
    }
  ];

  // ----------------------------------------- Handle Changes for multiple images or single image--------------------------------

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs({...imageURLS,list:newImageUrls});
  }, [images]);

  const onImageChange =(e) => {
    const miniTvMedia = [...e.target.files];
    const isVideo=['video/mp4'].includes(miniTvMedia[0]?.type)  ? true : false ;
    setImageURLs({...imageURLS,isVideo});
    setFormData({...formData,miniTvMedia})
    setImages([...e.target.files]);
  }



    // ----------------------------------------- Handle Changes --------------------------------
    const handleChange = e => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value
      })
    }

  //-----------------------------------------------Actions -------------------------------------------
  //------------------Submit form-------
  const handleSubmit = e => {
    e.preventDefault()
    try {
      if(checkProperties(formData)) return
      dispatch(addMini_Tv_Media(formData)).then((x)=>showSuccessMessage('Mini tv media Created successfully'));
      setFormData({
        mediaUrl: "",
        miniTvMedia: []
      })
      setFormVisible(false)
    } catch (error) {
      console.error('Error While Submitting Form', error)
    }
  }

  function checkProperties(obj) {
    if(!obj.mediaUrl && !obj.miniTvMedia.length){
      return true
    }
    return false
    }

  // ----------------Delete ----------
  const handleDelete = async id => {
    // try {
    //   const data = await data?.find(i => i.countryId === id)
    //   dispatch(updateCountry({ id: id, data: { ...data, isActive: false } }))
    //   dispatch(getCountry())
    // } catch (error) {
    //   throw error
    // }
  }

 


  // ----------------------------------Export To Excel Data --------------------------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filter.length > 0 ? filter : data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'Country_data.xlsx')
  }

  // -------------------------------------- Notifications -----------------------------

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  //-----------------------------------------//--------------------------------------------------

  const deleteImage = (img,index) => {
    const productImage = images.filter((x,i)=>  x !== img && i!== index );
    if(productImage.length===0){
      setImages([]);
      setImageURLs({isVideo:false,list:[]});
    }else {
      setImages(productImage);
      setFormData({...formData,productImage});
  };
  document.getElementById("chooseImageOrVideo").value = "";
  };



  

  return (
    <>
      {/* Form */}
      <Card>
        {isFormVisible && (
          <>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Typography variant='h6' sx={{ textAlign: 'left', margin: 0 }}>
                  Add Mini Tv Media
                </Typography>
                <Divider />
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Media Url</InputLabel>
                      <TextField
                        fullWidth
                        name='mediaUrl'
                        placeholder='Enter Media Url'
                        value={formData.mediaUrl}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Media File</InputLabel>
                    <Button
                    variant="contained"
                    component="label">
                      Upload File 
                  <input type="file" accept="image/*,video/*" id="chooseImageOrVideo" hidden onChange={onImageChange} />
                    </Button>
                    </Grid>
                    {imageURLS.list.map((imageSrc,index) => (
                    <Grid item xs={3} sm={3}>
                    {(imageURLS.isVideo) ? (
                      <video width="400" controls key={index+1}>
                        <source src={imageSrc} type="video/mp4" />
                          Your browser does not support HTML video.
                      </video>
                    ) 
                     : (<img key={index} src={imageSrc} alt="not fount" width={"250px"} />)}
                    <CloseIcon onClick={()=>deleteImage(imageSrc,index)} style={{cursor:"pointer"}} />
                    </Grid>
                      ))}
                  </Grid>
                </DatePickerWrapper>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button size='medium' type='submit' variant='contained'>
                  {status === 'loading' ? 'Submitting...' : 'Submit'}
                </Button>
              </CardActions>
            </form>
          </>
        )}
      </Card>
      {/* ---------------------------------------------------------------------------- */}
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }} >
        <span style={{cursor:"pointer"}} onClick={() => router.back()} title="go back"><TurnLeftIcon /> &nbsp; Mini Tv Media List</span>
      </Typography>
      <Grid item xs={12} sx={{ marginTop: '5px' }}>
        <Card>
          <Divider sx={{ margin: '0' }} />
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={miniTvList}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box className='actions-right' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <TextField
                    size='small'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Magnify fontSize='small' />
                        </InputAdornment>
                      )
                    }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Button onClick={handleAddForm} sx={{ mr: 1 }} variant='contained' size='small' color='success'>
                    <AddIcon /> Add
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={exportToExcel}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Export to Excel &nbsp;
                    <SiMicrosoftexcel style={{ fontSize: '1.3rem' }} />
                  </Button>
                </Box>
              </Box>
            }
            subHeaderAlign='right'
          />
        </Card>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style }}>
          {<MiniTvModel getid={getid} handleClose={handleClose} showSuccessMessage={showSuccessMessage} />}
        </Box>
      </Modal>




      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default MiniTv

