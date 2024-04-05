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
    CardActions,
    FormControl,
    MenuItem,
    Select
  } from '@mui/material'
  import React, { useEffect, useState } from 'react'
  
  import { useDispatch, useSelector } from 'react-redux'
  import { update_Product} from 'src/store/features/productAndcategorySlice'
  import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useRouter } from 'next/router'
import CloseIcon from '@mui/icons-material/Close';
import { updateMini_TvMedia_Status } from 'src/store/features/miniTvSlice';
  
  const MiniTvModel = ({ handleClose, getid, showSuccessMessage }) => {

    // --------------- Redux Store -----------------------

    const dispatch = useDispatch();

    const { miniTvList, loading, status,message } = useSelector(state => state.miniTvData);
    const singleMiniTv = miniTvList?.find(i => i.miniTvId === getid);


  
    // --------------------------- Use State -------------------------------
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState({isVideo:false,list:[]});

    const [editedMiniTv, setEditedMiniTv] = useState({
        mediaUrl: singleMiniTv?.mediaUrl,
        
        })
  
        
    // -------------------------- Handle Change --------------------------------
    const handleTextFieldChange = (field, value) => {
        setEditedMiniTv(prev => ({
        ...prev,
        [field]: value
      }))
    };
  
    const handleChange = e => {
        const { name, value } = e.target
        setEditedMiniTv({
          ...editedMiniTv,
          [name]: value
        })
      };

    //------------------------------Update Action --------------------------------

    const handleUpdate = e => {
      e.preventDefault();
      console.log('form',editedMiniTv);
      dispatch(updateMini_TvMedia_Status({ miniTvId: getid, formData: editedMiniTv })).then((x)=>handleClose())
    }

    useEffect(()=>{
        const {length,...restMedia} = singleMiniTv?.miniTvMedia?.split(".") || [];
        setImageURLs({isVideo:([restMedia[+length - 1]].includes('mp4')),list:[singleMiniTv?.miniTvMedia]})
    },[singleMiniTv?.miniTvMedia])

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
        setEditedMiniTv({...editedMiniTv,miniTvMedia})
        setImages([...e.target.files]);
      };


      const deleteImage = (img,index) => {
        const miniTvMedia = images.filter((x,i)=>  x !== img && i!== index );
        if(miniTvMedia?.length===0){
          setImages([]);
          setImageURLs({isVideo:false,list:[]});
        }else {
          setImages(miniTvMedia);
          setEditedMiniTv({...editedMiniTv,miniTvMedia});
      };
      document.getElementById("chooseImageOrVideo").value = "";
      };
  
 


    return (
      <>
       <Card>
        {(
          <>
            <form onSubmit={handleUpdate}>
              <CardContent>
                <Typography variant='h6' sx={{ textAlign: 'left', margin: 0 }}>
                  Update Mini Tv Media
                </Typography>
                <Divider />
                {/* <DatePickerWrapper> */}
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Media Url</InputLabel>
                      <TextField
                        fullWidth
                        name='mediaUrl'
                        placeholder='Enter Media Url'
                        value={editedMiniTv?.mediaUrl}
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
                    <Grid item xs={3} sm={3} key={index}>
                    {(imageURLS.isVideo) ? (
                      <video width="400" controls>
                        <source src={imageSrc} type="video/mp4" />
                          Your browser does not support HTML video.
                      </video>
                    ) 
                     : (<img src={imageSrc} alt="not fount" width={"250px"} />)}
                    <CloseIcon onClick={()=>deleteImage(imageSrc,index)} style={{cursor:"pointer"}} />
                    </Grid>
                      ))}
                  </Grid>
                {/* </DatePickerWrapper> */}
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
      </>
    )
  }
  
  export default MiniTvModel
  